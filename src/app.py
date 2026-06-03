"""
app.py — Streamlit chat interface for the multilingual insurance FAQ assistant.
Run from project root: .\.venv\Scripts\streamlit.exe run src\app.py
"""

import sys
import os
import unicodedata

# Ensure src/ is on the path so rag.py can be imported from the same folder
sys.path.insert(0, os.path.dirname(__file__))

import streamlit as st
from rag import answer_question

# ── Helpers ───────────────────────────────────────────────────────────────────

def _is_arabic(text: str) -> bool:
    """Return True if text contains Arabic characters."""
    for ch in text:
        if unicodedata.category(ch) == "Lo" and "؀" <= ch <= "ۿ":
            return True
    return False


def _render_bubble(text: str, role: str) -> None:
    """Display a chat bubble with RTL styling for Arabic text."""
    with st.chat_message(role):
        if _is_arabic(text):
            st.markdown(
                f'<div style="direction:rtl; text-align:right;">{text}</div>',
                unsafe_allow_html=True,
            )
        else:
            st.markdown(text)


# ── Page config ───────────────────────────────────────────────────────────────

st.set_page_config(
    page_title="Assistant Assurance",
    page_icon="🛡️",
    layout="centered",
)

# ── Sidebar ───────────────────────────────────────────────────────────────────

with st.sidebar:
    st.title("🛡️ Assistant Assurance")
    st.markdown(
        "Assistant FAQ assurance pour le Maroc — **Auto & Santé**  \n"
        "يجيب على أسئلة التأمين بالفرنسية والعربية"
    )
    st.divider()
    if st.button("🗑️ Effacer la conversation", use_container_width=True):
        st.session_state.messages = []
        st.rerun()

# ── Header ────────────────────────────────────────────────────────────────────

st.title("Assistant Assurance 🛡️")
st.caption(
    "Posez vos questions en **français** ou en **العربية** · Auto · Santé"
)

# ── Session state ─────────────────────────────────────────────────────────────

if "messages" not in st.session_state:
    st.session_state.messages = []

# ── Display conversation history ──────────────────────────────────────────────

for msg in st.session_state.messages:
    _render_bubble(msg["content"], msg["role"])

# ── Handle new input ──────────────────────────────────────────────────────────

if prompt := st.chat_input("Votre question... / سؤالك..."):
    # Show and store user message
    st.session_state.messages.append({"role": "user", "content": prompt})
    _render_bubble(prompt, "user")

    # Generate and show assistant answer
    spinner_label = "يفكر..." if _is_arabic(prompt) else "Qwen3 réfléchit..."
    with st.spinner(spinner_label):
        answer = answer_question(prompt)

    st.session_state.messages.append({"role": "assistant", "content": answer})
    _render_bubble(answer, "assistant")
