'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useMenuContext } from '@/lib/context/menu-context'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const { menuOpen } = useMenuContext()

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 })

    // Dot follows instantly, ring lags behind for depth
    const dotX  = gsap.quickTo(dot,  'x', { duration: 0.12, ease: 'power3' })
    const dotY  = gsap.quickTo(dot,  'y', { duration: 0.12, ease: 'power3' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' })

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);  dotY(e.clientY)
      ringX(e.clientX); ringY(e.clientY)
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element
      if (t.closest('[data-cursor="square"]')) {
        // Square mode: dot hides, ring becomes a small square
        gsap.to(dot,  { scale: 0, duration: 0.2, ease: 'power2.out' })
        gsap.to(ring, { scale: 0.72, borderRadius: 3, borderWidth: 1.5, duration: 0.25, ease: 'power2.out' })
      } else if (t.closest('a, button, [data-cursor]')) {
        gsap.to(dot,  { scale: 0, duration: 0.25, ease: 'power2.out' })
        gsap.to(ring, { scale: 1.6, borderRadius: '50%', borderWidth: 1.5, duration: 0.3, ease: 'power2.out' })
      } else {
        gsap.to(dot,  { scale: 1, duration: 0.25, ease: 'power2.out' })
        gsap.to(ring, { scale: 1, borderRadius: '50%', borderWidth: 1, duration: 0.3, ease: 'power2.out' })
      }
    }

    const onLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 })

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  // No color switching needed — mix-blend-mode: difference handles both ink and paper
  void menuOpen

  return (
    <>
      {/* Solid dot — snappy, precise */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          width: 8,
          height: 8,
          backgroundColor: '#ffffff',
          mixBlendMode: 'difference',
          zIndex: 9999,
        }}
      />

      {/* Ring — lags, adds depth */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          width: 36,
          height: 36,
          border: '1px solid #ffffff',
          mixBlendMode: 'difference',
          zIndex: 9999,
        }}
      />
    </>
  )
}
