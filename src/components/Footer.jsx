import { developer, site } from '../config/site'
import { generalWhatsappLink } from '../utils/whatsapp'
import Logo from './Logo'
import SocialIcon from './SocialIcon'
import './Footer.css'

const formatPhone = (digits) => {
  const m = digits.match(/^55(\d{2})(\d{4,5})(\d{4})$/)
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : `+${digits}`
}

export default function Footer() {
  const socials = site.social.filter((s) => s.url)
  const year = new Date().getFullYear()
  const developerLink =
    developer.url ||
    (developer.whatsapp &&
      `https://wa.me/${developer.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
        'Olá! Vi o site da Lume Semijoias e quero um site assim.'
      )}`)

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <a href="#inicio" aria-label="Lume Semijoias, voltar ao início">
            <Logo />
          </a>

          <nav aria-label="Links do rodapé">
            <ul className="footer__nav">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="footer__social" aria-label="Contato e redes sociais">
            <li>
              <a
                href={generalWhatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp${site.whatsappNumber ? ` ${formatPhone(site.whatsappNumber)}` : ''}`}
                title="WhatsApp"
              >
                <SocialIcon id="whatsapp" />
              </a>
            </li>
            {socials.map((s) => (
              <li key={s.id}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
                  <SocialIcon id={s.id} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__bottom">
          <p>© {year} {site.name}. Todos os direitos reservados.</p>
          {developer.name && (
            <p className="footer__credit">
              Site desenvolvido por{' '}
              <a href={developerLink} target="_blank" rel="noopener noreferrer">
                {developer.name}
              </a>
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
