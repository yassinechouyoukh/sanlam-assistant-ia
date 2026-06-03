# api.py - FastAPI backend for the multilingual insurance FAQ assistant.
# Launch from project root:
#   .venv/Scripts/uvicorn.exe src.api:app --reload --port 8000
# Interactive docs: http://localhost:8000/docs

import sys
import os
import unicodedata

# Make src/ importable so rag.py and db.py can be resolved as siblings
sys.path.insert(0, os.path.dirname(__file__))

from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from rag import answer_question
from db import init_db, save_interaction

# ── Lifespan (startup hook) ───────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

# ── App ───────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="Assistant Assurance API",
    description="Multilingual (FR/AR) insurance FAQ assistant powered by RAG + Qwen3.",
    version="1.0.0",
    lifespan=lifespan,
)

# Allow any localhost origin during local development
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Schemas ───────────────────────────────────────────────────────────────────

class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    answer: str
    lang: str

# ── Helpers ───────────────────────────────────────────────────────────────────

def _detect_lang(text: str) -> str:
    """Return 'ar' if text contains Arabic characters, else 'fr'."""
    for ch in text:
        if unicodedata.category(ch) == "Lo" and "؀" <= ch <= "ۿ":
            return "ar"
    return "fr"

# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/health", tags=["Infra"])
def health():
    return {"status": "ok"}


@app.post("/chat", response_model=ChatResponse, tags=["RAG"])
def chat(body: ChatRequest):
    question = body.question.strip()
    if not question:
        raise HTTPException(status_code=422, detail="Question must not be empty.")

    answer = answer_question(question)
    lang   = _detect_lang(question)
    save_interaction(lang, question, answer)

    return ChatResponse(answer=answer, lang=lang)
