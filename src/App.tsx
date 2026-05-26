import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import Home from '@/pages/Home'
import Quiz from '@/pages/Quiz'
import Result from '@/pages/Result'
import TokenInput from '@/pages/TokenInput'
import Story from '@/pages/Story'

const ROUTE_ORDER = ['/', '/quiz', '/result', '/token', '/story']

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const currentIndex = ROUTE_ORDER.indexOf(location.pathname)

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/quiz" element={<PageWrapper><Quiz /></PageWrapper>} />
        <Route path="/result" element={<PageWrapper><Result /></PageWrapper>} />
        <Route path="/token" element={<PageWrapper><TokenInput /></PageWrapper>} />
        <Route path="/story" element={<PageWrapper><Story /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen parchment-bg text-amber-100">
        <ScrollToTop />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  )
}
