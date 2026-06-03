import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

const PRODUCTS = [
  { to: '/auto',  label: 'Assurance Auto' },
  { to: '/sante', label: 'Assurance Santé' },
]
const LINKS = [
  { to: '/',        label: 'Accueil' },
  { to: '/apropos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
]

// Brand icons as minimal inline SVGs (lucide-react dropped them)
const SocialIcons = [
  {
    label: 'Facebook',
    path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  },
  {
    label: 'X / Twitter',
    path: 'M4 4l16 16M4 20 20 4',
    isX: true,
  },
  {
    label: 'LinkedIn',
    path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  },
  {
    label: 'Instagram',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 1.17.055 1.805.249 2.227.415a3.6 3.6 0 0 1 1.34.872 3.6 3.6 0 0 1 .872 1.34c.166.422.36 1.057.413 2.227.06 1.265.072 1.645.072 4.849s-.012 3.584-.072 4.849c-.053 1.17-.247 1.805-.413 2.227a3.6 3.6 0 0 1-.872 1.34 3.6 3.6 0 0 1-1.34.872c-.422.166-1.057.36-2.227.413-1.266.06-1.644.072-4.85.072s-3.584-.012-4.849-.072c-1.17-.053-1.805-.247-2.227-.413a3.6 3.6 0 0 1-1.34-.872 3.6 3.6 0 0 1-.872-1.34c-.166-.422-.36-1.057-.413-2.227C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.072-4.849c.053-1.17.247-1.805.413-2.227a3.6 3.6 0 0 1 .872-1.34 3.6 3.6 0 0 1 1.34-.872c.422-.166 1.057-.36 2.227-.413C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.775.131 4.905.333 4.14.63a5.76 5.76 0 0 0-2.086 1.36A5.76 5.76 0 0 0 .63 4.077C.333 4.842.131 5.712.072 6.99.014 8.27 0 8.678 0 12c0 3.32.014 3.73.072 5.01.059 1.277.261 2.148.558 2.912a5.76 5.76 0 0 0 1.362 2.086 5.76 5.76 0 0 0 2.086 1.362c.764.297 1.635.499 2.912.558C8.27 23.986 8.678 24 12 24s3.73-.014 5.01-.072c1.277-.059 2.148-.261 2.912-.558a5.76 5.76 0 0 0 2.086-1.362 5.76 5.76 0 0 0 1.362-2.086c.297-.764.499-1.635.558-2.912C23.986 15.73 24 15.322 24 12s-.014-3.73-.072-5.01c-.059-1.277-.261-2.148-.558-2.912a5.76 5.76 0 0 0-1.362-2.086A5.76 5.76 0 0 0 19.922.63C19.158.333 18.287.131 17.01.072 15.73.014 15.322 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z',
  },
]

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/sanlam-logo-white.png"
                alt="Sanlam Maroc"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-blue-100/60 text-sm leading-relaxed max-w-xs">
              Votre partenaire de confiance pour l'assurance au Maroc depuis plus de 50 ans.
              Nous protégeons ce qui compte le plus pour vous.
            </p>
            <div className="flex gap-2.5 mt-5">
              {SocialIcons.map(({ label, path, isX }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 bg-white/8 hover:bg-brand-500 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-5">Produits</h4>
            <ul className="space-y-3">
              {PRODUCTS.map(p => (
                <li key={p.to}>
                  <Link to={p.to} className="text-blue-100/65 hover:text-white text-sm transition-colors">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-5">Liens utiles</h4>
            <ul className="space-y-3">
              {LINKS.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-blue-100/65 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-5">Contact</h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-sm text-blue-100/65">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
                <span>Assistance : <strong className="text-white font-semibold">3434</strong></span>
              </li>
              <li className="flex items-start gap-3 text-sm text-blue-100/65">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
                <span>contact@sanlam.ma</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-blue-100/65">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
                <span>Avenue Hassan II, Casablanca, Maroc</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-blue-100/40">
          <p>© 2026 Sanlam Maroc. Tous droits réservés.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
