import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { filters } from '../data/categories'
import { products } from '../data/products'
import SectionHeading from './SectionHeading'
import ProductCard from './ProductCard'
import './Catalog.css'

const PAGE_SIZE = 8

const collections = [...new Set(products.map((p) => p.collection).filter(Boolean))]

const sorters = {
  relevancia: { label: 'Relevância', fn: null },
  'menor-preco': { label: 'Menor preço', fn: (a, b) => a.price - b.price },
  'maior-preco': { label: 'Maior preço', fn: (a, b) => b.price - a.price },
  'a-z': { label: 'Nome (A–Z)', fn: (a, b) => a.name.localeCompare(b.name, 'pt-BR') },
}

const byCategory = (filter) => (p) =>
  filter === 'todos' || (filter === 'destaques' ? p.featured : p.category === filter)

function Select({ id, label, value, onChange, children }) {
  return (
    <div className="select">
      <label htmlFor={id} className="select__label">
        {label}
      </label>
      <div className="select__control">
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
          {children}
        </select>
        <ChevronDown size={16} strokeWidth={1.75} aria-hidden="true" />
      </div>
    </div>
  )
}

export default function Catalog({ filter, onFilterChange, onOpenProduct }) {
  const [collection, setCollection] = useState('todas')
  const [sort, setSort] = useState('relevancia')
  const [limit, setLimit] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    const list = products
      .filter(byCategory(filter))
      .filter((p) => collection === 'todas' || p.collection === collection)
    const { fn } = sorters[sort]
    return fn ? [...list].sort(fn) : list
  }, [filter, collection, sort])

  useEffect(() => setLimit(PAGE_SIZE), [filter, collection, sort])

  const visible = filtered.slice(0, limit)
  const remaining = filtered.length - visible.length
  const hasFilters = filter !== 'todos' || collection !== 'todas' || sort !== 'relevancia'

  const showLess = () => {
    setLimit(PAGE_SIZE)
    document.getElementById('colecao')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const clear = () => {
    onFilterChange('todos')
    setCollection('todas')
    setSort('relevancia')
  }

  return (
    <section id="colecao" className="section catalog" aria-labelledby="colecao-title">
      <div className="container">
        <SectionHeading
          id="colecao-title"
          eyebrow="Catálogo"
          title={<>Selecione uma <span className="highlight">peça</span></>}
        />

        <div className="catalog__toolbar" role="group" aria-label="Filtros do catálogo">
          <div className="catalog__selects">
            <Select id="filtro-categoria" label="Categoria" value={filter} onChange={onFilterChange}>
              {filters.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.id === 'todos' ? 'Todas' : f.label}
                </option>
              ))}
            </Select>
            <Select id="filtro-colecao" label="Coleção" value={collection} onChange={setCollection}>
              <option value="todas">Todas</option>
              {collections.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
            <Select id="filtro-ordem" label="Ordenar por" value={sort} onChange={setSort}>
              {Object.entries(sorters).map(([id, { label }]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </Select>
          </div>

          <div className="catalog__meta">
            <p className="catalog__count" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'peça' : 'peças'}
            </p>
            {hasFilters && (
              <button type="button" className="catalog__clear" onClick={clear}>
                <X size={14} strokeWidth={2} aria-hidden="true" />
                Limpar filtros
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="catalog__empty">
            <p>Nenhuma peça encontrada com esses filtros.</p>
            <button type="button" className="btn btn--ghost btn--sm" onClick={clear}>
              Limpar filtros
            </button>
          </div>
        ) : (
          <ul key={`${filter}-${collection}-${sort}`} className="catalog__grid">
            {visible.map((product, i) => (
              <li key={product.id} style={{ '--i': i % PAGE_SIZE }}>
                <ProductCard product={product} onOpen={onOpenProduct} />
              </li>
            ))}
          </ul>
        )}

        {(remaining > 0 || limit > PAGE_SIZE) && (
          <div className="catalog__more">
            {limit > PAGE_SIZE && (
              <button type="button" className="btn btn--ghost" onClick={showLess}>
                Ver menos peças
              </button>
            )}
            {remaining > 0 && (
              <button type="button" className="btn btn--primary" onClick={() => setLimit((l) => l + PAGE_SIZE)}>
                Ver mais peças ({remaining})
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
