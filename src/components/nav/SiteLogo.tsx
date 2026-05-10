'use client'

import { useLoaderContext } from '@/lib/context/loader-context'
import { useMenuContext } from '@/lib/context/menu-context'

export default function SiteLogo() {
  const { loaderComplete } = useLoaderContext()
  const { menuOpen, setMenuOpen } = useMenuContext()

  if (!loaderComplete) return null

  const handleClick = () => {
    if (menuOpen) {
      setMenuOpen(false)
    }
    if (window.location.pathname !== '/') {
      window.location.href = '/'
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <button
      onClick={handleClick}
      className="fixed z-[250] font-display font-medium text-paper bg-transparent border-none p-0 cursor-pointer"
      style={{ top: 24, left: 24, fontSize: 18 }}
    >
      Studio 71<span className="font-mono" style={{ fontSize: '55%', verticalAlign: '0.05em' }}>px</span>
      <span className="font-mono text-pixel-red" style={{ fontSize: '55%', verticalAlign: '0.05em' }}>.</span>
    </button>
  )
}
