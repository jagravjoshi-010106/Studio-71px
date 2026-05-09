import gsap from 'gsap'

interface LoaderRefs {
  container: HTMLElement
  wordmark: HTMLElement
  studioWrapper: HTMLElement
  studioText: HTMLElement
  number: HTMLElement
}

export function buildLoaderTimeline(
  { container, wordmark, studioWrapper, studioText, number }: LoaderRefs,
  onComplete: () => void
): gsap.core.Timeline {
  gsap.set(studioWrapper, { width: 0 })
  gsap.set(studioText, { x: -20 })

  const counter = { val: 0 }

  return gsap
    .timeline()
    .to(counter, {
      val: 71,
      duration: 2.2,
      ease: 'power2.out',
      onUpdate() {
        number.textContent = String(Math.round(counter.val))
      },
    })
    .to({}, { duration: 0.3 })
    .to(studioWrapper, { width: 'auto', duration: 0.5, ease: 'power2.out' }, '>')
    .to(studioText, { x: 0, duration: 0.5, ease: 'power2.out' }, '<')
    .to({}, { duration: 0.4 })
    .call(() => {
      const rect = wordmark.getBoundingClientRect()
      const currentFontSize = parseFloat(window.getComputedStyle(number).fontSize)
      const scale = 24 / currentFontSize

      gsap.to(wordmark, {
        x: 24 - rect.left,
        y: 24 - rect.top,
        scale,
        transformOrigin: 'left top',
        duration: 0.65,
        ease: 'power3.inOut',
      })

      gsap.to(container, {
        autoAlpha: 0,
        duration: 0.4,
        delay: 0.3,
        onComplete,
      })
    })
}
