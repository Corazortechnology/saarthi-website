import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { ScrollProgress } from '../components/ui/ScrollProgress'

export function SiteLayout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="min-h-screen bg-bg text-fg">
      <ScrollProgress />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
