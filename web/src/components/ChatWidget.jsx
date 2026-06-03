import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const API_URL = "http://localhost:8000"

const WELCOME = {
  id: 'welcome',
  role: 'bot',
  text: "Bonjour ! Je suis votre assistant assurance Sanlam. Posez-moi vos questions sur l'assurance auto ou santé au Maroc — en français ou en arabe.",
  rtl: false,
}

function isArabic(text) {
  return /[؀-ۿ]/.test(text)
}

function Bubble({ msg }) {
  const isUser = msg.role === 'user'

  if (msg.role === 'typing') {
    return (
      <div className="flex items-end gap-2">
        <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
          <img src="/sanlam-logo.png" alt="" className="w-4 h-4 object-contain" />
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-2.5 text-gray-400 text-sm tracking-widest shadow-sm">
          •••
        </div>
      </div>
    )
  }

  if (isUser) {
    return (
      <div className={`flex justify-end`}>
        <div
          className="bg-brand-500 text-white rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[78%] text-sm leading-relaxed shadow-sm"
          style={msg.rtl ? { direction: 'rtl', textAlign: 'right' } : {}}
        >
          {msg.text}
        </div>
      </div>
    )
  }

  // Bot bubble
  return (
    <div className={`flex items-end gap-2 ${msg.rtl ? 'flex-row-reverse' : ''}`}>
      <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
        <img src="/sanlam-logo.png" alt="" className="w-4 h-4 object-contain" />
      </div>
      <div
        className={`bg-white border border-gray-200 rounded-2xl px-4 py-2.5 max-w-[78%] text-sm leading-relaxed shadow-sm ${
          msg.rtl ? 'rounded-br-sm' : 'rounded-bl-sm'
        } ${msg.error ? 'text-red-600 border-red-200 bg-red-50' : 'text-gray-800'}`}
        style={msg.rtl ? { direction: 'rtl', textAlign: 'right' } : {}}
      >
        {msg.text}
      </div>
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen]       = useState(false)
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput]     = useState('')
  const [busy, setBusy]       = useState(false)
  const bottomRef             = useRef(null)
  const inputRef              = useRef(null)

  // Scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when panel opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150)
  }, [open])

  async function send() {
    const question = input.trim()
    if (!question || busy) return

    const userMsg = { id: Date.now(), role: 'user', text: question, rtl: isArabic(question) }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setBusy(true)

    const typingId = Date.now() + 1
    setMessages(prev => [...prev, { id: typingId, role: 'typing' }])

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setMessages(prev => prev
        .filter(m => m.id !== typingId)
        .concat({ id: Date.now() + 2, role: 'bot', text: data.answer, rtl: data.lang === 'ar' })
      )
    } catch {
      setMessages(prev => prev
        .filter(m => m.id !== typingId)
        .concat({
          id: Date.now() + 2,
          role: 'bot',
          text: 'Service momentanément indisponible, réessayez.',
          rtl: false,
          error: true,
        })
      )
    } finally {
      setBusy(false)
    }
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="
              w-[360px] max-w-[calc(100vw-3rem)]
              flex flex-col
              bg-white rounded-2xl shadow-2xl border border-gray-200
              overflow-hidden
            "
            style={{ height: 'min(520px, calc(100vh - 6rem))' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 bg-brand-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <img src="/sanlam-logo-white.png" alt="Sanlam" className="h-7 w-auto object-contain" />
                <div>
                  <p className="text-white font-semibold text-sm leading-none">Assistant Assurance</p>
                  <p className="text-blue-200/70 text-xs mt-0.5">Français · العربية</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
              {messages.map(msg => <Bubble key={msg.id} msg={msg} />)}
              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div className="flex gap-2 px-3 py-3 border-t border-gray-200 bg-white shrink-0">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKey}
                disabled={busy}
                placeholder="Votre question... / سؤالك..."
                className="
                  flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2.5
                  focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition
                "
              />
              <button
                onClick={send}
                disabled={busy || !input.trim()}
                className="
                  bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed
                  text-white rounded-xl px-3 py-2.5 transition-colors
                "
                aria-label="Envoyer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle button ── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="
          w-14 h-14 rounded-full
          bg-brand-500 hover:bg-brand-600
          text-white shadow-lg shadow-brand-500/40
          flex items-center justify-center
          transition-colors
        "
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open
            ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-6 h-6" /></motion.span>
            : <motion.span key="chat" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate:-90, opacity: 0 }} transition={{ duration: 0.15 }}><MessageCircle className="w-6 h-6" /></motion.span>
          }
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
