import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Accueil from './pages/Accueil'
import Auto from './pages/Auto'
import Sante from './pages/Sante'
import Apropos from './pages/Apropos'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"        element={<Accueil />} />
            <Route path="/auto"    element={<Auto />} />
            <Route path="/sante"   element={<Sante />} />
            <Route path="/apropos" element={<Apropos />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>

      {/* ── Chat widget mount point — integrated in next step ── */}
      <div id="chat-widget-root" className="fixed bottom-6 right-6 z-50" />
    </BrowserRouter>
  )
}
