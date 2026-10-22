const WHATSAPP_NUMBER_PLACEHOLDER = ''

export const developer = {
  name: '',
  whatsapp: '',
  url: '',
}

export const site = {
  name: 'Lume Semijoias',
  whatsappNumber: (
    import.meta.env.VITE_WHATSAPP_NUMBER ||
    WHATSAPP_NUMBER_PLACEHOLDER ||
    developer.whatsapp
  ).replace(/\D/g, ''),
  social: [
    { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/' },
    { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/' },
    { id: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/' },
  ],
  nav: [
    { label: 'Início', href: '#inicio' },
    { label: 'Coleção', href: '#colecao' },
    { label: 'Categorias', href: '#categorias' },
    { label: 'Sobre a Lume', href: '#sobre' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contato', href: '#contato' },
  ],
}
