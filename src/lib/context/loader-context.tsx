'use client'

import { createContext, useCallback, useContext, useState } from 'react'

interface LoaderContextValue {
  loaderComplete: boolean
  markComplete: () => void
}

const LoaderContext = createContext<LoaderContextValue>({
  loaderComplete: false,
  markComplete: () => {},
})

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [loaderComplete, setLoaderComplete] = useState(false)
  const markComplete = useCallback(() => setLoaderComplete(true), [])

  return (
    <LoaderContext.Provider value={{ loaderComplete, markComplete }}>
      {children}
    </LoaderContext.Provider>
  )
}

export const useLoaderContext = () => useContext(LoaderContext)
