import { useCallback, useState } from 'react'
import Intro from './components/Intro'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductCarousel from './components/ProductCarousel'
import Marquee from './components/Marquee'
import Categories from './components/Categories'
import Catalog from './components/Catalog'
import FeaturedCollection from './components/FeaturedCollection'
import About from './components/About'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProductDialog from './components/ProductDialog'
import BackToTop from './components/BackToTop'
import BagDrawer from './components/BagDrawer'
import { useBag } from './hooks/useBag'

export default function App() {
  const [filter, setFilter] = useState('todos')
  const [activeProduct, setActiveProduct] = useState(null)
  const bag = useBag()
  const [bagOpen, setBagOpen] = useState(false)
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return sessionStorage.getItem('lume-intro-vista') !== '1'
    } catch {
      return true
    }
  })

  const enterSite = useCallback(() => {
    try {
      sessionStorage.setItem('lume-intro-vista', '1')
    } catch {}
    setShowIntro(false)
  }, [])

  const selectFilter = useCallback((id) => {
    setFilter(id)
    document.getElementById('colecao')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const addToBag = useCallback(
    (product) => {
      bag.add(product.id)
      setActiveProduct(null)
      setBagOpen(true)
    },
    [bag.add]
  )

  const browseCollection = useCallback(() => {
    setBagOpen(false)
    document.getElementById('colecao')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <>
      {showIntro && <Intro onEnter={enterSite} />}
      <div className="site" inert={showIntro}>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Header bagCount={bag.count} onOpenBag={() => setBagOpen(true)} />
        <main id="conteudo">
          <Hero onSelectFilter={selectFilter} />
          <Marquee />
          <ProductCarousel onOpenProduct={setActiveProduct} />
          <Categories onSelect={selectFilter} />
          <Catalog filter={filter} onFilterChange={setFilter} onOpenProduct={setActiveProduct} />
          <FeaturedCollection onOpenProduct={setActiveProduct} />
          <About />
          <Contact />
          <Faq />
        </main>
        <Footer />
        <BackToTop />
        <ProductDialog product={activeProduct} onClose={() => setActiveProduct(null)} onAddToBag={addToBag} />
        <BagDrawer bag={bag} open={bagOpen} onClose={() => setBagOpen(false)} onBrowse={browseCollection} />
      </div>
    </>
  )
}
