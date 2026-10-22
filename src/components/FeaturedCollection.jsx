import { ArrowUpRight } from 'lucide-react'
import { products } from '../data/products'
import { formatPrice } from '../utils/format'
import { useReveal } from '../hooks/useReveal'
import './FeaturedCollection.css'

const COLLECTION = 'Aurora'
const pieces = products.filter((p) => p.collection === COLLECTION).slice(0, 4)

export default function FeaturedCollection({ onOpenProduct }) {
  const ref = useReveal()

  return (
    <section className="section featured" aria-labelledby="featured-title">
      <div ref={ref} className="featured__inner reveal-group">
        <div className="featured__banner" style={{ '--i': 0 }}>
          <img
            src="/images/editorial/aurora-banner.webp"
            alt="Mulher com vestido acetinado dourado usando colares finos em camadas"
            loading="lazy"
            width="1200"
            height="1500"
          />
          <div className="featured__banner-content">
            <p className="featured__label">Coleção em destaque</p>
            <h2 id="featured-title" className="featured__title">
              Aurora
            </h2>
            <p className="featured__text">
              Elos marcantes, argolas esculpidas e pedras em tons de terra. Peças douradas pensadas
              para usar em camadas.
            </p>
            <p className="featured__count">{pieces.length} peças selecionadas →</p>
          </div>
        </div>

        <ul className="featured__grid" style={{ '--i': 1 }} aria-label={`Peças da coleção ${COLLECTION}`}>
          {pieces.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                className="featured-tile"
                onClick={() => onOpenProduct(p)}
                aria-label={`${p.name}, ${formatPrice(p.price)} , ver detalhes`}
              >
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  width="900"
                  height="1125"
                  style={p.focus ? { objectPosition: p.focus } : undefined}
                />
                <span className="featured-tile__arrow" aria-hidden="true">
                  <ArrowUpRight size={20} strokeWidth={1.75} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
