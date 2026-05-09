'use client'

import { useRef } from 'react'
import gsap from 'gsap'

interface Props {
  open: boolean
  onToggle: () => void
}

export default function HamburgerButton({ open, onToggle }: Props) {
  const l1 = useRef<HTMLSpanElement>(null)
  const l2 = useRef<HTMLSpanElement>(null)
  const l3 = useRef<HTMLSpanElement>(null)

  const handleClick = () => {
    onToggle()
    if (!open) {
      gsap.to(l1.current, { rotate: 45,  y: 6.5, duration: 0.35, ease: 'power3.inOut' })
      gsap.to(l2.current, { opacity: 0,           duration: 0.2  })
      gsap.to(l3.current, { rotate: -45, y: -6.5, duration: 0.35, ease: 'power3.inOut' })
    } else {
      gsap.to(l1.current, { rotate: 0, y: 0, duration: 0.35, ease: 'power3.inOut' })
      gsap.to(l2.current, { opacity: 1,           duration: 0.3  })
      gsap.to(l3.current, { rotate: 0, y: 0, duration: 0.35, ease: 'power3.inOut' })
    }
  }

  const lineColor = open ? 'bg-ink' : 'bg-paper'

  return (
    <button
      onClick={handleClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      className="fixed top-7 right-10 z-[300] flex flex-col justify-center gap-[5px] p-2"
    >
      <span ref={l1} className={`block h-[1.5px] w-6 ${lineColor} transition-colors duration-300`} />
      <span ref={l2} className={`block h-[1.5px] w-6 ${lineColor} transition-colors duration-300`} />
      <span ref={l3} className={`block h-[1.5px] w-6 ${lineColor} transition-colors duration-300`} />
    </button>
  )
}
