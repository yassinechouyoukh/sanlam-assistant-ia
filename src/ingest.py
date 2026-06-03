"""
ingest.py — Load FAQ CSVs, embed with sentence-transformers, store in ChromaDB.
"""

import os
import pandas as pd
import chromadb
from sentence_transformers import SentenceTransformer

# ── Constants ────────────────────────────────────────────────────────────────

ROOT        = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRENCH_CSV  = os.path.join(ROOT, "data", "french.csv")
ARABIC_CSV  = os.path.join(ROOT, "data", "arabic.csv")
CHROMA_DIR  = os.path.join(ROOT, "chroma_db")
COLLECTION  = "insurance_faq"
EMBED_MODEL = "paraphrase-multilingual-MiniLM-L12-v2"

# ── 1. Load and combine CSVs ─────────────────────────────────────────────────

fr_df = pd.read_csv(FRENCH_CSV)
fr_df["lang"] = "fr"

ar_df = pd.read_csv(ARABIC_CSV)
ar_df["lang"] = "ar"

df = pd.concat([fr_df, ar_df], ignore_index=True)
print(f"Loaded {len(df)} rows ({len(fr_df)} French, {len(ar_df)} Arabic)")

# ── 2. Build embeddings ──────────────────────────────────────────────────────

print(f"Loading embedding model: {EMBED_MODEL} ...")
model = SentenceTransformer(EMBED_MODEL)

# Embed question + answer together for richer retrieval context
texts = (df["question"] + "\n" + df["answer"]).tolist()
print("Computing embeddings ...")
embeddings = model.encode(texts, show_progress_bar=True).tolist()

# ── 3. Store in ChromaDB ─────────────────────────────────────────────────────

client = chromadb.PersistentClient(path=CHROMA_DIR)

# Safe re-run: drop the collection if it already exists
existing = [c.name for c in client.list_collections()]
if COLLECTION in existing:
    client.delete_collection(COLLECTION)
    print(f"Deleted existing collection '{COLLECTION}'")

collection = client.create_collection(
    name=COLLECTION,
    # We supply our own embeddings, so Chroma must NOT re-embed
    metadata={"hnsw:space": "cosine"},
)

# Build per-row ids, embeddings, metadatas, and documents
ids        = (df["lang"] + "-" + df["id"]).tolist()
metadatas  = df[["id", "category", "subcategory", "lang", "question", "answer"]].to_dict("records")
documents  = texts  # also store raw text for reference

collection.add(
    ids=ids,
    embeddings=embeddings,
    metadatas=metadatas,
    documents=documents,
)

count = collection.count()
print(f"\nStored {count} entries in collection '{COLLECTION}' -> {CHROMA_DIR}")

# ── 4. Test queries ──────────────────────────────────────────────────────────

test_queries = [
    ("fr", "Combien de temps pour déclarer un accident ?"),
    ("ar", "ما هي نسبة تعويض الطبيب؟"),
]

print("\n-- Retrieval test --")
for lang, query in test_queries:
    query_embedding = model.encode([query]).tolist()
    results = collection.query(
        query_embeddings=query_embedding,
        n_results=2,
        include=["metadatas"],
    )
    print(f"\nQuery [{lang}]: {query}")
    for meta in results["metadatas"][0]:
        print(f"  -> {meta['lang']}-{meta['id']} | {meta['question']}")
