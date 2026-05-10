'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useMenuContext } from '@/lib/context/menu-context'

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const { menuOpen } = useMenuContext()

  useEffect(() => {
    const ring = ringRef.current
    if (!ring) return

    gsap.set(ring, { xPercent: -50, yPercent: -50, opacity: 0 })

    const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3' })

    const mouse = { x: -1, y: -1 }

    const applyStyle = (t: Element) => {
      if (t.closest('[data-cursor="image"]')) {
        ring.style.mixBlendMode = 'normal'
        gsap.to(ring, {
          scale: 0.72,
          borderRadius: 3,
          backgroundColor: '#FF3B1F',
          duration: 0.25,
          ease: 'power2.out',
        })
      } else if (t.closest('a, button, [data-cursor="square"], [data-section="cta"]')) {
        ring.style.mixBlendMode = 'difference'
        gsap.to(ring, {
          scale: 2.2,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          duration: 0.3,
          ease: 'power2.out',
        })
      } else {
        ring.style.mixBlendMode = 'difference'
        gsap.to(ring, {
          scale: 1,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX; mouse.y = e.clientY
      ringX(e.clientX); ringY(e.clientY)
      gsap.to(ring, { opacity: 1, duration: 0.3 })
    }

    const onOver = (e: MouseEvent) => {
      applyStyle(e.target as Element)
    }

    const onScroll = () => {
      if (mouse.x < 0) return
      const el = document.elementFromPoint(mouse.x, mouse.y)
      if (el) applyStyle(el)
    }

    const onLeave = () => gsap.to(ring, { opacity: 0, duration: 0.3 })

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('scroll', onScroll)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  void menuOpen

  return (
    <div
      ref={ringRef}
      className="fixed top-0 left-0 pointer-events-none rounded-full"
      style={{
        width: 36,
        height: 36,
        backgroundColor: '#ffffff',
        mixBlendMode: 'difference',
        zIndex: 9999,
      }}
    />
  )
}
