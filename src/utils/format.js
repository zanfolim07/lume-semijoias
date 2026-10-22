const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export const formatPrice = (value) => brl.format(value).replace(/\u00a0/g, ' ')

const INSTALLMENTS = 3
export const formatInstallment = (value) =>
  `${INSTALLMENTS}x de ${formatPrice(Math.ceil((value / INSTALLMENTS) * 100) / 100)}`
