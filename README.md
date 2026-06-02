# Assistant FAQ Assurance — مساعد التأمين الذكي

A multilingual (French + Arabic) insurance FAQ assistant for auto and health insurance, built with a RAG (Retrieval-Augmented Generation) pipeline.

## Stack

- **ChromaDB** — local vector store for document retrieval
- **sentence-transformers** — multilingual embeddings (French & Arabic)
- **Ollama + Qwen3** — local LLM for answer generation
- **pandas** — FAQ data loading and preprocessing

## Structure

```
inssurance_ai/
├── data/          # Raw FAQ documents (CSV, JSON, etc.)
├── src/           # Source code (ingestion, retrieval, chat)
├── requirements.txt
└── README.md
```

## Quick Start

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Make sure Ollama is running with the Qwen3 model pulled:

```bash
ollama pull qwen3
```
