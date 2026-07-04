import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin brand-gradient progress bar pinned to the very top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand-blue via-teal-activeDark to-insight-light"
      aria-hidden="true"
    />
  )
}
