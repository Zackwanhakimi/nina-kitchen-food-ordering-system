import Link from 'next/link'
import Image from 'next/image'
import {
  ShoppingBag,
  ClipboardList,
  CreditCard,
  ChefHat,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PublicHeader } from '@/components/public-header'
import { menuItems } from '@/lib/mock-data'

const steps = [
  {
    icon: ClipboardList,
    title: 'Browse the menu',
    description: 'Explore home-cooked dishes updated fresh by our kitchen.',
  },
  {
    icon: ShoppingBag,
    title: 'Place your order',
    description: 'Add your favourites to the cart and check out in seconds.',
  },
  {
    icon: ChefHat,
    title: 'We cook it fresh',
    description: 'Track your order status live from kitchen to your door.',
  },
  {
    icon: CreditCard,
    title: 'Pay with ease',
    description: 'Secure payment and instant receipts, all in one place.',
  },
]

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              Home-cooked, made with love
            </span>
            <h1 className="font-serif text-4xl font-bold leading-tight text-foreground text-balance md:text-6xl">
              Real food from Nina&apos;s Kitchen, delivered to you
            </h1>
            <p className="max-w-md text-lg text-muted-foreground text-pretty">
              Order authentic home-cooked meals, track your order in real time,
              and pay securely. Fresh flavours, made daily.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" render={<Link href="/register" />}>
                Order now
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/#menu" />}
              >
                View menu
              </Button>
            </div>
          </div>
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border shadow-lg">
            <Image
              src="/images/hero-dish.png"
              alt="A beautifully plated home-cooked meal from Nina Kitchen"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-y border-border bg-secondary/40">
          <div className="mx-auto w-full max-w-6xl px-4 py-14">
            <h2 className="text-center font-serif text-3xl font-bold text-foreground">
              How it works
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => {
                const Icon = step.icon
                return (
                  <Card key={step.title} className="border-border">
                    <CardContent className="flex flex-col gap-3 p-6">
                      <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </span>
                      <h3 className="font-serif text-lg font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground text-pretty">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Menu preview */}
        <section id="menu" className="mx-auto w-full max-w-6xl px-4 py-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground">
                Featured menu
              </h2>
              <p className="mt-1 text-muted-foreground">
                A taste of what&apos;s cooking today.
              </p>
            </div>
            <Button variant="outline" render={<Link href="/register" />}>
              See full menu
            </Button>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems.slice(0, 6).map((item) => (
              <Card key={item.id} className="overflow-hidden pt-0">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex flex-col gap-2 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {item.name}
                    </h3>
                    <span className="font-semibold text-primary">
                      RM {item.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground text-pretty">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* About / CTA */}
        <section id="about" className="border-t border-border bg-primary">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-4 py-16 text-center text-primary-foreground">
            <h2 className="font-serif text-3xl font-bold text-balance md:text-4xl">
              Hungry yet? Create an account and order in minutes.
            </h2>
            <p className="max-w-lg text-primary-foreground/85 text-pretty">
              Join Nina Kitchen today to place orders, track them live, and
              manage your payments — all in one cozy place.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                variant="secondary"
                render={<Link href="/register" />}
              >
                Create account
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                render={<Link href="/login" />}
              >
                Log in
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row">
          <p>Nina Kitchen — home-cooked with love.</p>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-foreground">
              Customer login
            </Link>
            <Link href="/owner" className="hover:text-foreground">
              Owner portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
