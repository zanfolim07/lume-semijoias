import { site } from '../config/site'
import { formatPrice } from './format'

export function whatsappLink(message) {
  const base = site.whatsappNumber ? `https://wa.me/${site.whatsappNumber}` : 'https://wa.me/'
  return `${base}?text=${encodeURIComponent(message)}`
}

const messages = {
  buy: (p) => `Olá, Lume! Tenho interesse na peça *${p.name}* (${formatPrice(p.price)}). Ainda está disponível?`,
  ask: (p) => `Olá, Lume! Gostaria de tirar uma dúvida sobre a peça *${p.name}* (${formatPrice(p.price)}).`,
}

export const productWhatsappLink = (product, intent = 'buy') => whatsappLink(messages[intent](product))

export const generalWhatsappLink = (
  message = 'Olá, Lume! Vim pelo catálogo e gostaria de mais informações.'
) => whatsappLink(message)

export function bagWhatsappLink(items, total) {
  const lines = items.map(
    ({ product, qty }) => `• ${qty}x *${product.name}* — ${formatPrice(product.price * qty)}`
  )
  return whatsappLink(
    ['Olá, Lume! Gostaria de fazer este pedido:', '', ...lines, '', `*Total: ${formatPrice(total)}*`].join('\n')
  )
}
