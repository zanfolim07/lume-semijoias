import { ArrowRight } from 'lucide-react'
import { generalWhatsappLink } from '../utils/whatsapp'
import { useReveal } from '../hooks/useReveal'
import './Contact.css'

const topics = [
  { label: 'Consultar disponibilidade', message: 'Olá, Lume! Gostaria de consultar a disponibilidade de algumas peças.' },
  { label: 'Ajuda para presentear', message: 'Olá, Lume! Estou procurando uma peça para presentear. Pode me ajudar?' },
  { label: 'Pagamento e envio', message: 'Olá, Lume! Gostaria de saber sobre formas de pagamento e envio.' },
]

export default function Contact() {
  const ref = useReveal()

  return (
    <section id="contato" className="contact" aria-labelledby="contato-title">
      <picture>
        <source media="(max-width: 700px)" srcSet="/images/editorial/cta-banner-mobile.webp" />
        <img
          className="contact__image"
          src="/images/editorial/cta-banner.webp"
          alt=""
          loading="lazy"
          width="2000"
          height="1100"
        />
      </picture>

      <div ref={ref} className="contact__content container reveal-group">
        <p className="contact__label" style={{ '--i': 0 }}>
          Atendimento Lume
        </p>
        <h2 id="contato-title" className="contact__title" style={{ '--i': 1 }}>
          Encontrou a sua peça? <span className="contact__accent">Vamos conversar.</span>
        </h2>
        <p className="contact__text" style={{ '--i': 2 }}>
          Tire dúvidas, consulte disponibilidade e finalize seu pedido diretamente com a gente pelo
          WhatsApp.
        </p>
        <div className="contact__actions" style={{ '--i': 3 }}>
          <a className="btn btn--white" href={generalWhatsappLink()} target="_blank" rel="noopener noreferrer">
            Falar com a Lume
            <ArrowRight size={16} strokeWidth={2} />
          </a>
        </div>
        <ul className="contact__topics" style={{ '--i': 4 }} aria-label="Assuntos frequentes">
          {topics.map((t) => (
            <li key={t.label}>
              <a href={generalWhatsappLink(t.message)} target="_blank" rel="noopener noreferrer">
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
