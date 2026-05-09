'use client'

import { useState } from 'react'
import Loader from './Loader'
import { useLoaderContext } from '@/lib/context/loader-context'

export default function LoaderWrapper() {
  const [done, setDone] = useState(false)
  const { markComplete } = useLoaderContext()

  const handleComplete = () => {
    markComplete()
    setDone(true)
  }

  if (done) return null
  return <Loader onComplete={handleComplete} />
}
