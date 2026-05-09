'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProcessCard from './ProcessCard'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    number: '01',
    title: 'Discovery',
    description: "A focused call where we learn your business, your goals, and the people you're trying to reach. We ask the questions your last agency didn't.",
    color: '#FF3B1F',
    dark: false,
  },
  {
    number: '02',
    title: 'Design',
    description: 'One strong concept, not three options. Every layout decision earns its place before we show you anything.',
    color: '#1B28FF',
    dark: false,
  },
  {
    number: '03',
    title: 'Build',
    description: 'The design goes into production. Fast, clean code. No shortcuts, no templates, no excuses.',
    color: '#D4FF38',
    dark: true,
  },
  {
    number: '04',
    title: 'Refine',
    description: 'Two rounds of structured revisions. Every note addressed, nothing left half-done.',
    color: '#FF3B1F',
    dark: false,
  },
  {
    number: '05',
    title: 'Launch',
    description: 'We handle the handoff. Your site goes live tested, optimized, and ready to perform.',
    color: '#1B28FF',
    dark: false,
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Heading slides up as section enters view
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 70%' },
        }
      )

      // First card fades + rises just before pin
      gsap.fromTo(
        cardRefs.current[0],
        { opacity: 0, y: 32, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 60%' },
        }
      )

      // Pin section — each card occupies one viewport-height of scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${window.innerHeight * (CARDS.length - 1)}`,
          pin: true,
          pinSpacing: true,
          scrub: true,
        },
      })

      // Cards 2–5 slide up from below with a scale-in — feels like being dealt from a deck
      cardRefs.current.slice(1).forEach((card, i) => {
        if (!card) return
        tl.fromTo(
          card,
          { yPercent: 105, scale: 0.94, transformOrigin: 'center bottom' },
          { yPercent: 0, scale: 1, ease: 'none', duration: 1 },
          i
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-section="process"
      className="relative w-full h-screen"
    >
      {/*
        Absolutely positioned column — gives pixel-precise control over top/bottom/right,
        so content never clips into the hamburger (top-7 right-10 z-300 = clears at ~59px)
        or out the bottom of the viewport.
      */}
      <div
        className="absolute z-10 flex flex-col"
        style={{ top: 100, bottom: 44, right: 44, width: '60vw' }}
      >
        {/* Heading — left-aligned so it anchors at the column's left edge (≈ center of page) */}
        <div
          ref={headingRef}
          className="shrink-0 mb-7"
          style={{ opacity: 0 }}
        >
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-paper/30 block mb-4">
            Process
          </span>
          <h2
            className="font-display font-medium text-paper tracking-[-0.03em] leading-[1.05] mb-3"
            style={{ fontSize: 'clamp(30px, 3.8vw, 62px)' }}
          >
            Our Process.
          </h2>
          <p
            className="font-body text-paper/50 text-[14px] leading-[1.7]"
            style={{ maxWidth: '36ch' }}
          >
            Five steps. No ambiguity, no back-and-forth, no surprises.
          </p>
        </div>

        {/* Cards — flex-1 + min-h-0 fills all remaining height without overflow */}
        <div className="relative flex-1 min-h-0">
          {CARDS.map((card, i) => (
            <ProcessCard
              key={card.number}
              ref={(el) => { cardRefs.current[i] = el }}
              number={card.number}
              title={card.title}
              description={card.description}
              accentColor={card.color}
              dark={card.dark}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
