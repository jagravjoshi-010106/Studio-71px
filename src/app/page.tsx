import Hero from '@/components/hero/Hero'
import PersistentOrb from '@/components/hero/PersistentOrb'
import Services from '@/components/services/Services'
import Process from '@/components/process/Process'
import Work from '@/components/work/Work'
import About from '@/components/about/About'
import FAQ from '@/components/faq/FAQ'
import CTA from '@/components/cta/CTA'
import Footer from '@/components/footer/Footer'
import HashScroller from '@/components/HashScroller'

export default function Home() {
  return (
    <>
      <main style={{ backgroundColor: '#0E0E0E', position: 'relative', zIndex: 1 }}>
        <HashScroller />
        <PersistentOrb />
        <Hero />
        <Services />
        <Process />
        <Work />
        <About />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
