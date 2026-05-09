'use client'

import { useLoaderContext } from '@/lib/context/loader-context'

export default function SiteLogo() {
  const { loaderComplete } = useLoaderContext()

  if (!loaderComplete) return null

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed z-[250] font-display font-medium text-paper bg-transparent border-none p-0"
      style={{ top: 24, left: 24, fontSize: 18 }}
    >
      Studio 71<span className="font-mono" style={{ fontSize: '55%', verticalAlign: '0.05em' }}>px</span>
      <span className="font-mono text-pixel-red" style={{ fontSize: '55%', verticalAlign: '0.05em' }}>.</span>
    </button>
  )
}
