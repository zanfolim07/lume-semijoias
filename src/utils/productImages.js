export const productImages = (product) => [
  { src: product.image, alt: product.alt, focus: product.focus },
  ...(product.gallery ?? []),
]
