'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WorkCard from './WorkCard'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    number: '01',
    name: 'Ember Studio',
    tags: ['Web Design', 'Development'],
    accent: '#FF3B1F',
    mockupId: 'ember',
  },
  {
    number: '02',
    name: 'Nova Finance',
    tags: ['Design System', 'Web App'],
    accent: '#1B28FF',
    mockupId: 'nova',
  },
  {
    number: '03',
    name: 'Orbit Labs',
    tags: ['Brand', 'Web Design'],
    accent: '#D4FF38',
    mockupId: 'orbit',
  },
  {
    number: '04',
    name: 'Verso Magazine',
    tags: ['Editorial', 'Development'],
    accent: '#FF3B1F',
    mockupId: 'verso',
  },
  {
    number: '05',
    name: 'Meridian Co.',
    tags: ['Identity', 'Web Design'],
    accent: '#1B28FF',
    mockupId: 'meridian',
  },
  {
    number: '06',
    name: 'Solace Wellness',
    tags: ['Brand', 'Web Design'],
    accent: '#D4FF38',
    mockupId: 'solace',
  },
]

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return

    const getDistance = () => track.scrollWidth - window.innerWidth

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 70%' },
        }
      )

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${getDistance()}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate(self) {
          gsap.set(track, { x: -(self.progress * getDistance()) })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-section="work"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Fixed heading — stays in place as track scrolls */}
      <div
        ref={headingRef}
        className="absolute z-10 pointer-events-none left-5 sm:left-8 md:left-10 lg:left-14"
        style={{ top: 80, opacity: 0 }}
      >
        <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-paper/30 block mb-4">
          Work
        </span>
        <h2
          className="font-display font-medium text-paper tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: 'clamp(30px, 3.8vw, 62px)' }}
        >
          Selected work.
        </h2>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        data-track="work"
        className="absolute top-0 left-0 h-full flex items-start pt-[140px] pb-6 px-5 gap-4 sm:pt-[160px] sm:px-8 md:pt-[180px] md:px-10 md:gap-5 lg:pt-[200px] lg:px-14 lg:gap-6"
        style={{
          willChange: 'transform',
        }}
      >
        {PROJECTS.map((project) => (
          <WorkCard key={project.number} {...project} />
        ))}
      </div>
    </section>
  )
}
