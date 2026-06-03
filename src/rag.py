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
    Returns the LLM answer with <think> blocks stripped.
    """
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
        "Dans quel délai doit-on déclarer un accident de voiture ?",   # FR — in data
        "ما هي نسبة تعويض الفحص الطبي؟",                              # AR — in data
        "Est-ce que l'assurance voyage est couverte ?",                 # FR — NOT in data
    ]

    print("\n" + "=" * 60)
    for question in test_questions:
        print(f"\nQuestion: {question}")
        print("-" * 60)
        answer = answer_question(question)
        print(f"Reponse: {answer}")
        print("=" * 60)
