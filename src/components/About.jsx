import { useReveal } from '../hooks/useReveal'
import './About.css'

const values = [
  { title: 'Curadoria atenta', text: 'Cada peça é escolhida pelo desenho, pelo acabamento e pelo caimento.' },
  { title: 'Design atemporal', text: 'Formas que atravessam estações e combinam entre si.' },
  { title: 'Atendimento próximo', text: 'Conversa direta, do primeiro olhar até o pedido.' },
]

export default function About() {
  const ref = useReveal()

  return (
    <section id="sobre" className="section about" aria-labelledby="sobre-title">
      <div ref={ref} className="about__inner container reveal-group">
        <figure className="about__media" style={{ '--i': 0 }}>
          <img
            src="/images/editorial/sobre.webp"
            alt="Mulher de blusa branca com colares finos e anéis dourados"
            loading="lazy"
            width="1200"
            height="1714"
          />
        </figure>

        <div className="about__content" style={{ '--i': 1 }}>
          <p className="eyebrow">Sobre a Lume</p>
          <h2 id="sobre-title" className="about__title">
            Detalhes que fazem <span className="highlight">brilhar.</span>
          </h2>
          <p className="about__lead">
            Lume quer dizer luz. É assim que enxergamos uma joia: um ponto de brilho que ilumina o
            rosto, completa o gesto e vira assinatura de quem usa.
          </p>
          <p className="about__text">
            Nosso catálogo reúne peças delicadas e contemporâneas, pensadas para o dia a dia e para as
            ocasiões que merecem um cuidado a mais.
          </p>

          <ul className="about__values">
            {values.map(({ title, text }, i) => (
              <li key={title}>
                <span className="about__number" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
