"""
db.py — SQLite persistence layer for conversation history.
Database file: <project_root>/insurance.db
"""

import sqlite3
import os
from datetime import datetime, timezone

# ── Constants ─────────────────────────────────────────────────────────────────

ROOT    = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(ROOT, "insurance.db")


# ── Public API ────────────────────────────────────────────────────────────────

def init_db() -> None:
    """Create the conversations table if it does not exist yet."""
    with _connect() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS conversations (
                id         INTEGER PRIMARY KEY AUTOINCREMENT,
                created_at TEXT    NOT NULL,
                lang       TEXT    NOT NULL,
                question   TEXT    NOT NULL,
                answer     TEXT    NOT NULL,
                feedback   INTEGER             -- nullable: 1 = helpful, 0 = not
            )
        """)


def save_interaction(lang: str, question: str, answer: str) -> None:
    """Insert one question/answer pair with the current UTC timestamp."""
    with _connect() as conn:
        conn.execute(
            "INSERT INTO conversations (created_at, lang, question, answer) VALUES (?, ?, ?, ?)",
            (datetime.now(timezone.utc).isoformat(timespec="seconds"), lang, question, answer),
        )


def get_recent(limit: int = 10) -> list[tuple]:
    """Return the most recent rows (id, created_at, lang, question, answer), newest first."""
    with _connect() as conn:
        cursor = conn.execute(
            "SELECT id, created_at, lang, question, answer FROM conversations ORDER BY id DESC LIMIT ?",
            (limit,),
        )
        return cursor.fetchall()


# ── Internal helper ───────────────────────────────────────────────────────────

def _connect() -> sqlite3.Connection:
    """Open a connection with autocommit-on-exit via context manager."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # allows column access by name if needed
    return conn


# ── Self-test ─────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    init_db()
    print(f"Database initialised at: {DB_PATH}")

    save_interaction(
        lang="fr",
        question="Dans quel délai déclarer un accident ?",
        answer="5 jours selon la loi marocaine.",
    )
    save_interaction(
        lang="ar",
        question="ما هي نسبة تعويض الفحص الطبي؟",
        answer="80% لدى الطبيب العام و70% لدى الطبيب المختص.",
    )
    print("Saved 2 test interactions.\n")

    rows = get_recent(limit=10)
    print(f"{'ID':<4} {'created_at':<22} {'lang':<4} {'question':<45} answer")
    print("-" * 100)
    for row in rows:
        print(f"{row[0]:<4} {row[1]:<22} {row[2]:<4} {row[3][:43]:<45} {row[4][:40]}")
