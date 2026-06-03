import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Shield, Menu, X, Phone } from 'lucide-react'

const NAV_LINKS = [
  { to: '/',        label: 'Accueil' },
  { to: '/auto',    label: 'Assurance Auto' },
  { to: '/sante',   label: 'Assurance Santé' },
  { to: '/apropos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname }          = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname])

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-brand-800 shadow-xl' : 'bg-brand-800/96 backdrop-blur'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl shrink-0">
            <Shield className="w-7 h-7 text-blue-300" />
            <span>Sanlam</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm font-medium transition-colors ${
                  pathname === to
                    ? 'text-white border-b-2 border-blue-300 pb-0.5'
                    : 'text-blue-100/75 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:3434"
              className="flex items-center gap-1.5 text-blue-100/75 hover:text-white text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>3434</span>
            </a>
            <Link
              to="/contact"
              className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow"
            >
              Espace client
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            className="md:hidden text-white p-1.5 rounded-md hover:bg-white/10 transition-colors"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-brand-900 border-t border-white/10 animate-in slide-in-from-top-2">
          <div className="max-w-7xl mx-auto px-4 py-5 space-y-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === to
                    ? 'bg-white/10 text-white'
                    : 'text-blue-100/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <a href="tel:3434" className="flex items-center gap-1.5 text-blue-100/75 text-sm">
                <Phone className="w-4 h-4" /> 3434
              </a>
              <Link
                to="/contact"
                className="bg-brand-500 text-white text-sm font-semibold px-4 py-2 rounded-lg"
              >
                Espace client
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
