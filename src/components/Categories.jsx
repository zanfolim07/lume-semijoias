import { categories } from '../data/categories'
import { products } from '../data/products'
import { useReveal } from '../hooks/useReveal'
import SectionHeading from './SectionHeading'
import './Categories.css'

const countFor = (id) => products.filter((p) => p.category === id).length

export default function Categories({ onSelect }) {
  const ref = useReveal()

  return (
    <section id="categorias" className="section categories" aria-labelledby="categorias-title">
      <div className="container">
        <SectionHeading
          id="categorias-title"
          eyebrow="Categorias"
          title="Compre por categoria"
          text="Brincos, colares, pulseiras, anéis e conjuntos para montar combinações do seu jeito."
        />
      </div>

      <ul ref={ref} className="categories__row reveal-group">
        {categories.map((cat, i) => (
          <li key={cat.id} style={{ '--i': i }}>
            <button type="button" className="category-tile" onClick={() => onSelect(cat.id)}>
              <img src={cat.image} alt="" loading="lazy" width="900" height="1125" />
              <span className="category-tile__info">
                <span className="category-tile__name">{cat.label}</span>
                <span className="category-tile__cta">Ver {countFor(cat.id)} peças</span>
              </span>
              <span className="visually-hidden">, ver {cat.label.toLowerCase()} no catálogo</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
