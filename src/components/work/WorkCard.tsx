'use client'

import { useRef } from 'react'
import gsap from 'gsap'

interface Props {
  number: string
  name: string
  tags: string[]
  video: string
}

export default function WorkCard({ number, name, tags, video }: Props) {
  const cardRef  = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)

  const onEnter = () => {
    gsap.to(cardRef.current,  { scale: 1.025, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
    gsap.to(arrowRef.current, { x: 5, opacity: 1, duration: 0.28, ease: 'power2.out', overwrite: 'auto' })
  }

  const onLeave = () => {
    gsap.to(cardRef.current,  { scale: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
    gsap.to(arrowRef.current, { x: 0, opacity: 0, duration: 0.22, ease: 'power2.in', overwrite: 'auto' })
  }

  return (
    <div
      ref={cardRef}
      className="relative shrink-0 flex flex-col cursor-pointer z-10"
      style={{
        width: 'clamp(280px, 26vw, 440px)',
        height: 'calc(100vh - 256px)',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Video */}
      <div className="relative flex-1 overflow-hidden" data-cursor="image">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={video}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Info strip */}
      <div
        className="shrink-0 flex items-end justify-between pt-5"
        style={{ borderTop: '1px solid rgba(242,240,236,0.08)' }}
      >
        <div>
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-paper/25 block mb-2">
            {number}
          </span>
          <h3
            className="font-display font-medium text-paper tracking-[-0.025em] leading-[1.1] mb-3"
            style={{ fontSize: 'clamp(18px, 1.6vw, 26px)' }}
          >
            {name}
          </h3>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] tracking-[0.12em] uppercase px-2 py-[5px]"
                style={{ color: '#F2F0EC', border: '1px solid rgba(242,240,236,0.2)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <span
          ref={arrowRef}
          className="font-mono text-base text-paper shrink-0 ml-4 mb-1"
          style={{ opacity: 0 }}
        >
          →
        </span>
      </div>
    </div>
  )
}
