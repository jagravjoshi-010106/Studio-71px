'use client'

import { useEffect, useRef } from 'react'
import { buildLoaderTimeline } from '@/lib/animations/loader'

const SIZE = 'clamp(72px, 14vw, 220px)'
const SUB_SIZE = 'calc(clamp(72px, 14vw, 220px) * 0.55)'

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordmarkRef = useRef<HTMLDivElement>(null)
  const studioWrapperRef = useRef<HTMLSpanElement>(null)
  const studioTextRef = useRef<HTMLSpanElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const wordmark = wordmarkRef.current
    const studioWrapper = studioWrapperRef.current
    const studioText = studioTextRef.current
    const number = numberRef.current
    if (!container || !wordmark || !studioWrapper || !studioText || !number) return

    const tl = buildLoaderTimeline(
      { container, wordmark, studioWrapper, studioText, number },
      onComplete
    )

    return () => {
      tl.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink"
    >
      <div ref={wordmarkRef} className="flex items-baseline">
        <span
          ref={studioWrapperRef}
          className="inline-block overflow-hidden whitespace-nowrap"
        >
          <span
            ref={studioTextRef}
            className="inline-block font-display font-medium text-paper"
            style={{ fontSize: SIZE }}
          >
            Studio&nbsp;
          </span>
        </span>
        <span
          className="font-display font-medium text-paper"
          style={{ fontSize: SIZE }}
        >
          <span ref={numberRef}>0</span>
        </span>
        <span
          className="font-mono font-medium text-paper"
          style={{ fontSize: SUB_SIZE, verticalAlign: '0.05em' }}
        >
          px
        </span>
        <span
          className="font-mono font-medium text-pixel-red"
          style={{ fontSize: SUB_SIZE, verticalAlign: '0.05em' }}
        >
          .
        </span>
      </div>
    </div>
  )
}
