import { categories } from '../data/categories'
import { formatInstallment, formatPrice } from '../utils/format'
import './ProductCard.css'

const categoryLabel = (id) => categories.find((c) => c.id === id)?.label

export default function ProductCard({ product, onOpen }) {
  return (
    <article className="product-card">
      <button
        type="button"
        className="product-card__link"
        onClick={() => onOpen(product)}
        aria-label={`${product.name}${product.badge ? `, ${product.badge}` : ''}, ${formatPrice(product.price)}, ver detalhes`}
      >
        <span className="product-card__media">
          <img
            src={product.image}
            alt={product.alt}
            loading="lazy"
            decoding="async"
            width="900"
            height="1125"
            style={product.focus ? { objectPosition: product.focus } : undefined}
          />
          {product.gallery?.[0] && (
            <img
              className="product-card__alt-image"
              src={product.gallery[0].src}
              alt=""
              loading="lazy"
              decoding="async"
              width="900"
              height="1125"
            />
          )}
          {(product.badge || product.collection) && (
            <span className="product-card__tags">
              {product.badge && <span className="product-card__tag product-card__tag--badge">{product.badge}</span>}
              {product.collection && <span className="product-card__tag">{product.collection}</span>}
            </span>
          )}
        </span>

        <span className="product-card__body">
          <span className="product-card__category">{categoryLabel(product.category)}</span>
          <span className="product-card__name">{product.name}</span>
          <span className="product-card__price">{formatPrice(product.price)}</span>
          <span className="product-card__installments">ou {formatInstallment(product.price)}</span>
        </span>
      </button>
    </article>
  )
}
