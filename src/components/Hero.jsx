import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import './Hero.css'

export default function Hero({ onSelectFilter }) {
  const bannerRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight)
        bannerRef.current?.style.setProperty('--parallax', `${y * 0.3}px`)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div ref={bannerRef} className="hero__banner">
        <picture>
          <source media="(max-width: 700px)" srcSet="/images/editorial/hero-banner-mobile.webp" />
          <img
            className="hero__image"
            src="/images/editorial/hero-banner.webp"
            alt="Mulher de blusa preta usando colar de elos dourados e pulseira"
            width="2000"
            height="1100"
            fetchPriority="high"
          />
        </picture>

        <div className="hero__content container">
          <h1 id="hero-title" className="hero__title">
            A luz que permanece <span className="hero__accent">em você.</span>
          </h1>
          <p className="hero__lead">
            Semijoias delicadas e contemporâneas para acompanhar seus dias, dos mais simples aos mais
            especiais.
          </p>
          <div className="hero__actions">
            <a href="#colecao" className="btn btn--white">
              Ver coleção
              <ArrowRight size={16} strokeWidth={2} />
            </a>
            <button type="button" className="btn btn--ghost-light" onClick={() => onSelectFilter('destaques')}>
              Mais desejadas
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
