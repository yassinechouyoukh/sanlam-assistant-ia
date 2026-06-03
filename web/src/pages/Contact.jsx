import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, Shield } from 'lucide-react'

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' } }),
}

const INFO = [
  { Icon: Phone,   title: 'Téléphone',  lines: ['Assistance : 3434', 'Standard : +212 5 22 00 00 00'] },
  { Icon: Mail,    title: 'Email',      lines: ['contact@sanlam.ma', 'sinistres@sanlam.ma'] },
  { Icon: MapPin,  title: 'Siège',      lines: ['Tour Sanlam, Avenue Hassan II', 'Casablanca 20000, Maroc'] },
  { Icon: Clock,   title: 'Horaires',   lines: ['Lun–Ven : 8h30 – 17h30', 'Assistance 3434 : 24h/24, 7j/7'] },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    // Visual-only form — no backend call
    setSent(true)
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[45vh] min-h-[320px] flex items-center bg-brand-800">
        <img
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-white text-center w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-blue-300" />
              <span className="text-blue-200 font-semibold text-sm uppercase tracking-wider">Contact</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold mb-3">
              Contactez-nous
            </motion.h1>
            <motion.p variants={fadeUp} className="text-blue-100/80 text-lg max-w-xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10"
            >
              <h2 className="text-2xl font-bold text-brand-800 mb-2">Envoyez-nous un message</h2>
              <p className="text-gray-500 text-sm mb-8">Nous vous répondons dans un délai de 24 heures ouvrées.</p>

              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-800 mb-2">Message envoyé !</h3>
                  <p className="text-gray-500">Notre équipe vous contactera dans les plus brefs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom complet *</label>
                      <input
                        name="nom"
                        value={form.nom}
                        onChange={handleChange}
                        required
                        placeholder="Mohammed Alami"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="vous@exemple.ma"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Sujet</label>
                    <select
                      name="sujet"
                      value={form.sujet}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition bg-white"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option>Demande de devis Auto</option>
                      <option>Demande de devis Santé</option>
                      <option>Déclaration de sinistre</option>
                      <option>Information sur un contrat</option>
                      <option>Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Décrivez votre demande..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-800 hover:bg-brand-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-4 h-4" /> Envoyer le message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info panel */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2 space-y-5"
            >
              {INFO.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-4">
                  <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
                    <item.Icon className="w-5 h-5 text-brand-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-800 mb-1.5">{item.title}</p>
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-gray-500 text-sm">{line}</p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-44 bg-brand-50 flex flex-col items-center justify-center gap-2 text-brand-300">
                  <MapPin className="w-10 h-10" />
                  <p className="text-sm font-medium text-brand-500">Carte — Tour Sanlam, Casablanca</p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-xs text-gray-400">Tour Sanlam, Avenue Hassan II, Casablanca 20000</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="py-16 bg-brand-800 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto px-4"
        >
          <p className="text-blue-100/70 mb-2 text-sm">Besoin d'une réponse immédiate ?</p>
          <a
            href="tel:3434"
            className="inline-flex items-center gap-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xl px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg"
          >
            <Phone className="w-6 h-6" />
            Appelez le <span className="text-blue-200">3434</span>
          </a>
          <p className="text-blue-100/50 text-xs mt-3">Disponible 24h/24, 7j/7</p>
        </motion.div>
      </section>
    </>
  )
}
