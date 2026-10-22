import { siFacebook, siInstagram, siTiktok, siWhatsapp } from 'simple-icons'

const icons = {
  whatsapp: siWhatsapp,
  instagram: siInstagram,
  facebook: siFacebook,
  tiktok: siTiktok,
}

export default function SocialIcon({ id, size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d={icons[id].path} />
    </svg>
  )
}
