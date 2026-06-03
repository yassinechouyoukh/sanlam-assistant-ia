import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Clock, MapPin, Star, Car, Heart, CheckCircle, ArrowRight, Phone, Users, Building2, Award } from 'lucide-react'

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' } }),
}

const FEATURES = [
  { Icon: Shield,    title: 'Protection complète',   desc: 'Des garanties adaptées à chaque situation, pour vous et vos proches.' },
  { Icon: Clock,     title: 'Assistance 24h/24',     desc: 'Notre équipe est disponible à toute heure pour vous accompagner en cas de sinistre.' },
  { Icon: MapPin,    title: '+200 agences',           desc: 'Un réseau dense à travers tout le Maroc pour vous servir près de chez vous.' },
  { Icon: CheckCircle, title: 'Remboursement rapide', desc: 'Traitement de vos dossiers en 48h pour une indemnisation sans délai.' },
]

const STATS = [
  { Icon: Award,     value: '+50 ans',  label: "D'expérience au Maroc" },
  { Icon: Users,     value: '500 K',    label: 'Clients assurés' },
  { Icon: Building2, value: '+200',     label: 'Agences au Maroc' },
  { Icon: Phone,     value: '3434',     label: 'Assistance 24/7' },
]

const TESTIMONIALS = [
  { name: 'Khalid B.', age: 42, text: "Après mon accident, Sanlam m'a remboursé en moins de 48h. Une réactivité exemplaire, je ne changerai jamais d'assureur !" },
  { name: 'Fatima Z.', age: 35, text: "L'assurance santé couvre vraiment bien mes consultations et mes médicaments. Le service client est toujours à l'écoute." },
  { name: 'Ahmed R.',  age: 58, text: "Des conseillers compétents et une couverture complète. Sanlam accompagne ma famille depuis plus de 15 ans." },
]

export default function Accueil() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/92 via-brand-800/72 to-brand-700/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.14 } } }}
            className="max-w-2xl"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block bg-blue-500/20 border border-blue-400/40 text-blue-200 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
            >
              Assureur de confiance depuis 1974
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5"
            >
              Votre partenaire<br />assurance<br />
              <span className="text-blue-300">au Maroc</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-blue-100/80 leading-relaxed mb-8 max-w-lg"
            >
              Des solutions complètes pour protéger votre véhicule, votre santé
              et votre famille — avec la confiance de plus de 500 000 Marocains.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                to="/auto"
                className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-brand-500/30 flex items-center gap-2"
              >
                Découvrir nos offres <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white/40 hover:border-white/70 text-white font-semibold px-7 py-3.5 rounded-xl transition-all hover:bg-white/8"
              >
                Nous contacter
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40">
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── Pourquoi nous choisir ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-brand-500 font-semibold text-sm uppercase tracking-wider mb-3">Nos engagements</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-800 mb-4">Pourquoi choisir Sanlam ?</h2>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              Plus de 50 ans d'expertise au service des familles et des entreprises marocaines.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="group bg-brand-50 hover:bg-white border border-brand-100 hover:border-brand-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 cursor-default"
              >
                <div className="w-12 h-12 bg-brand-500/10 group-hover:bg-brand-500 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <f.Icon className="w-6 h-6 text-brand-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-brand-800 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Nos produits ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-brand-500 font-semibold text-sm uppercase tracking-wider mb-3">Ce que nous offrons</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-800 mb-4">Nos produits d'assurance</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Assurance Auto',
                desc: "Responsabilité civile obligatoire, tous risques, assistance dépannage 24h/24 — une couverture complète pour rouler l'esprit tranquille.",
                img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
                href: '/auto',
                Icon: Car,
                points: ['RC obligatoire légale', 'Couverture tous risques', 'Assistance 24/7'],
              },
              {
                title: 'Assurance Santé',
                desc: "Complément AMO, hospitalisation, consultations spécialisées et médicaments — prenez soin de vous et des vôtres sans compromis.",
                img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
                href: '/sante',
                Icon: Heart,
                points: ['Complément AMO', 'Remboursement consultations', 'Réseau de cliniques'],
              },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-5 flex items-center gap-2 text-white font-bold text-xl">
                    <p.Icon className="w-6 h-6 text-blue-300" />
                    {p.title}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed mb-4">{p.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {p.points.map((pt, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-brand-500 shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={p.href}
                    className="inline-flex items-center gap-2 bg-brand-800 hover:bg-brand-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
                  >
                    En savoir plus <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats band ── */}
      <section className="py-20 bg-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white"
          >
            {STATS.map((s, i) => (
              <motion.div key={i} custom={i} variants={fadeUp}>
                <s.Icon className="w-7 h-7 text-blue-300 mx-auto mb-3" />
                <div className="text-3xl sm:text-4xl font-extrabold mb-1">{s.value}</div>
                <div className="text-blue-100/65 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Témoignages ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-brand-500 font-semibold text-sm uppercase tracking-wider mb-3">Ils nous font confiance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-800">Ce que disent nos clients</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="grid md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="bg-brand-50 rounded-2xl p-7 border border-brand-100"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-800 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.age} ans — client Sanlam</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="py-20 bg-gradient-to-r from-brand-800 to-brand-500">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4 text-center text-white"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Prêt à être bien protégé ?
          </h2>
          <p className="text-blue-100/80 text-lg mb-8 leading-relaxed">
            Obtenez un devis personnalisé en quelques minutes. Nos conseillers vous
            accompagnent à chaque étape.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-white hover:bg-gray-50 text-brand-800 font-bold px-8 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg"
            >
              Obtenir un devis gratuit
            </Link>
            <a
              href="tel:3434"
              className="flex items-center gap-2 border-2 border-white/50 hover:border-white text-white font-semibold px-7 py-3.5 rounded-xl transition-all"
            >
              <Phone className="w-4 h-4" /> Appeler le 3434
            </a>
          </div>
        </motion.div>
      </section>
    </>
  )
}
