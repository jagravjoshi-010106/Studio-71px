'use client'

import { forwardRef } from 'react'
import Image from 'next/image'

interface Props {
  number: string
  name: string
  role: string
  bio: string
  image: string
}

const AboutFounderCard = forwardRef<HTMLDivElement, Props>(
  function AboutFounderCard({ number, name, role, bio, image }, ref) {
    return (
      <div
        ref={ref}
        className="group relative overflow-hidden rounded-sm cursor-pointer"
        style={{
          border: '3px solid rgba(242,240,236,0.25)',
          transition: 'background-color 0.35s ease, border-color 0.35s ease',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.backgroundColor = '#FF3B1F'
          el.style.borderColor = '#FF3B1F'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.backgroundColor = ''
          el.style.borderColor = 'rgba(242,240,236,0.18)'
        }}
      >
        {/* Photo */}
        <div className="relative w-full" data-cursor="image" style={{ aspectRatio: '3 / 4' }}>
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-top pointer-events-none"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Text content */}
        <div style={{ padding: '28px 28px 32px' }}>
          <span
            className="font-mono text-[10px] tracking-[0.15em] uppercase block mb-3"
            style={{ color: 'rgba(242,240,236,0.4)' }}
          >
            {number}
          </span>

          <h3
            className="font-display font-medium text-paper tracking-[-0.025em] leading-[1.1] mb-3"
            style={{ fontSize: 'clamp(22px, 2.2vw, 38px)' }}
          >
            {name}
          </h3>

          <span
            className="font-mono text-[9px] tracking-[0.13em] uppercase inline-block mb-5 px-2 py-[5px]"
            style={{
              color: 'rgba(242,240,236,0.85)',
              border: '1px solid rgba(242,240,236,0.22)',
            }}
          >
            {role}
          </span>

          <p
            className="font-body text-[13px] leading-[1.85]"
            style={{ color: 'rgba(242,240,236,0.62)' }}
          >
            {bio}
          </p>
        </div>
      </div>
    )
  }
)

export default AboutFounderCard
