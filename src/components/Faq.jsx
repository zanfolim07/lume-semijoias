import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import { faq } from '../data/faq'
import { useReveal } from '../hooks/useReveal'
import './Faq.css'

export default function Faq() {
  const ref = useReveal()
  const baseId = useId()
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="section faq" aria-labelledby="faq-title">
      <div ref={ref} className="container reveal-group">
        <header className="faq__header" style={{ '--i': 0 }}>
          <div>
            <p className="eyebrow">Dúvidas frequentes</p>
            <h2 id="faq-title" className="faq__title">
              Tudo o que você <span className="highlight">precisa saber</span>
            </h2>
          </div>
        </header>

        <ul className="faq__list" style={{ '--i': 1 }}>
          {faq.map((item, i) => {
            const isOpen = open === i
            const qId = `${baseId}-q${i}`
            const aId = `${baseId}-a${i}`
            return (
              <li key={item.q} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <h3>
                  <button
                    type="button"
                    id={qId}
                    className="faq__question"
                    aria-expanded={isOpen}
                    aria-controls={aId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="faq__number" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="faq__q">{item.q}</span>
                    <span className="faq__icon" aria-hidden="true">
                      <Plus size={18} strokeWidth={1.75} />
                    </span>
                  </button>
                </h3>
                <div id={aId} role="region" aria-labelledby={qId} className="faq__answer" aria-hidden={!isOpen}>
                  <div className="faq__answer-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
