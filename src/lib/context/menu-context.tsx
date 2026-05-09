'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface MenuContextValue {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

const MenuContext = createContext<MenuContextValue | null>(null)

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </MenuContext.Provider>
  )
}

export function useMenuContext() {
  const ctx = useContext(MenuContext)
  if (!ctx) throw new Error('useMenuContext must be used within MenuProvider')
  return ctx
}
