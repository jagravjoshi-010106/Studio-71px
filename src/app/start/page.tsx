'use client'

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

const PROJECT_TYPES = ['Website Design', 'Ecommerce Store', 'SEO', 'Brand Identity']
const BUDGETS = ['Under ₹50K', '₹50K – 1L', '₹1L – 3L', '₹3L+', 'Not sure yet']
const TIMELINES = ['ASAP', '2–4 weeks', '1–2 months', 'No rush']

const TOTAL_STEPS = 7

export default function StartPage() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    brand: '',
    projectType: '',
    budget: '',
    timeline: '',
    brief: '',
  })

  const contentRef = useRef<HTMLDivElement>(null)

  const canAdvance = () => {
    switch (step) {
      case 0: return form.name.trim().length > 0
      case 1: return form.email.trim().length > 0 && form.email.includes('@')
      case 2: return form.brand.trim().length > 0
      case 3: return form.projectType.length > 0
      case 4: return form.budget.length > 0
      case 5: return form.timeline.length > 0
      case 6: return true
      default: return false
    }
  }

  const animateOut = (cb: () => void) => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0, y: -20, duration: 0.25, ease: 'power2.in',
        onComplete: cb,
      })
    } else {
      cb()
    }
  }

  const animateIn = () => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      )
    }
  }

  useEffect(() => {
    animateIn()
  }, [step, submitted])

  const next = () => {
    if (!canAdvance()) return
    animateOut(() => setStep(s => s + 1))
  }

  const back = () => {
    if (step === 0) return
    animateOut(() => setStep(s => s - 1))
  }

  const submit = () => {
    animateOut(() => setSubmitted(true))
    setTimeout(() => {
      window.location.href = '/'
    }, 3000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canAdvance()) {
      e.preventDefault()
      if (step < TOTAL_STEPS - 1) next()
      else submit()
    }
  }

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '2px solid rgba(242,240,236,0.3)',
    color: '#F2F0EC',
    fontSize: 'clamp(20px, 2.5vw, 32px)',
    padding: '16px 0',
    width: '100%',
    outline: 'none',
    fontFamily: 'inherit',
    letterSpacing: '-0.01em',
    caretColor: '#F2F0EC',
  }

  if (submitted) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ backgroundColor: '#FF3B1F', padding: 56 }}
      >
        <div ref={contentRef}>
          <h1
            className="font-display font-medium text-paper tracking-[-0.04em] leading-[1.1] text-center"
            style={{ fontSize: 'clamp(64px, 10vw, 140px)', marginBottom: 24 }}
          >
            Got it.
          </h1>
          <p
            className="font-body text-center"
            style={{ fontSize: 'clamp(18px, 2vw, 28px)', color: 'rgba(242,240,236,0.65)' }}
          >
            We will reply within 24 hours.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex flex-col px-5 sm:px-8 md:px-10 lg:px-14 py-8 md:py-14"
      style={{ backgroundColor: '#FF3B1F' }}
      onKeyDown={handleKeyDown}
    >
      <style>{`
        input::placeholder, textarea::placeholder {
          color: rgba(242,240,236,0.3);
        }
      `}</style>
      {/* Header */}
      <div className="flex justify-end items-center mb-auto pr-12 md:pr-0">
        <span className="font-mono text-[12px] tracking-[0.1em] uppercase" style={{ color: 'rgba(242,240,236,0.5)' }}>
          {String(step + 1).padStart(2, '0')} / {String(TOTAL_STEPS).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center" style={{ maxWidth: 700, minHeight: 0 }}>
        <div ref={contentRef} className="w-full">
          {step === 0 && (
            <>
              <h1
                className="font-display font-medium text-paper tracking-[-0.03em] leading-[1.1]"
                style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', marginBottom: 40 }}
              >
                What's your name?
              </h1>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Full name"
                autoFocus
                className="font-display"
                style={inputStyle}
              />
            </>
          )}

          {step === 1 && (
            <>
              <h1
                className="font-display font-medium text-paper tracking-[-0.03em] leading-[1.1]"
                style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', marginBottom: 40 }}
              >
                What's your email?
              </h1>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@company.com"
                autoFocus
                className="font-display"
                style={inputStyle}
              />
            </>
          )}

          {step === 2 && (
            <>
              <h1
                className="font-display font-medium text-paper tracking-[-0.03em] leading-[1.1]"
                style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', marginBottom: 40 }}
              >
                What's your brand?
              </h1>
              <input
                type="text"
                value={form.brand}
                onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                placeholder="Brand or company name"
                autoFocus
                className="font-display"
                style={inputStyle}
              />
            </>
          )}

          {step === 3 && (
            <>
              <h1
                className="font-display font-medium text-paper tracking-[-0.03em] leading-[1.1]"
                style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', marginBottom: 40 }}
              >
                What do you need?
              </h1>
              <div className="flex flex-wrap gap-3">
                {PROJECT_TYPES.map(t => (
                  <button
                    key={t}
                    onClick={() => setForm(f => ({ ...f, projectType: t }))}
                    className="font-body text-[15px] cursor-pointer"
                    style={{
                      padding: '14px 28px',
                      border: '2px solid rgba(242,240,236,0.25)',
                      borderRadius: 2,
                      backgroundColor: form.projectType === t ? '#0E0E0E' : 'transparent',
                      color: '#F2F0EC',
                      transition: 'background-color 0.2s ease, border-color 0.2s ease',
                      borderColor: form.projectType === t ? '#0E0E0E' : 'rgba(242,240,236,0.25)',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h1
                className="font-display font-medium text-paper tracking-[-0.03em] leading-[1.1]"
                style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', marginBottom: 40 }}
              >
                What's your budget range?
              </h1>
              <div className="flex flex-wrap gap-3">
                {BUDGETS.map(b => (
                  <button
                    key={b}
                    onClick={() => setForm(f => ({ ...f, budget: b }))}
                    className="font-body text-[15px] cursor-pointer"
                    style={{
                      padding: '14px 28px',
                      border: '2px solid rgba(242,240,236,0.25)',
                      borderRadius: 2,
                      backgroundColor: form.budget === b ? '#0E0E0E' : 'transparent',
                      color: '#F2F0EC',
                      transition: 'background-color 0.2s ease, border-color 0.2s ease',
                      borderColor: form.budget === b ? '#0E0E0E' : 'rgba(242,240,236,0.25)',
                    }}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <h1
                className="font-display font-medium text-paper tracking-[-0.03em] leading-[1.1]"
                style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', marginBottom: 40 }}
              >
                When do you need it?
              </h1>
              <div className="flex flex-wrap gap-3">
                {TIMELINES.map(t => (
                  <button
                    key={t}
                    onClick={() => setForm(f => ({ ...f, timeline: t }))}
                    className="font-body text-[15px] cursor-pointer"
                    style={{
                      padding: '14px 28px',
                      border: '2px solid rgba(242,240,236,0.25)',
                      borderRadius: 2,
                      backgroundColor: form.timeline === t ? '#0E0E0E' : 'transparent',
                      color: '#F2F0EC',
                      transition: 'background-color 0.2s ease, border-color 0.2s ease',
                      borderColor: form.timeline === t ? '#0E0E0E' : 'rgba(242,240,236,0.25)',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 6 && (
            <>
              <h1
                className="font-display font-medium text-paper tracking-[-0.03em] leading-[1.1]"
                style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', marginBottom: 16 }}
              >
                Tell us about the work.
              </h1>
              <p
                className="font-body text-[13px] mb-8"
                style={{ color: 'rgba(242,240,236,0.45)' }}
              >
                Optional. Skip if you'd rather talk it through.
              </p>
              <textarea
                value={form.brief}
                onChange={e => setForm(f => ({ ...f, brief: e.target.value }))}
                placeholder="A few lines about what you're looking for..."
                rows={4}
                className="font-body"
                style={{
                  ...inputStyle,
                  fontSize: 16,
                  borderBottom: '2px solid rgba(242,240,236,0.3)',
                  resize: 'none',
                  lineHeight: 1.7,
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 md:pt-12 pb-2">
        <button
          onClick={back}
          className="font-body text-[14px] cursor-pointer bg-transparent border-none"
          style={{
            color: 'rgba(242,240,236,0.5)',
            visibility: step === 0 ? 'hidden' : 'visible',
          }}
        >
          ← Back
        </button>

        {step < TOTAL_STEPS - 1 ? (
          <button
            onClick={next}
            disabled={!canAdvance()}
            className="font-display font-medium text-paper inline-flex items-center gap-3 cursor-pointer"
            style={{
              backgroundColor: canAdvance() ? '#0E0E0E' : '#1a1a1a',
              padding: '18px 40px',
              fontSize: 16,
              border: 'none',
            }}
          >
            Next <span>→</span>
          </button>
        ) : (
          <button
            onClick={submit}
            className="font-display font-medium text-paper inline-flex items-center gap-3 cursor-pointer"
            style={{
              backgroundColor: '#0E0E0E',
              padding: '16px 32px',
              fontSize: 15,
              border: 'none',
            }}
          >
            Submit <span>→</span>
          </button>
        )}
      </div>
    </div>
  )
}
