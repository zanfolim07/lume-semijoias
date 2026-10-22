import { useEffect, useRef } from 'react'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { formatInstallment, formatPrice } from '../utils/format'
import { bagWhatsappLink } from '../utils/whatsapp'
import SocialIcon from './SocialIcon'
import './BagDrawer.css'

export default function BagDrawer({ bag, open, onClose, onBrowse }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const onClick = (e) => {
    if (e.target === ref.current) onClose()
  }

  const { items, count, total, setQty } = bag

  return (
    <dialog ref={ref} className="bag" onClose={onClose} onClick={onClick} aria-labelledby="bag-title">
      <div className="bag__panel">
        <header className="bag__header">
          <h2 id="bag-title" className="bag__title">
            Sua sacola {count > 0 && <span className="bag__count">{count}</span>}
          </h2>
          <button type="button" className="bag__close" onClick={onClose} aria-label="Fechar sacola">
            <X size={20} strokeWidth={1.75} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="bag__empty">
            <ShoppingBag size={36} strokeWidth={1.25} />
            <p>Sua sacola está vazia.</p>
            <button type="button" className="btn btn--primary" onClick={onBrowse}>
              Ver coleção
            </button>
          </div>
        ) : (
          <>
            <ul className="bag__list">
              {items.map(({ id, qty, product }) => (
                <li key={id} className="bag__item">
                  <img src={product.image} alt="" width="900" height="1125" />
                  <div className="bag__item-info">
                    <p className="bag__item-name">{product.name}</p>
                    <p className="bag__item-price">{formatPrice(product.price * qty)}</p>
                    <div className="bag__item-actions">
                      <div className="bag__qty" role="group" aria-label={`Quantidade de ${product.name}`}>
                        <button type="button" onClick={() => setQty(id, qty - 1)} aria-label="Diminuir quantidade">
                          <Minus size={14} strokeWidth={2} />
                        </button>
                        <span aria-live="polite">{qty}</span>
                        <button type="button" onClick={() => setQty(id, qty + 1)} aria-label="Aumentar quantidade">
                          <Plus size={14} strokeWidth={2} />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="bag__remove"
                        onClick={() => setQty(id, 0)}
                        aria-label={`Remover ${product.name} da sacola`}
                      >
                        <Trash2 size={16} strokeWidth={1.75} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="bag__footer">
              <div className="bag__total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <p className="bag__installments">ou {formatInstallment(total)} sem juros</p>
              <a
                className="btn btn--primary btn--block"
                href={bagWhatsappLink(items, total)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon id="whatsapp" />
                Enviar pedido pelo WhatsApp
              </a>
              <p className="bag__note">O pedido chega com todas as peças e o total já calculado.</p>
            </footer>
          </>
        )}
      </div>
    </dialog>
  )
}
