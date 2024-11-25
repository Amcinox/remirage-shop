import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Remirage Shop',
    template: '%s | Remirage Shop',
  },
  description: 'Discover amazing products and enjoy a seamless shopping experience with Remirage Shop.',
  keywords: ['e-commerce', 'online shopping', 'Remirage Shop'],
  authors: [{ name: 'Remirage Shop Team' }],
  creator: 'Remirage Shop',
  publisher: 'Remirage Shop',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

