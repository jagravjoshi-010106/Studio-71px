'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const LINES = ['We make websites', 'that refuse to', 'be ignored.']

export default function HeroHeadline({ animate }: { animate: boolean }) {
  const linesRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (!animate) return

    gsap.fromTo(
      linesRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.14,
        delay: 0.1,
      }
    )
  }, [animate])

  return (
    <h1
      className="font-display font-medium text-paper leading-[1.0] tracking-[-0.04em] overflow-hidden"
      style={{ fontSize: 'clamp(56px, 8.5vw, 136px)' }}
    >
      {LINES.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <span
            ref={(el) => { linesRef.current[i] = el }}
            className="block"
            style={{ opacity: 0 }}
          >
            {line}
          </span>
        </span>
      ))}
    </h1>
  )
}
