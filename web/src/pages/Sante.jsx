import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Stethoscope, Building2, Pill, Phone, CheckCircle, ArrowRight, Activity, Users } from 'lucide-react'
import Accordion from '../components/Accordion'

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' } }),
}

const COVERAGES = [
  {
    Icon: Activity,
    title: 'Complément AMO',
    desc: "Renforcez votre Assurance Maladie Obligatoire (AMO). Notre complément prend en charge la part qui reste à votre charge après le remboursement de la CNSS ou CNOPS.",
    points: ['Ticket modérateur pris en charge', 'Pas de frais à avancer en réseau', 'Couverture famille incluse'],
  },
  {
    Icon: Building2,
    title: 'Hospitalisation',
    desc: "Frais d'hospitalisation, chirurgie, anesthésie, soins intensifs — nos formules couvrent vos séjours en clinique ou hôpital, en réseau ou hors réseau.",
    points: ['Frais de chambre et de séjour', 'Chirurgie et honoraires médicaux', "Maternité et accouchement", "Soins intensifs et réanimation"],
  },
  {
    Icon: Stethoscope,
    title: 'Consultations & Spécialistes',
    desc: "Médecin généraliste, dentiste, kinésithérapeute, ophtalmo, cardiologue — vos consultations remboursées selon votre formule.",
    points: ['80% remboursé chez le généraliste', '70% remboursé chez le spécialiste', 'Dentisterie et soins dentaires', 'Analyses et radiologies'],
  },
  {
    Icon: Pill,
    title: 'Médicaments & Pharmacie',
    desc: "Remboursement de vos ordonnances selon la liste des médicaments remboursables, avec des taux avantageux selon votre plan santé.",
    points: ['Médicaments génériques et de marque', 'Produits parapharmaceutiques', 'Dispositifs médicaux'],
  },
]

const NETWORK = [
  { label: 'Cliniques partenaires', value: '+500' },
  { label: 'Médecins conventionnés', value: '+3 000' },
  { label: 'Laboratoires partenaires', value: '+200' },
  { label: 'Pharmacies agréées', value: '+1 500' },
]

const FAQ = [
  {
    q: "Qu'est-ce que l'AMO et comment Sanlam la complète-t-elle ?",
    a: "L'AMO (Assurance Maladie Obligatoire) est le régime public de couverture santé au Maroc, géré par la CNSS ou la CNOPS. Elle rembourse une partie de vos frais médicaux. La complémentaire santé Sanlam prend en charge le « ticket modérateur » — la part restant à votre charge — réduisant ainsi vos frais réels à quasi zéro en réseau.",
  },
  {
    q: "Quel est le taux de remboursement pour une consultation médicale ?",
    a: "Après intervention de l'AMO, Sanlam rembourse 80% du tarif de référence pour une consultation chez un médecin généraliste, et 70% chez un médecin spécialiste. En réseau de soins Sanlam, le tiers payant s'applique : vous n'avancez aucun frais.",
  },
  {
    q: "Y a-t-il un délai de carence avant d'être couvert ?",
    a: "Le délai de carence varie selon les garanties : immédiat pour les accidents, 1 mois pour les maladies courantes, 6 à 9 mois pour la maternité selon les formules. Ces délais sont précisés dans votre contrat.",
  },
  {
    q: "Comment fonctionne le tiers payant en réseau Sanlam ?",
    a: "Dans les établissements partenaires du réseau Sanlam (cliniques, médecins, pharmacies), vous présentez simplement votre carte de bénéficiaire. Vous ne payez que votre éventuelle participation, sans avance de frais. La facturation est directement prise en charge par Sanlam.",
  },
  {
    q: "Puis-je couvrir toute ma famille avec un seul contrat ?",
    a: "Oui. Nos formules famille couvrent conjoint(e) et enfants à charge sur un seul contrat, avec des cotisations adaptées. Vous pouvez ajouter des bénéficiaires à tout moment, dans les délais prévus au contrat.",
  },
]

export default function Sante() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[70vh] min-h-[480px] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/92 via-brand-800/72 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-5">
              <Heart className="w-6 h-6 text-blue-300" />
              <span className="text-blue-200 font-semibold text-sm uppercase tracking-wider">Assurance Santé</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
              Prenez soin de<br />
              <span className="text-blue-300">vous et des vôtres</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-blue-100/80 text-lg leading-relaxed mb-7">
              Complément AMO, hospitalisation, consultations — une couverture santé complète pour toute la famille.
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

      {/* ── Coverages ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-brand-500 font-semibold text-sm uppercase tracking-wider mb-3">Ce qui est couvert</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-800 mb-4">Une couverture santé à 360°</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Des garanties modulables selon vos besoins et votre budget.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {COVERAGES.map((c, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="bg-gray-50 hover:bg-white border border-gray-200 hover:border-brand-200 rounded-2xl p-7 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="w-12 h-12 bg-brand-500/10 group-hover:bg-brand-500 rounded-xl flex items-center justify-center mb-5 transition-colors">
                  <c.Icon className="w-6 h-6 text-brand-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-brand-800 mb-3">{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{c.desc}</p>
                <ul className="space-y-2">
                  {c.points.map((pt, j) => (
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

      {/* ── Réseau ── */}
      <section className="py-20 bg-brand-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-3">Un réseau de soins étendu</h2>
            <p className="text-blue-100/70">Le tiers payant sans avance de frais dans tout le réseau Sanlam.</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center"
          >
            {NETWORK.map((n, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} className="bg-white/8 rounded-2xl p-6 border border-white/10">
                <div className="text-3xl font-extrabold text-blue-200 mb-1">{n.value}</div>
                <div className="text-blue-100/65 text-sm">{n.label}</div>
              </motion.div>
            ))}
          </motion.div>
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
            <p className="text-gray-500 mb-4">Une question sur votre couverture santé ?</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-800 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Contactez-nous <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
