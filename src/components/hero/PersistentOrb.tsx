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

  // Entrance — opacity only; keeping scale out of GSAP's hands entirely
  // so no scale state leaks into the scroll-driven triggers below.
  useEffect(() => {
    if (!loaderComplete || !wrapRef.current) return
    gsap.fromTo(
      wrapRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.4, ease: 'power3.out', delay: 0.1 }
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

      // Process: orb stays parked at left (-0.45vw), full size.
      // No trigger needed — gsap.set() values persist until the next active trigger.

      // Work: orb travels left → center tied to horizontal scroll progress.
      // onUpdate + gsap.set() pattern (same as the other triggers) — fires only
      // while the trigger is active so no from-state is ever captured or snapped.
      // onLeaveBack explicitly parks the orb back at left when scrolling past start.
      //
      // Start/end use Process geometry (not the Work element) to avoid mount-order
      // race: PersistentOrb's effects run before Process registers its pin spacer,
      // so Work's offsetTop is wrong at registration. Process.offsetTop is stable.
      const getWorkStart = () => {
        const proc = document.querySelector('[data-section="process"]') as HTMLElement | null
        if (!proc) return 999999
        return proc.offsetTop + proc.offsetHeight + window.innerHeight * 4
      }

      ScrollTrigger.create({
        start: getWorkStart,
        end: () => {
          const track = document.querySelector('[data-track="work"]') as HTMLElement | null
          return getWorkStart() + (track ? track.scrollWidth - window.innerWidth : 0)
        },
        invalidateOnRefresh: true,
        onUpdate(self) {
          gsap.set(el, { x: window.innerWidth * -0.45 * (1 - self.progress) })
        },
        onLeaveBack() {
          gsap.set(el, { x: window.innerWidth * -0.45 })
        },
        onLeave() {
          gsap.set(el, { x: 0 })
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
        // z-0: step 6 in CSS paint order — DOM order (orb is first) ensures
        // every section paints after it, whether pinned by GSAP or not.
        zIndex: 0,
      }}
    >
      <HeroOrb />
    </div>
  )
}
