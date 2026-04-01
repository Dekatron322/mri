import { Metadata, Viewport } from "next"
import "styles/tailwind.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://corticalfactory.com"),
  title: {
    default: "MRI — Magnetic Resonance Imaging Visualization",
    template: "%s | MRI",
  },
  description:
    "Advanced MRI visualization and analysis platform for medical imaging. Explore brain scans, anatomical models, and neural network visualizations with cutting-edge 3D rendering technology.",
  keywords: [
    "MRI",
    "magnetic resonance imaging",
    "medical imaging",
    "brain scan",
    "neuroimaging",
    "3D visualization",
    "anatomical models",
    "medical visualization",
    "radiology",
    "neuroscience",
    "brain imaging",
    "medical technology",
    "healthcare software",
  ],
  authors: [{ name: "MRI factory", url: "https://mri.com" }],
  creator: "MRI factory",
  publisher: "MRI factory",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Icons and Favicon
  icons: {
    icon: [
      { url: "/fav2.png" },
      { url: "/fav2.png", type: "image/svg+xml" },
      { url: "/fav2.png", sizes: "16x16", type: "image/png" },
      { url: "/fav2.png", sizes: "32x32", type: "image/png" },
      { url: "/fav2.png", sizes: "192x192", type: "image/png" },
      { url: "/fav2.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/fav2.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/fav2.png",
        color: "#2563eb", // Blue-600 to match your brand
      },
    ],
  },

  // Manifest for PWA
  manifest: "/site.webmanifest",

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://corticalfactory.com",
    siteName: "MRI",
    title: "MRI — Magnetic Resonance Imaging Visualization",
    description:
      "Advanced MRI visualization and analysis platform. Explore brain scans, anatomical models, and neural network visualizations with cutting-edge 3D rendering.",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "MRI — Medical Imaging Visualization",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@corticalfactory",
    creator: "@corticalfactory",
    title: "MRI — Magnetic Resonance Imaging Visualization",
    description: "Advanced MRI visualization and analysis platform for medical imaging.",
    images: ["/image.png"],
  },

  // Robots directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (add when you set up Search Console)
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },

  // Alternate languages (if you have multilingual content)
  alternates: {
    canonical: "https://corticalfactory.com",
    languages: {
      "en-US": "https://corticalfactory.com",
    },
  },

  // Category (helps with categorization)
  category: "technology",

  // Other useful metadata
  applicationName: "MRI",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  colorScheme: "light",
}

// Cloudflare Pages edge runtime compatibility
export const runtime = "edge"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data / JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "MRI Visualization Platform",
              applicationCategory: "HealthApplication",
              applicationSubCategory: "Medical Imaging",
              description:
                "Advanced MRI visualization and analysis platform for medical imaging, brain scans, and anatomical 3D models.",
              operatingSystem: "Web-based",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "3D MRI Visualization",
                "Brain Scan Analysis",
                "Anatomical Models",
                "Neural Network Rendering",
                "Medical Imaging",
              ],
              url: "https://corticalfactory.com",
              sameAs: ["https://twitter.com/corticalfactory", "https://linkedin.com/company/corticalfactory"],
            }),
          }}
        />
      </head>
      <body>{children}</body>
      {/* <script src="https://widget.realtyverse.xyz/index.js"></script> */}
    </html>
  )
}
