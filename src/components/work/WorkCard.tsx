'use client'

import { useRef } from 'react'
import gsap from 'gsap'

interface Props {
  number: string
  name: string
  tags: string[]
  accent: string
  mockupId: string
}

function Mockup({ id }: { id: string }) {
  switch (id) {
    case 'ember':
      return (
        <div className="absolute inset-0" style={{ background: 'linear-gradient(140deg, #FF3B1F 0%, #1a0500 100%)' }}>
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(242,240,236,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(242,240,236,0.05) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
          <div className="absolute" style={{ width: '55%', aspectRatio: '1', borderRadius: '50%', border: '1px solid rgba(242,240,236,0.12)', top: '18%', left: '50%', transform: 'translateX(-50%)' }} />
          <div className="absolute" style={{ width: '30%', aspectRatio: '1', borderRadius: '50%', background: 'rgba(255,59,31,0.45)', filter: 'blur(32px)', top: '28%', left: '50%', transform: 'translateX(-50%)' }} />
        </div>
      )
    case 'nova':
      return (
        <div className="absolute inset-0" style={{ background: 'linear-gradient(155deg, #1B28FF 0%, #030818 100%)' }}>
          <div className="absolute inset-0 flex flex-col justify-evenly px-8" style={{ opacity: 0.12 }}>
            {Array.from({ length: 9 }).map((_, i) => <div key={i} className="h-px bg-paper" />)}
          </div>
          <div className="absolute" style={{ top: 28, right: 28, width: 44, height: 44, borderTop: '1.5px solid rgba(242,240,236,0.35)', borderRight: '1.5px solid rgba(242,240,236,0.35)' }} />
          <div className="absolute" style={{ bottom: 28, left: 28, width: 44, height: 44, borderBottom: '1.5px solid rgba(242,240,236,0.35)', borderLeft: '1.5px solid rgba(242,240,236,0.35)' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div style={{ width: '40%', aspectRatio: '1', border: '1px solid rgba(27,40,255,0.6)', borderRadius: '50%', background: 'rgba(27,40,255,0.15)' }} />
          </div>
        </div>
      )
    case 'orbit':
      return (
        <div className="absolute inset-0" style={{ background: '#0A0A0A' }}>
          {[1.0, 0.72, 0.48].map((scale, i) => (
            <div key={i} className="absolute" style={{ width: `${scale * 90}%`, aspectRatio: '1', borderRadius: '50%', border: `1px solid rgba(212,255,56,${0.18 - i * 0.04})`, top: '50%', left: '50%', transform: 'translate(-50%, -54%)' }} />
          ))}
          <div className="absolute" style={{ width: '32%', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,255,56,0.9) 0%, rgba(212,255,56,0.2) 55%, transparent 80%)', top: '50%', left: '50%', transform: 'translate(-50%, -54%)' }} />
        </div>
      )
    case 'verso':
      return (
        <div className="absolute inset-0" style={{ background: '#F2F0EC' }}>
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <span className="font-display font-medium select-none" style={{ fontSize: 'clamp(90px, 16vw, 180px)', color: 'rgba(14,14,14,0.05)', letterSpacing: '-0.04em', lineHeight: 1 }}>
              VS.
            </span>
          </div>
          <div className="absolute top-8 left-8 right-8 flex flex-col gap-3" style={{ opacity: 0.18 }}>
            <div className="h-px bg-ink" />
            <div className="h-px bg-ink" style={{ marginRight: '30%' }} />
            <div className="h-px bg-ink" style={{ marginRight: '55%' }} />
          </div>
          <div className="absolute bottom-0 left-0 right-0" style={{ height: 5, background: '#FF3B1F' }} />
        </div>
      )
    case 'meridian':
      return (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#FF3B1F', clipPath: 'polygon(0 0, 58% 0, 42% 100%, 0 100%)' }} />
          <div className="absolute inset-0" style={{ background: '#1B28FF', clipPath: 'polygon(58% 0, 100% 0, 100% 100%, 42% 100%)' }} />
          <div className="absolute top-0 bottom-0" style={{ left: '50%', width: 1.5, background: 'rgba(242,240,236,0.2)', transform: 'translateX(-50%)' }} />
          <div className="absolute" style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(242,240,236,0.08)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        </div>
      )
    case 'solace':
      return (
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #161616 0%, #0E0E0E 100%)' }}>
          {[1.1, 0.85, 0.62, 0.42].map((scale, i) => (
            <div key={i} className="absolute" style={{ width: `${scale * 100}%`, aspectRatio: '1', borderRadius: '50%', border: `1px solid rgba(212,255,56,${0.13 - i * 0.025})`, bottom: '-30%', left: '50%', transform: 'translateX(-50%)' }} />
          ))}
          <div className="absolute" style={{ width: '18%', aspectRatio: '1', borderRadius: '50%', background: 'rgba(212,255,56,0.7)', filter: 'blur(18px)', bottom: '8%', left: '50%', transform: 'translateX(-50%)' }} />
        </div>
      )
    default:
      return <div className="absolute inset-0 bg-ink" />
  }
}

export default function WorkCard({ number, name, tags, accent, mockupId }: Props) {
  const cardRef  = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)
  const infoRef  = useRef<HTMLDivElement>(null)

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
      {/* Mockup */}
      <div className="relative flex-1 overflow-hidden">
        <Mockup id={mockupId} />
      </div>

      {/* Info strip */}
      <div
        ref={infoRef}
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
                style={{ color: accent, border: `1px solid ${accent}35` }}
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
