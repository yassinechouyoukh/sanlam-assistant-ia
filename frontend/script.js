const API_URL = "http://localhost:8000/chat";

// ── DOM refs ──────────────────────────────────────────────────────────────
const toggle   = document.getElementById("chat-toggle");
const panel    = document.getElementById("chat-panel");
const iconOpen = document.getElementById("chat-icon-open");
const iconClose= document.getElementById("chat-icon-close");
const messages = document.getElementById("chat-messages");
const input    = document.getElementById("chat-input");
const sendBtn  = document.getElementById("chat-send");

// ── Toggle open / close ───────────────────────────────────────────────────
toggle.addEventListener("click", () => {
  const isOpen = !panel.hidden;
  panel.hidden = isOpen;
  iconOpen.hidden  = !isOpen;
  iconClose.hidden =  isOpen;
  if (!isOpen) input.focus();
});

// ── Send on Enter or button click ─────────────────────────────────────────
input.addEventListener("keydown", e => { if (e.key === "Enter") sendMessage(); });
sendBtn.addEventListener("click", sendMessage);

// ── Language detection ─────────────────────────────────────────────────────
function isArabic(text) {
  return /[؀-ۿ]/.test(text);
}

// ── Bubble factory ─────────────────────────────────────────────────────────
function addBubble(text, type, rtl = false) {
  const div = document.createElement("div");
  div.className = "bubble bubble-" + type;
  if (rtl) div.classList.add("bubble-rtl");
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return div;
}

// ── Typing indicator ───────────────────────────────────────────────────────
function addTyping() {
  return addBubble("...", "bot bubble-typing");
}

// ── Core send function ────────────────────────────────────────────────────
async function sendMessage() {
  const question = input.value.trim();
  if (!question) return;

  // Disable input while waiting
  input.value = "";
  input.disabled = true;
  sendBtn.disabled = true;

  // Show user bubble
  addBubble(question, "user");

  // Show typing indicator
  const typing = addTyping();

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    typing.remove();
    addBubble(data.answer, "bot", data.lang === "ar");

  } catch (err) {
    typing.remove();
    const errDiv = document.createElement("div");
    errDiv.className = "bubble bubble-error";
    errDiv.textContent = "Service indisponible, réessayez.";
    messages.appendChild(errDiv);
    messages.scrollTop = messages.scrollHeight;
    console.error("Chat error:", err);
  } finally {
    input.disabled = false;
    sendBtn.disabled = false;
    input.focus();
  }
}
