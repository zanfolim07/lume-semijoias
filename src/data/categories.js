export const categories = [
  { id: 'brincos', label: 'Brincos', image: '/images/editorial/cat-brincos.webp', alt: 'Brincos dourados sobre livro aberto, ao lado de espelho e flores secas' },
  { id: 'colares', label: 'Colares', image: '/images/editorial/cat-colares.webp', alt: 'Mulher usando colares dourados finos em camadas' },
  { id: 'pulseiras', label: 'Pulseiras', image: '/images/editorial/hero-detalhe.webp', alt: 'Mãos femininas com pulseira dourada fina e anéis' },
  { id: 'aneis', label: 'Anéis', image: '/images/editorial/colecao-maos.webp', alt: 'Mulher de blusa preta com anéis dourados nas mãos' },
  { id: 'conjuntos', label: 'Conjuntos', image: '/images/editorial/cat-conjuntos.webp', alt: 'Conjunto de colar e brincos dourados sobre superfície preta' },
]

export const filters = [
  { id: 'todos', label: 'Todos' },
  { id: 'destaques', label: 'Destaques' },
  ...categories.map(({ id, label }) => ({ id, label })),
]
