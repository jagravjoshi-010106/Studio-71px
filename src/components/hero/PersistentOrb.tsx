'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroOrb from './HeroOrb'
import { useLoaderContext } from '@/lib/context/loader-context'

gsap.registerPlugin(ScrollTrigger)

export default function PersistentOrb() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const { loaderComplete } = useLoaderContext()

  // GSAP owns all transforms — no CSS translate conflicts
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    gsap.set(el, { xPercent: -50, yPercent: -50 })
  }, [])

  // Entrance
  useEffect(() => {
    if (!loaderComplete || !wrapRef.current) return
    gsap.fromTo(
      wrapRef.current,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out', delay: 0.1 }
    )
  }, [loaderComplete])

  // Zig-zag scroll journey — triggers added here as sections are built:
  // Hero   → center   (xPercent: -50)
  // Sect 2 → right    (xPercent: ~-10, bleeds right edge)
  // Sect 3 → left     (xPercent: ~-85, bleeds left edge)
  // Sect 4 → center   (xPercent: -50)
  // …and so on
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    // Using ScrollTrigger.create() + onUpdate + gsap.set() instead of gsap.to() scrub tweens.
    //
    // Root cause of the previous glitch: two gsap.to() tweens on the same `x` property
    // each capture x=0 as their "from" state at mount. GSAP applies that from-state
    // whenever the trigger is outside its active range, so the process tween kept
    // snapping x back to 0 while the user was still in the services section.
    //
    // onUpdate only fires when the trigger is actively between start and end — no
    // from-state clobber, no competing tweens, no conflicts.
    const ctx = gsap.context(() => {
      // Hero → Services: x goes from 0 → +0.45vw (right sunset)
      ScrollTrigger.create({
        trigger: '[data-section="services"]',
        start: 'top bottom',
        end: 'top top',
        invalidateOnRefresh: true,
        onUpdate(self) {
          gsap.set(el, { x: self.progress * window.innerWidth * 0.45 })
        },
      })

      // Services → Process: x goes from +0.45vw → -0.45vw (right sunset → left sunset)
      ScrollTrigger.create({
        trigger: '[data-section="process"]',
        start: 'top bottom',
        end: 'top top',
        invalidateOnRefresh: true,
        onUpdate(self) {
          gsap.set(el, { x: window.innerWidth * (0.45 - 0.9 * self.progress) })
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={wrapRef}
      className="fixed pointer-events-none"
      style={{
        top: '50%',
        left: '50%',
        width: '135vmin',
        height: '135vmin',
        opacity: 0,
        // z-8: above section backgrounds (static flow, paint at z-auto)
        // but below text content (z-10) and UI chrome (z-200+)
        zIndex: 8,
      }}
    >
      <HeroOrb />
    </div>
  )
}
