import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, ShoppingBag, X } from 'lucide-react'
import { categories } from '../data/categories'
import { formatInstallment, formatPrice } from '../utils/format'
import { productImages } from '../utils/productImages'
import { productWhatsappLink } from '../utils/whatsapp'
import SocialIcon from './SocialIcon'
import './ProductDialog.css'

export default function ProductDialog({ product, onClose, onAddToBag }) {
  const ref = useRef(null)
  const touchX = useRef(null)
  const [index, setIndex] = useState(0)

  const images = product ? productImages(product) : []
  const current = images[index] ?? images[0]

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (product && !dialog.open) dialog.showModal()
    if (!product && dialog.open) dialog.close()
    setIndex(0)
  }, [product])

  const go = (step) => setIndex((i) => (i + step + images.length) % images.length)

  const onKeyDown = (e) => {
    if (images.length < 2) return
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX)
  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
    touchX.current = null
  }

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const box = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--zoom-x', `${((e.clientX - box.left) / box.width) * 100}%`)
    e.currentTarget.style.setProperty('--zoom-y', `${((e.clientY - box.top) / box.height) * 100}%`)
  }

  const onClick = (e) => {
    if (e.target === ref.current) onClose()
  }

  const category = product && categories.find((c) => c.id === product.category)?.label

  return (
    <dialog
      ref={ref}
      className="product-dialog"
      onClose={onClose}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-labelledby="product-dialog-title"
    >
      {product && (
        <div className="product-dialog__content">
          <div className="product-dialog__gallery">
            <figure
              className="product-dialog__media"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onPointerMove={onPointerMove}
            >
              <img
                key={current.src}
                src={current.src}
                alt={current.alt}
                style={current.focus ? { objectPosition: current.focus } : undefined}
              />
              {images.length > 1 && (
                <>
                  <button type="button" className="product-dialog__nav product-dialog__nav--prev" onClick={() => go(-1)} aria-label="Foto anterior">
                    <ChevronLeft size={20} strokeWidth={1.75} />
                  </button>
                  <button type="button" className="product-dialog__nav product-dialog__nav--next" onClick={() => go(1)} aria-label="Próxima foto">
                    <ChevronRight size={20} strokeWidth={1.75} />
                  </button>
                  <span className="product-dialog__counter" aria-live="polite">
                    {index + 1} / {images.length}
                  </span>
                </>
              )}
            </figure>

            {images.length > 1 && (
              <ul className="product-dialog__thumbs" aria-label="Fotos da peça">
                {images.map((img, i) => (
                  <li key={img.src}>
                    <button
                      type="button"
                      className="product-dialog__thumb"
                      aria-current={i === index}
                      aria-label={`Ver foto ${i + 1} de ${images.length}`}
                      onClick={() => setIndex(i)}
                    >
                      <img src={img.src} alt="" style={img.focus ? { objectPosition: img.focus } : undefined} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="product-dialog__info">
            <button type="button" className="product-dialog__close" onClick={onClose} aria-label="Fechar detalhes">
              <X size={20} strokeWidth={1.75} />
            </button>
            <p className="eyebrow">
              {category}
              {product.collection && ` · Coleção ${product.collection}`}
            </p>
            <h2 id="product-dialog-title" className="product-dialog__title">
              {product.name}
            </h2>
            <p className="product-dialog__price">{formatPrice(product.price)}</p>
            <p className="product-dialog__installments">ou {formatInstallment(product.price)} sem juros</p>
            <p className="product-dialog__desc">{product.description}</p>

            <div className="product-dialog__actions">
              <button type="button" className="btn btn--primary btn--block" onClick={() => onAddToBag(product)}>
                <ShoppingBag size={18} strokeWidth={1.75} />
                Adicionar à sacola
              </button>
              <a
                className="btn btn--ghost btn--block"
                href={productWhatsappLink(product, 'buy')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon id="whatsapp" />
                Comprar só esta peça
              </a>
            </div>
            <a
              className="product-dialog__ask"
              href={productWhatsappLink(product, 'ask')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tirar dúvida sobre esta peça
            </a>
          </div>
        </div>
      )}
    </dialog>
  )
}
