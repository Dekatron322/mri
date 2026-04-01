import "styles/tailwind.css"
import { Providers } from "./providers"
import AuthInitializer from "./authInitializer"

import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://cortifact.com'),
  title: 'Cortifact — Operational Intelligence Platform',
  description: 'Turn Fragmented Work Into Coordinated Execution. Cortifact helps organizations connect messages, files, follow-up, and memory.',
  openGraph: {
    title: 'Cortifact — Operational Intelligence Platform',
    description: 'Turn Fragmented Work Into Coordinated Execution',
    siteName: 'Cortifact',
    images: [
      {
        url: '/banner.png',
        width: 1200,
        height: 630,
        alt: 'Cortifact Banner',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cortifact — Operational Intelligence Platform',
    description: 'Turn Fragmented Work Into Coordinated Execution',
    images: ['/banner.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthInitializer />
          {children}
        </Providers>
      </body>
    </html>
  )
}
