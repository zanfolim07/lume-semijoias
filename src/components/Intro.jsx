import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import './Intro.css'

export default function Intro({ onEnter }) {
  const [leaving, setLeaving] = useState(false)
  useEffect(() => {
    const root = document.documentElement
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = ''
    }
  }, [])

  const enter = () => {
    if (leaving) return
    window.scrollTo({ top: 0, behavior: 'instant' })
    setLeaving(true)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.setTimeout(onEnter, reduced ? 0 : 1350)
  }

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && enter()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <section className={`intro ${leaving ? 'intro--leaving' : ''}`} aria-label="Boas-vindas à Lume Semijoias">
      <picture>
        <source media="(max-width: 700px)" srcSet="/images/editorial/intro-mobile.webp" />
        <img
          className="intro__image"
          src="/images/editorial/intro.webp"
          alt="Mulher de camisa branca usando anéis, colares e pulseira dourados"
          width="2000"
          height="1600"
          fetchPriority="high"
        />
      </picture>

      <div className="intro__content">
        <h1 className="intro__name" aria-label="Lume">
          {'lume'.split('').map((letter, i) => (
            <span key={i} style={{ '--i': i }} aria-hidden="true">
              {letter}
            </span>
          ))}
          <span className="intro__dot" style={{ '--i': 4 }} aria-hidden="true">
            .
          </span>
        </h1>
        <div className="intro__bottom">
          <p className="intro__text">
            Joias delicadas e contemporâneas, feitas para iluminar cada momento, do dia a dia às
            ocasiões especiais.
          </p>
          <div className="intro__actions">
            <button type="button" className="btn btn--white intro__cta" onClick={enter}>
              Ver catálogo
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
