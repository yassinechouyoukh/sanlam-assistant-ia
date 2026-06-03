# Sanlam Assistant IA — مساعد سنلام الذكي

A bilingual (French + Arabic) insurance FAQ assistant for **Sanlam**, built with a RAG (Retrieval-Augmented Generation) pipeline and a modern React frontend. The LLM runs **fully locally** via Ollama — no data leaves your machine.

---

## Features

- Answers questions about auto and health insurance in French and Arabic
- RAG pipeline: documents are embedded and retrieved from a local ChromaDB vector store
- Multilingual embeddings via `sentence-transformers` (`paraphrase-multilingual-MiniLM-L12-v2`)
- Local LLM inference via **Ollama + Qwen3:4b** (no API key required)
- REST API built with **FastAPI** (auto-docs at `/docs`)
- React + Vite + Tailwind CSS frontend with a chat widget
- Fully containerised with Docker Compose — one command to run everything

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  Browser  →  React/Vite frontend  (port 5173)       │
│               ↓                                     │
│  FastAPI backend              (port 8000)            │
│    ├── RAG pipeline (ChromaDB + sentence-transformers)│
│    └── Ollama client  →  Ollama daemon (port 11434)  │
└─────────────────────────────────────────────────────┘
```

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend API | FastAPI, Uvicorn |
| Vector store | ChromaDB (local, persistent) |
| Embeddings | sentence-transformers (`paraphrase-multilingual-MiniLM-L12-v2`) |
| LLM | Ollama + Qwen3:4b (runs locally) |
| Data | CSV FAQ files (French + Arabic) |
| Containerisation | Docker + Docker Compose |

---

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Compose)
- [Ollama](https://ollama.com/) installed and running, with the model pulled:

```bash
ollama pull qwen3:4b
```

> Ollama must be running on the host machine (the backend container connects to it via `host.docker.internal`).

---

## Quick Start (Docker)

```bash
git clone https://github.com/yassinechouyoukh/sanlam-assistant-ia.git
cd sanlam-assistant-ia

# Build and start all services
docker compose up --build
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| API (Swagger docs) | http://localhost:8000/docs |

To stop:

```bash
docker compose down
```

---

## Manual Setup (without Docker)

### Backend

```bash
python -m venv .venv

# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt

# Ingest FAQ documents into the vector store
python src/ingest.py

# Start the API server
uvicorn src.app:app --reload --port 8000
```

### Frontend

```bash
cd web
npm install
npm run dev
```

The frontend will be available at http://localhost:5173.

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `OLLAMA_HOST` | `http://host.docker.internal:11434` | Ollama API endpoint |

Create a `.env` file at the project root to override (it is git-ignored).

---

## Project Structure

```
sanlam-assistant-ia/
├── data/               # FAQ CSV files (French + Arabic)
├── src/
│   ├── app.py          # FastAPI application
│   ├── api.py          # Route definitions
│   ├── rag.py          # RAG pipeline (retrieval + generation)
│   ├── ingest.py       # Document ingestion into ChromaDB
│   └── db.py           # Database helpers
├── web/                # React + Vite frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components (Navbar, ChatWidget, …)
│   │   └── pages/      # Page components (Accueil, Auto, Santé, …)
│   └── package.json
├── frontend/           # Legacy plain-HTML prototype
├── requirements.txt    # Python dependencies
├── docker-compose.yml  # Multi-container setup
├── Dockerfile          # Backend image
└── web/Dockerfile      # Frontend image
```

---

## License

This project is for demonstration purposes. All insurance content is illustrative.
