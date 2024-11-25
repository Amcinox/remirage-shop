import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between px-4 md:px-6 border-b">
        <div className="text-xl md:text-2xl font-bold">Remirage Shop</div>
        <nav className="hidden md:flex items-center gap-4 md:gap-6">
          <Link href="/" className="text-sm font-medium">Home</Link>
          <Link href="#features" className="text-sm font-medium">Features</Link>
          <Link href="#pricing" className="text-sm font-medium">Pricing</Link>
          <Link href="#contact" className="text-sm font-medium">Contact</Link>
        </nav>
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/login">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="px-4 py-16 md:px-6 md:py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight sm:text-5xl">
              Manage Your Online Store with Ease
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-lg leading-7 md:leading-8 text-muted-foreground">
              A powerful e-commerce platform that helps you sell more and manage your business efficiently.
              Start selling online today with our easy-to-use dashboard.
            </p>
            <div className="mt-8 md:mt-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              <Link href="/login">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg">Learn More</Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="border-t px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">Features</h2>
            <div className="mt-12 md:mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Product Management",
                  description: "Easily add, edit, and manage your products with our intuitive dashboard."
                },
                {
                  title: "Order Processing",
                  description: "Process orders efficiently and keep track of your inventory in real-time."
                },
                {
                  title: "Customer Management",
                  description: "Manage your customers and their information all in one place."
                },
                {
                  title: "Analytics",
                  description: "Get detailed insights about your sales and customer behavior."
                },
                {
                  title: "Multi-channel Selling",
                  description: "Sell across multiple platforms and manage everything from one dashboard."
                },
                {
                  title: "Secure Payments",
                  description: "Accept payments securely with our integrated payment solutions."
                }
              ].map((feature, index) => (
                <div key={index} className="rounded-lg border p-6 md:p-8">
                  <h3 className="text-lg md:text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 md:mt-4 text-sm md:text-base text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs md:text-sm text-muted-foreground">
            © 2024 Remirage Shop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
