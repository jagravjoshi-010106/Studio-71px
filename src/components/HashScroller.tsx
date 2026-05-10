'use client'

import { useEffect } from 'react'

export default function HashScroller() {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash) return

    const timer = setTimeout(() => {
      const el = document.querySelector(`[data-section="${hash}"]`)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return null
}
