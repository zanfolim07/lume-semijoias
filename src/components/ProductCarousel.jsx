import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { products } from '../data/products'
import SectionHeading from './SectionHeading'
import ProductCard from './ProductCard'
import './ProductCarousel.css'

const featured = products.filter((p) => p.featured)

export default function ProductCarousel({ onOpenProduct }) {
  const trackRef = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const update = () =>
      setEdges({
        start: track.scrollLeft <= 4,
        end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
      })
    update()
    track.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      track.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const scroll = (dir) => {
    const track = trackRef.current
    track?.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="section carousel" aria-labelledby="carousel-title">
      <div className="container">
        <SectionHeading
          id="carousel-title"
          eyebrow="Destaques"
          title="Mais desejadas"
          action={
            <div className="carousel__controls">
              <button type="button" onClick={() => scroll(-1)} disabled={edges.start} aria-label="Ver peças anteriores">
                <ChevronLeft size={20} strokeWidth={1.75} />
              </button>
              <button type="button" onClick={() => scroll(1)} disabled={edges.end} aria-label="Ver próximas peças">
                <ChevronRight size={20} strokeWidth={1.75} />
              </button>
            </div>
          }
        />
      </div>

      <ul ref={trackRef} className="carousel__track" aria-label="Peças em destaque">
        {featured.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} onOpen={onOpenProduct} />
          </li>
        ))}
      </ul>
    </section>
  )
}
