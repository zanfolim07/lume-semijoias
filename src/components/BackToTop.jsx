import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import './BackToTop.css'

const RADIUS = 22
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function BackToTop() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const y = window.scrollY
        setProgress(max > 0 ? Math.min(y / max, 1) : 0)
        setVisible(y > window.innerHeight * 0.8)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? 'is-visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Voltar ao topo"
      tabIndex={visible ? 0 : -1}
    >
      <svg className="back-to-top__ring" viewBox="0 0 52 52" aria-hidden="true">
        <circle className="back-to-top__track" cx="26" cy="26" r={RADIUS} />
        <circle
          className="back-to-top__progress"
          cx="26"
          cy="26"
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        />
      </svg>
      <ArrowUp size={18} strokeWidth={1.75} />
    </button>
  )
}
