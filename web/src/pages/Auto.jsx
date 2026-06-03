import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Car, Shield, Zap, FileText, Phone, CheckCircle, AlertTriangle, Clock, ArrowRight } from 'lucide-react'
import Accordion from '../components/Accordion'

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' } }),
}

const GARANTIES = [
  {
    Icon: Shield,
    title: 'Responsabilité Civile',
    badge: 'Obligatoire',
    badgeColor: 'bg-red-100 text-red-700',
    desc: "Couverture légale minimale au Maroc. Protège les tiers en cas d'accident dont vous êtes responsable — dommages corporels et matériels inclus.",
    points: ['Dommages corporels aux tiers', 'Dommages matériels aux tiers', 'Défense pénale et recours'],
  },
  {
    Icon: Zap,
    title: 'Tous Risques',
    badge: 'Recommandé',
    badgeColor: 'bg-brand-100 text-brand-700',
    desc: "La couverture la plus complète. En plus de la RC, protège votre propre véhicule contre les accidents, incendies, vols et catastrophes naturelles.",
    points: ["Dommages à votre véhicule (même en tort)", 'Vol et tentative de vol', 'Bris de glace', 'Incendie et catastrophes naturelles'],
  },
  {
    Icon: Phone,
    title: 'Assistance & Dépannage',
    badge: '24h/24',
    badgeColor: 'bg-green-100 text-green-700',
    desc: "En panne ou après un accident ? Notre assistance vous envoie un dépanneur où que vous soyez au Maroc, 7j/7 et 24h/24.",
    points: ['Dépannage sur place ou remorquage', 'Véhicule de remplacement', 'Hébergement si nécessaire', 'Rapatriement au Maroc'],
  },
]

const STEPS = [
  {
    num: '01',
    Icon: FileText,
    title: 'Remplissez le constat amiable',
    desc: "En cas d'accident avec un autre véhicule, remplissez immédiatement un constat amiable avec l'autre conducteur. Ce document est essentiel pour déterminer les responsabilités.",
  },
  {
    num: '02',
    Icon: Clock,
    title: 'Respectez le délai de 5 jours',
    desc: "La loi marocaine impose de déclarer tout sinistre (accident, incendie, bris de glace) à votre assureur dans un délai de 5 jours. En cas de vol, le délai est de 48 heures.",
  },
  {
    num: '03',
    Icon: Phone,
    title: 'Contactez le 3434',
    desc: "Notre numéro d'assistance est disponible 24h/24, 7j/7. Un conseiller vous guide pas à pas dans vos démarches et envoie un expert si nécessaire.",
  },
  {
    num: '04',
    Icon: CheckCircle,
    title: 'Check Auto Express',
    desc: "Grâce à notre service Check Auto Express, un expert se déplace chez vous ou en agence pour évaluer les dommages et accélérer votre indemnisation.",
  },
]

const FAQ = [
  {
    q: "L'assurance automobile est-elle obligatoire au Maroc ?",
    a: "Oui. La garantie de responsabilité civile (RC, ou assurance « au tiers ») est obligatoire pour tout véhicule en circulation au Maroc. Conduire sans assurance est sanctionné par la loi. Elle couvre les dommages corporels et matériels causés aux tiers.",
  },
  {
    q: "Quelle est la différence entre l'assurance au tiers et tous risques ?",
    a: "L'assurance au tiers (RC) est le minimum légal : elle couvre uniquement les dommages que vous causez à autrui. L'assurance tous risques est plus complète : elle couvre également les dommages subis par votre propre véhicule, même si vous êtes responsable. Le choix dépend de la valeur du véhicule et de votre budget.",
  },
  {
    q: "Dans quel délai dois-je déclarer un sinistre auto ?",
    a: "La loi marocaine fixe un délai de 5 jours pour déclarer un sinistre (accident, incendie, bris de glace) à votre assureur. En cas de vol du véhicule, ce délai est réduit à 48 heures. Le non-respect de ces délais peut entraîner un refus ou une réduction d'indemnisation.",
  },
  {
    q: "Que faire immédiatement après un accident de voiture ?",
    a: "1. Sécurisez les lieux (triangle de signalisation). 2. Remplissez un constat amiable avec l'autre conducteur. 3. En cas de blessés, appelez la police ou la gendarmerie. 4. Contactez Sanlam au 3434 pour déclarer le sinistre et lancer la procédure d'indemnisation.",
  },
  {
    q: "Puis-je assurer un véhicule d'occasion chez Sanlam ?",
    a: "Oui, Sanlam assure tous types de véhicules particuliers, utilitaires et d'occasion. Rapportez simplement votre carte grise et votre permis de conduire en agence ou contactez-nous au 3434 pour un devis immédiat.",
  },
]

export default function Auto() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[70vh] min-h-[480px] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-800/70 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-5">
              <Car className="w-6 h-6 text-blue-300" />
              <span className="text-blue-200 font-semibold text-sm uppercase tracking-wider">Assurance Auto</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
              Roulez l'esprit<br />
              <span className="text-blue-300">tranquille</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-blue-100/80 text-lg leading-relaxed mb-7">
              De la RC obligatoire au tous risques — des garanties qui s'adaptent à votre véhicule et votre budget.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link to="/contact" className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 flex items-center gap-2">
                Obtenir un devis <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:3434" className="border-2 border-white/40 hover:border-white/70 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2">
                <Phone className="w-4 h-4" /> 3434
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Garanties ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-brand-500 font-semibold text-sm uppercase tracking-wider mb-3">Nos formules</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-800 mb-4">Des garanties pour chaque besoin</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Choisissez la couverture adaptée à votre situation et votre véhicule.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="grid md:grid-cols-3 gap-7"
          >
            {GARANTIES.map((g, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="border border-gray-200 rounded-2xl p-7 hover:border-brand-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 bg-brand-50 group-hover:bg-brand-500 rounded-xl flex items-center justify-center transition-colors">
                    <g.Icon className="w-6 h-6 text-brand-500 group-hover:text-white transition-colors" />
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${g.badgeColor}`}>{g.badge}</span>
                </div>
                <h3 className="text-lg font-bold text-brand-800 mb-3">{g.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{g.desc}</p>
                <ul className="space-y-2.5">
                  {g.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Comment déclarer un sinistre ── */}
      <section className="py-24 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <AlertTriangle className="w-4 h-4" /> En cas de sinistre
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-800 mb-4">Comment déclarer un sinistre ?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Suivez ces 4 étapes pour un traitement rapide et serein de votre dossier.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <span className="text-5xl font-extrabold text-brand-100 leading-none mb-4 block">{s.num}</span>
                <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center justify-center mb-4">
                  <s.Icon className="w-5 h-5 text-brand-500" />
                </div>
                <h3 className="font-bold text-brand-800 mb-2 leading-snug">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                {i < STEPS.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-brand-300 z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-brand-500 font-semibold text-sm uppercase tracking-wider mb-3">Questions fréquentes</p>
            <h2 className="text-3xl font-bold text-brand-800">Tout ce que vous devez savoir</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Accordion items={FAQ} />
          </motion.div>
          <div className="mt-10 text-center">
            <p className="text-gray-500 mb-4">Vous avez d'autres questions ?</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-800 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Contactez-nous <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
