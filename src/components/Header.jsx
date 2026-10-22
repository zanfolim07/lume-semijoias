import { useEffect, useState } from 'react'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { site } from '../config/site'
import { generalWhatsappLink } from '../utils/whatsapp'
import Logo from './Logo'
import './Header.css'

export default function Header({ bagCount, onOpenBag }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <p className="announcement">
        <span>Atendimento personalizado</span>
        <span aria-hidden="true">✦</span>
        <span>Escolha sua peça e finalize pelo WhatsApp</span>
      </p>

      <header className={`header ${scrolled ? 'header--scrolled' : ''} ${open ? 'header--open' : ''}`}>
        <div className="header__inner container">
          <a href="#inicio" className="header__logo" aria-label="Lume Semijoias, voltar ao início" onClick={close}>
            <Logo />
          </a>

          <nav className="header__nav" aria-label="Navegação principal">
            <ul>
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__end">
            <a className="header__cta btn btn--primary btn--sm" href={generalWhatsappLink()} target="_blank" rel="noopener noreferrer">
              Fale conosco
            </a>

            <button
              type="button"
              className="header__bag"
              onClick={() => {
                close()
                onOpenBag()
              }}
              aria-label={bagCount ? `Abrir sacola, ${bagCount} ${bagCount === 1 ? 'peça' : 'peças'}` : 'Abrir sacola'}
            >
              <ShoppingBag size={20} strokeWidth={1.75} />
              {bagCount > 0 && (
                <span key={bagCount} className="header__bag-count" aria-hidden="true">
                  {bagCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="header__toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
            </button>
          </div>
        </div>

        <div id="mobile-menu" className="mobile-menu" hidden={!open}>
          <nav aria-label="Navegação principal (celular)">
            <ul>
              {site.nav.map((item, i) => (
                <li key={item.href} style={{ '--i': i }}>
                  <a href={item.href} onClick={close}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="btn btn--primary btn--block" href={generalWhatsappLink()} target="_blank" rel="noopener noreferrer">
            Fale conosco
          </a>
        </div>
      </header>
    </>
  )
}
