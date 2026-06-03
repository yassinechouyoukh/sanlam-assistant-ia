"""
rag.py — Retrieval-Augmented Generation pipeline for the insurance FAQ assistant.
Connects ChromaDB retrieval to a local Qwen3 model via Ollama.
"""

import re
import os
import unicodedata
import ollama
import chromadb
from sentence_transformers import SentenceTransformer

# ── Constants ────────────────────────────────────────────────────────────────

ROOT        = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROMA_DIR  = os.path.join(ROOT, "chroma_db")
COLLECTION  = "insurance_faq"
EMBED_MODEL = "paraphrase-multilingual-MiniLM-L12-v2"
LLM_MODEL   = "qwen3:4b"
TOP_K       = 3

# ── Setup (runs once at import) ──────────────────────────────────────────────

print(f"Loading embedding model: {EMBED_MODEL} ...")
_embedder = SentenceTransformer(EMBED_MODEL)

_chroma = chromadb.PersistentClient(path=CHROMA_DIR)
_collection = _chroma.get_collection(name=COLLECTION)
print(f"Connected to collection '{COLLECTION}' ({_collection.count()} entries)")


# ── Greeting tables ──────────────────────────────────────────────────────────

_GREETINGS = {
    "fr": {
        "tokens": {"bonjour", "salut", "bonsoir", "coucou", "merci"},
        "phrases": {"ça va", "ca va"},
        "reply": (
            "Bonjour ! Je suis l'assistant assurance Sanlam. "
            "Posez-moi vos questions sur l'assurance auto ou santé au Maroc — je suis là pour vous aider !"
        ),
    },
    "ar": {
        "tokens": {"سلام", "مرحبا", "شكرا"},
        "phrases": {"السلام عليكم", "صباح الخير", "مساء الخير"},
        "reply": (
            "مرحباً! أنا مساعد التأمين لدى سانلام. "
            "يمكنك سؤالي عن تأمين السيارة أو التأمين الصحي في المغرب — أنا هنا لمساعدتك!"
        ),
    },
    "en": {
        "tokens": {"hi", "hello", "hey", "thanks", "thank"},
        "phrases": set(),
        "reply": (
            "Hello! I'm the Sanlam insurance assistant. "
            "Feel free to ask me anything about auto or health insurance in Morocco!"
        ),
    },
}

def _greeting_reply(text: str) -> str | None:
    """Return a canned greeting reply if the message is a short greeting, else None."""
    # Only intercept very short messages (≤ 6 words) to avoid catching real questions
    words = text.strip().split()
    if len(words) > 6:
        return None
    normalised = text.strip().lower()
    for lang_data in _GREETINGS.values():
        if normalised in lang_data["phrases"]:
            return lang_data["reply"]
        if any(w in lang_data["tokens"] for w in normalised.split()):
            return lang_data["reply"]
    return None


# ── Helpers ──────────────────────────────────────────────────────────────────

def _detect_lang(text: str) -> str:
    """Return 'ar' if text contains Arabic characters, else 'fr'."""
    for ch in text:
        if unicodedata.category(ch) in ("Lo",) and "؀" <= ch <= "ۿ":
            return "ar"
    return "fr"


def _strip_think(text: str) -> str:
    """Remove <think>...</think> blocks that Qwen3 may emit."""
    return re.sub(r"<think>.*?</think>", "", text, flags=re.DOTALL).strip()


def _build_system_prompt(lang: str) -> str:
    if lang == "ar":
        return (
            "أنت مساعد تأمين متخصص في المغرب. "
            "أجب فقط بناءً على السياق المقدم. "
            "إذا لم تجد الإجابة في السياق، قل: 'لا تتوفر لديّ هذه المعلومات'. "
            "أجب بنفس لغة السؤال وكن موجزاً."
        )
    return (
        "Tu es un assistant spécialisé en assurance au Maroc. "
        "Réponds uniquement en te basant sur le contexte fourni. "
        "Si la réponse ne figure pas dans le contexte, dis : "
        "'Je n'ai pas cette information.' "
        "Réponds dans la même langue que la question et sois concis."
    )


# ── Core pipeline ─────────────────────────────────────────────────────────────

def answer_question(user_question: str) -> str:
    """
    Full RAG pipeline: detect language -> embed -> retrieve -> generate.
    Short greetings are intercepted before retrieval and return a canned reply.
    """
    # Short-circuit: greetings and thanks never need retrieval or the LLM
    greeting = _greeting_reply(user_question)
    if greeting:
        return greeting

    # a. Language detection
    lang = _detect_lang(user_question)

    # b. Embed the question and retrieve top-K entries filtered by language
    query_vec = _embedder.encode([user_question]).tolist()
    results = _collection.query(
        query_embeddings=query_vec,
        n_results=TOP_K,
        where={"lang": lang},
        include=["metadatas"],
    )

    # c. Build context from retrieved entries
    context_parts = []
    for meta in results["metadatas"][0]:
        context_parts.append(f"Q: {meta['question']}\nR: {meta['answer']}")
    context = "\n\n".join(context_parts)

    # d. Call Qwen3 via Ollama
    user_prompt = f"Contexte:\n{context}\n\nQuestion: {user_question}"
    response = ollama.chat(
        model=LLM_MODEL,
        messages=[
            {"role": "system", "content": _build_system_prompt(lang)},
            {"role": "user",   "content": user_prompt},
        ],
    )
    raw_answer = response.message.content

    # e. Strip reasoning traces before returning
    return _strip_think(raw_answer)


# ── Quick test ────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    test_questions = [
        ("bonjour",                                        "FR greeting — canned reply"),
        ("شكرا",                                           "AR greeting — canned reply"),
        ("Dans quel délai doit-on déclarer un accident ?", "FR — in data (RAG)"),
        ("ما هي نسبة تعويض الفحص الطبي؟",                 "AR — in data (RAG)"),
        ("Est-ce que l'assurance voyage est couverte ?",   "FR — NOT in data"),
    ]

    print("\n" + "=" * 60)
    for question, label in test_questions:
        print(f"\n[{label}]")
        print(f"Question: {question}")
        print("-" * 60)
        answer = answer_question(question)
        print(f"Reponse: {answer}")
        print("=" * 60)
