'use client'

import { forwardRef } from 'react'

interface Props {
  number: string
  title: string
  description: string
  accentColor: string
  dark?: boolean
}

const ProcessCard = forwardRef<HTMLDivElement, Props>(
  ({ number, title, description, accentColor, dark = false }, ref) => {
    const bg         = dark ? '#0E0E0E' : '#F2F0EC'
    const titleColor = dark ? '#F2F0EC' : '#0E0E0E'
    const descColor  = dark ? 'rgba(242,240,236,0.65)' : 'rgba(14,14,14,0.6)'
    const padding    = 'clamp(28px, 3vw, 44px)'

    return (
      <div
        ref={ref}
        className="absolute inset-0 overflow-hidden flex flex-col justify-between"
        style={{
          backgroundColor: bg,
          paddingTop: padding,
          paddingBottom: padding,
          paddingRight: padding,
          paddingLeft: `calc(${padding} + 8px)`,
          boxShadow: '0 16px 64px rgba(0,0,0,0.45)',
        }}
      >
        {/* Left accent stripe */}
        <div
          className="absolute top-0 left-0 bottom-0"
          style={{ width: 6, backgroundColor: accentColor }}
        />

        {/* Large faded background number — decorative texture */}
        <span
          className="absolute select-none pointer-events-none font-mono font-black leading-none"
          style={{
            bottom: '-0.1em',
            right: '0.15em',
            fontSize: 'clamp(110px, 14vw, 180px)',
            color: accentColor,
            opacity: dark ? 0.11 : 0.07,
          }}
        >
          {number}
        </span>

        {/* Top — step label + rule */}
        <div className="relative flex items-center gap-4 shrink-0">
          <span
            className="font-mono text-[12px] tracking-[0.18em] uppercase font-medium shrink-0"
            style={{ color: accentColor }}
          >
            {number}
          </span>
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: accentColor, opacity: 0.28 }}
          />
        </div>

        {/* Title + description — my-auto centers this block in the remaining space */}
        <div className="relative my-auto">
          <h3
            className="font-display font-medium tracking-[-0.025em] leading-[1.06] mb-4"
            style={{ fontSize: 'clamp(28px, 3.2vw, 50px)', color: titleColor }}
          >
            {title}
          </h3>
          <p
            className="font-body text-[14px] leading-[1.78]"
            style={{ color: descColor }}
          >
            {description}
          </p>
        </div>
      </div>
    )
  }
)

ProcessCard.displayName = 'ProcessCard'
export default ProcessCard
