'use client'

import { useRef } from 'react'
import gsap from 'gsap'

interface Props {
  number: string
  name: string
  descriptor: string
}

export default function ServiceRow({ number, name, descriptor }: Props) {
  const rowRef   = useRef<HTMLDivElement>(null)
  const descRef  = useRef<HTMLParagraphElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)
  const numRef   = useRef<HTMLSpanElement>(null)

  const onEnter = () => {
    gsap.to(rowRef.current,   { backgroundColor: '#FF3B1F', duration: 0.22, ease: 'power2.out', overwrite: 'auto' })
    gsap.to(descRef.current,  { height: 'auto', opacity: 1, paddingBottom: 24, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
    gsap.to(arrowRef.current, { x: 6, color: '#F2F0EC', duration: 0.25, ease: 'power2.out', overwrite: 'auto' })
    gsap.to(numRef.current,   { color: 'rgba(242,240,236,0.55)', duration: 0.18, overwrite: 'auto' })
  }

  const onLeave = () => {
    gsap.to(rowRef.current,   { backgroundColor: 'transparent', duration: 0.22, ease: 'power2.in', overwrite: 'auto' })
    gsap.to(descRef.current,  { height: 0, opacity: 0, paddingBottom: 0, duration: 0.22, ease: 'power2.in', overwrite: 'auto' })
    gsap.to(arrowRef.current, { x: 0, color: 'rgba(242,240,236,0.3)', duration: 0.22, ease: 'power2.in', overwrite: 'auto' })
    gsap.to(numRef.current,   { color: 'rgba(242,240,236,0.25)', duration: 0.18, overwrite: 'auto' })
  }

  return (
    <div
      ref={rowRef}
      data-row
      data-cursor="square"
      className="border-b border-paper/10"
      style={{ paddingLeft: 0, paddingRight: 0 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Main row */}
      <div
        className="grid items-center py-6 gap-4"
        style={{ gridTemplateColumns: '40px 1fr auto' }}
      >
        <span
          ref={numRef}
          className="font-mono text-[11px] tracking-[0.1em]"
          style={{ color: 'rgba(242,240,236,0.25)' }}
        >
          {number}
        </span>

        <span
          className="font-display font-medium tracking-[-0.02em] text-paper"
          style={{ fontSize: 'clamp(24px, 2.8vw, 44px)' }}
        >
          {name}
        </span>

        <span
          ref={arrowRef}
          className="font-mono text-lg"
          style={{ color: 'rgba(242,240,236,0.3)' }}
        >
          →
        </span>
      </div>

      {/* Descriptor — hidden, expands on hover */}
      <p
        ref={descRef}
        className="font-body text-paper/60 text-[14px] leading-[1.7] overflow-hidden"
        style={{ height: 0, opacity: 0, paddingBottom: 0, paddingLeft: 56 }}
      >
        {descriptor}
      </p>
    </div>
  )
}
