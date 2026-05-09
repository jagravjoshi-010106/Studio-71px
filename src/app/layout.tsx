import type { Metadata } from 'next'
import {
  Space_Grotesk,
  Inter,
  Instrument_Serif,
  JetBrains_Mono,
} from 'next/font/google'
import { LoaderProvider } from '@/lib/context/loader-context'
import { MenuProvider } from '@/lib/context/menu-context'
import LoaderWrapper from '@/components/loader/LoaderWrapper'
import Cursor from '@/components/cursor/Cursor'
import NavWrapper from '@/components/nav/NavWrapper'
import SiteLogo from '@/components/nav/SiteLogo'
import SmoothScroll from '@/lib/smooth-scroll/SmoothScroll'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-space-grotesk',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-instrument-serif',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Studio 71PX',
  description:
    'A two-person web studio building brand-defining websites for consumer brands that refuse to look like everyone else.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-ink text-paper">
        <LoaderProvider>
          <MenuProvider>
            <SmoothScroll />
            <LoaderWrapper />
            <Cursor />
            <SiteLogo />
            <NavWrapper />
            {children}
          </MenuProvider>
        </LoaderProvider>
      </body>
    </html>
  )
}
