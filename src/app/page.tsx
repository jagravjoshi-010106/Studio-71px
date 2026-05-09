import Hero from '@/components/hero/Hero'
import PersistentOrb from '@/components/hero/PersistentOrb'
import Services from '@/components/services/Services'
import Process from '@/components/process/Process'
import Work from '@/components/work/Work'

export default function Home() {
  return (
    <main>
      <PersistentOrb />
      <Hero />
      <Services />
      <Process />
      <Work />
    </main>
  )
}
