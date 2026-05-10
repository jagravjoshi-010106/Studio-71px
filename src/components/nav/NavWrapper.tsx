'use client'

import { useLoaderContext } from '@/lib/context/loader-context'
import { useMenuContext } from '@/lib/context/menu-context'
import HamburgerButton from './HamburgerButton'
import MenuOverlay from './MenuOverlay'

export default function NavWrapper() {
  const { loaderComplete } = useLoaderContext()
  const { menuOpen, setMenuOpen } = useMenuContext()

  if (!loaderComplete) return null

  return (
    <>
      <HamburgerButton open={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
