import './Marquee.css'

const items = ['Brincos', 'Colares', 'Pulseiras', 'Anéis', 'Conjuntos', 'Coleção Aurora', 'Atendimento personalizado']

export default function Marquee() {
  const loop = [...items, ...items]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {loop.map((item, i) => (
          <span key={i} className="marquee__item">
            {item}
            <span className="marquee__star">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
