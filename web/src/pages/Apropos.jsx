import { motion } from 'framer-motion'
import { Shield, Target, Eye, Heart, Users, Building2, Award, Globe } from 'lucide-react'

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' } }),
}

const VALEURS = [
  { Icon: Shield, title: 'Confiance',    desc: "La relation avec nos clients est bâtie sur la transparence et le respect de nos engagements, depuis le premier jour." },
  { Icon: Target, title: 'Excellence',  desc: "Nous visons en permanence la meilleure qualité de service, de la souscription au remboursement." },
  { Icon: Heart,  title: 'Proximité',   desc: "Avec plus de 200 agences au Maroc, nous sommes toujours proches de vous, où que vous soyez." },
  { Icon: Globe,  title: 'Innovation',  desc: "Nous modernisons continuellement nos offres et notre service pour répondre aux besoins d'aujourd'hui." },
]

const STATS = [
  { Icon: Award,     value: '+50 ans',  label: "D'expérience au Maroc" },
  { Icon: Users,     value: '500 K',    label: 'Clients assurés' },
  { Icon: Building2, value: '+200',     label: 'Agences à travers le Maroc' },
  { Icon: Target,    value: '98 %',     label: 'Taux de satisfaction client' },
]

const TIMELINE = [
  { year: '1974', event: "Fondation de Sanlam Maroc, avec pour mission de démocratiser l'accès à l'assurance pour les familles marocaines." },
  { year: '1990', event: "Lancement de la première gamme d'assurance santé complémentaire, ouvrant la voie à la protection médicale pour tous." },
  { year: '2005', event: "Accompagnement de la réforme de l'AMO et déploiement du réseau de soins conventionnés à l'échelle nationale." },
  { year: '2015', event: "Modernisation digitale : lancement de l'espace client en ligne et de l'application mobile de déclaration de sinistre." },
  { year: '2026', event: "Aujourd'hui, Sanlam Maroc accompagne plus de 500 000 assurés avec un réseau de +200 agences et une assistance 24/7." },
]

export default function Apropos() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/92 via-brand-800/70 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-5">
              <Shield className="w-6 h-6 text-blue-300" />
              <span className="text-blue-200 font-semibold text-sm uppercase tracking-wider">À propos</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
              Plus de 50 ans au service<br />
              <span className="text-blue-300">des Marocains</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-blue-100/80 text-lg leading-relaxed">
              Sanlam Maroc est l'un des assureurs les plus ancrés dans le quotidien des familles et des entreprises marocaines.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Notre histoire ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-brand-500 font-semibold text-sm uppercase tracking-wider mb-3">Notre histoire</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-800 mb-6">Un engagement enraciné au Maroc</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Fondée en 1974, Sanlam Maroc a accompagné des générations de Marocains dans la protection de leur vie, leur santé et leur patrimoine. Depuis plus de 50 ans, nous construisons une relation de confiance durable avec nos clients.
                </p>
                <p>
                  Notre mission est simple : rendre l'assurance accessible, compréhensible et efficace pour tous. Qu'il s'agisse d'une famille qui assure sa voiture, d'un salarié qui complète son AMO ou d'un chef d'entreprise qui protège ses actifs.
                </p>
                <p>
                  Aujourd'hui, Sanlam Maroc s'appuie sur un réseau de plus de 200 agences, des milliers de partenaires de soins, et des équipes dédiées à votre service 24h/24.
                </p>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              {TIMELINE.map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">{item.year.slice(2)}</span>
                    </div>
                    {i < TIMELINE.length - 1 && <div className="w-px flex-1 bg-brand-100 mt-2" />}
                  </div>
                  <div className="pb-6">
                    <p className="font-bold text-brand-800 mb-1">{item.year}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-20 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                Icon: Target,
                title: 'Notre mission',
                text: "Offrir à chaque Marocain une couverture d'assurance adaptée à ses besoins et accessible, pour qu'il puisse avancer dans la vie l'esprit tranquille.",
              },
              {
                Icon: Eye,
                title: 'Notre vision',
                text: "Être l'assureur de référence au Maroc, reconnu pour la qualité de son service, la solidité de ses garanties et la proximité de son accompagnement.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-brand-100"
              >
                <div className="w-12 h-12 bg-brand-500/10 rounded-xl flex items-center justify-center mb-5">
                  <item.Icon className="w-6 h-6 text-brand-500" />
                </div>
                <h3 className="text-xl font-bold text-brand-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Valeurs ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-brand-500 font-semibold text-sm uppercase tracking-wider mb-3">Ce qui nous guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-800">Nos valeurs</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {VALEURS.map((v, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} className="text-center p-6">
                <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <v.Icon className="w-7 h-7 text-brand-500" />
                </div>
                <h3 className="font-bold text-brand-800 text-lg mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 bg-brand-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
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
    </>
  )
}
