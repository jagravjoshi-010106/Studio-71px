'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FAQS = [
  {
    question: 'How does a project work?',
    answer: 'Five steps. Brief, design, build, refine, launch. No ambiguity, no back-and-forth. We wrote it out on the process page because we mean it.',
  },
  {
    question: 'How long does a project take?',
    answer: 'Two weeks, give or take. Some projects need more, most do not. You get a timeline on day one.',
  },
  {
    question: 'What does it cost?',
    answer: 'Depends on the work. We scope every project individually. No packages, no tiers, no "starting at" pricing. Tell us what you need and we will give you a number.',
  },
  {
    question: 'Do you do brand identity?',
    answer: 'Yes. Brand identity, visual systems, the whole thing. If you need the foundation before the website, we handle that too.',
  },
  {
    question: 'Can I update the site myself?',
    answer: 'If you need a CMS, we will build one in. If you do not, we will not sell you one.',
  },
  {
    question: 'Who actually does the work?',
    answer: 'Us. Two people. No outsourcing, no white-labeling, no junior handed your project after the pitch.',
  },
  {
    question: 'Do you work with clients outside India?',
    answer: 'Yes. Most of our communication is async. Time zones have not been a problem yet.',
  },
]

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(prev => (prev === i ? null : i))
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          once: true,
        },
      })

      tl.fromTo(labelRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
      .fromTo(headlineRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
        0.15
      )
      .fromTo(listRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        0.4
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-section="faq"
      className="relative w-full py-20 md:py-[140px]"
    >
      <div
        className="relative z-10 ml-0 md:ml-auto px-5 sm:px-8 md:px-10 lg:px-14 max-w-full md:max-w-[66vw]"
      >
        <span
          ref={labelRef}
          className="font-mono text-[11px] tracking-[0.14em] uppercase block mb-5"
          style={{ color: 'rgba(242,240,236,0.4)' }}
        >
          FAQ
        </span>

        <h2
          ref={headlineRef}
          className="font-display font-medium text-paper tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: 'clamp(32px, 4vw, 64px)', marginBottom: 64 }}
        >
          Questions we get asked.
        </h2>

        <div ref={listRef}>
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                style={{
                  borderTop: '1px solid rgba(242,240,236,0.12)',
                  backgroundColor: isOpen ? '#FF3B1F' : 'transparent',
                  transition: 'background-color 0.35s ease',
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between text-left cursor-pointer"
                  style={{ padding: '28px 24px' }}
                >
                  <span
                    className="font-display font-medium text-paper tracking-[-0.02em] leading-[1.2]"
                    style={{ fontSize: 'clamp(18px, 2vw, 28px)' }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="font-display text-paper shrink-0 ml-8"
                    style={{
                      fontSize: 24,
                      transition: 'transform 0.3s ease',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    overflow: 'hidden',
                    maxHeight: isOpen ? 300 : 0,
                    opacity: isOpen ? 1 : 0,
                    transition: 'max-height 0.4s ease, opacity 0.3s ease',
                    paddingBottom: isOpen ? 28 : 0,
                    paddingLeft: 24,
                    paddingRight: 24,
                  }}
                >
                  <p
                    className="font-body text-[14px] leading-[1.8]"
                    style={{ color: 'rgba(242,240,236,0.65)', maxWidth: '56ch' }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
          {/* Bottom border */}
          <div style={{ borderTop: '1px solid rgba(242,240,236,0.12)' }} />
        </div>
      </div>
    </section>
  )
}
