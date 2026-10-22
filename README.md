<div align="center">

<img src="public/og-image.jpg" alt="Lume Semijoias — colar de elos dourados sobre blusa preta" width="100%" />

# lume<span>.</span> semijoias

**Catálogo digital para uma marca de semijoias, com vitrine editorial, sacola de pedido e checkout pelo WhatsApp.**

![React](https://img.shields.io/badge/React_19-20232a?style=flat-square&logo=react&logoColor=61dafb)
![Vite](https://img.shields.io/badge/Vite_8-1a1a1a?style=flat-square&logo=vite&logoColor=ffd62e)
![CSS](https://img.shields.io/badge/CSS_puro-1a1a1a?style=flat-square&logo=css&logoColor=ffffff)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## Sobre o projeto

A **Lume** é uma marca fictícia de semijoias, criada para mostrar como uma loja pequena pode ter um site com cara de marca grande, **sem plataforma de e-commerce nem mensalidade**. A cliente navega pelo catálogo, monta a sacola e envia o pedido pronto pelo WhatsApp, que é onde a venda realmente acontece.

> Projeto para estudos, com marca fictícia. Fotos provisórias do [Unsplash](https://unsplash.com); produtos e preços são de exemplo.

## Destaques

| Recurso | O que faz |
| --- | --- |
| ✦ **Abertura em tela cheia** | Nome da marca surgindo letra a letra e saída suave para o catálogo |
| ✦ **Sacola de pedido** | Várias peças, quantidades e total; vira uma única mensagem no WhatsApp e fica salva no navegador |
| ✦ **Catálogo com filtros** | Categoria, coleção e ordenação, com contagem de peças |
| ✦ **Página da peça** | Galeria com miniaturas, deslizar no celular e lupa que acompanha o mouse |
| ✦ **Gatilhos de venda** | Selos *Novo*, *Mais vendido* e *Últimas unidades*, e parcelamento em 3x junto ao preço |
| ✦ **Mensagens prontas** | Cada botão abre o WhatsApp com o assunto já escrito (compra, dúvida, presente, envio) |
| ✦ **Movimento com propósito** | Parallax no banner, entradas ao rolar e segunda foto ao passar o mouse; tudo desliga com *reduzir movimento* |
| ✦ **Pronto para compartilhar** | Prévia com foto e descrição ao mandar o link no WhatsApp e nas redes |

## Feito com cuidado

- **Celular primeiro:** menu em tela cheia, sacola e detalhes da peça que sobem de baixo, áreas de toque de 44px.
- **Acessível:** navegação por teclado, foco visível, `dialog` nativo, textos alternativos e link para pular ao conteúdo.
- **Leve:** só React e ícones; sem framework de CSS. Fotos em WebP com versões para celular e carregamento sob demanda.

## Tecnologias

- [React 19](https://react.dev) + [Vite 8](https://vite.dev)
- CSS puro com variáveis (`src/styles/global.css`)
- [Lucide](https://lucide.dev) e [Simple Icons](https://simpleicons.org) para ícones
- Fonte [Poppins](https://fonts.google.com/specimen/Poppins) servida localmente via Fontsource

## Rodando localmente

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # gera a pasta dist/
npm run preview   # serve o build localmente
```

## Personalizando

Tudo o que muda de uma loja para outra fica em poucos arquivos:

| O quê | Onde |
| --- | --- |
| WhatsApp da loja, redes sociais e menu | `src/config/site.js` (ou `VITE_WHATSAPP_NUMBER`, veja `.env.example`) |
| Crédito "Site desenvolvido por" no rodapé | `developer` em `src/config/site.js` |
| Produtos: nome, preço, fotos, selo, coleção | `src/data/products.js` |
| Categorias e perguntas frequentes | `src/data/categories.js` e `src/data/faq.js` |
| Textos das mensagens do WhatsApp | `src/utils/whatsapp.js` |
| Número de parcelas | `src/utils/format.js` |
| Cores, cantos e espaçamentos | `:root` em `src/styles/global.css` |

**Fotos:** WebP com cerca de 900px de largura e proporção 4:5 para produtos. O campo `focus` ajusta o enquadramento (ex.: `'50% 30%'`), e `gallery` adiciona fotos extras à página da peça.

## Estrutura

```
src/
├── components/   seções da página (Intro, Hero, Catalog, ProductDialog, BagDrawer, Footer…)
├── config/       site.js: contato, redes e navegação
├── data/         produtos, categorias e FAQ
├── hooks/        useReveal (animações ao rolar) e useBag (sacola)
├── utils/        WhatsApp, formatação de preço e galeria
└── styles/       global.css: tokens, botões e utilitários
```
