'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PublicHeader } from '@/components/public-header'
import { menuItems } from '@/lib/mock-data'

export default function LandingPage() {
  const [cart, setCart] = useState<Record<string, number>>({})

  const addToCart = (itemId: string) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  const groupedMenu = menuItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, typeof menuItems>
  )

  const categoryOrder = ['Makanan', 'Ais Batu Campur', 'Minuman']

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
              Ayam Gepuk Nina Kitchen
            </h1>
            <p className="max-w-md text-lg text-muted-foreground text-pretty">
              Delicious home-cooked meals prepared with love. Browse our menu,
              add items to cart, and register to place your order.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" render={<Link href="/#menu" />}>
                Browse menu
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/#about" />}
              >
                About us
              </Button>
            </div>
          </div>
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border shadow-lg bg-muted">
            <Image
              src="/placeholder.svg"
              alt="Ayam Gepuk Nina Kitchen"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Menu */}
        <section id="menu" className="mx-auto w-full max-w-6xl px-4 py-14">
          <div className="mb-8">
            <h2 className="font-serif text-3xl font-bold text-foreground">
              Our Menu
            </h2>
            <p className="mt-1 text-muted-foreground">
              Browse and add items to your cart. You need to register to
              checkout.
            </p>
          </div>

          {categoryOrder.map((category) => (
            <div key={category} className="mb-12">
              <h3 className="mb-4 font-serif text-xl font-semibold text-foreground">
                {category}
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {groupedMenu[category]?.map((item) => (
                  <Card key={item.id} className="overflow-hidden pt-0">
                    <div className="relative aspect-[4/3] w-full bg-muted">
                      <Image
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="flex flex-col gap-3 p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-serif font-semibold text-foreground">
                            {item.name}
                          </h4>
                          <p className="text-sm text-muted-foreground text-pretty">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-primary">
                          RM {item.price.toFixed(2)}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => addToCart(item.id)}
                          className="gap-1"
                        >
                          <Plus className="size-4" />
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* About */}
        <section id="about" className="border-t border-border bg-secondary/40">
          <div className="mx-auto w-full max-w-6xl px-4 py-14">
            <h2 className="font-serif text-3xl font-bold text-foreground">
              About Ayam Gepuk Nina Kitchen
            </h2>
            <div className="mt-8 space-y-4 text-muted-foreground">
              <p>
                Ayam Gepuk Nina Kitchen is located at Jalan Merlimau Utama,
                Taman Merlimau Utama, 77300 Merlimau, Melaka. The restaurant
                started as a business known as Nina Kitchen in BizBox Merlimau
                selling various menu items including donuts, cake, and other
                Malaysian cuisines such as Kuih Muih and Pulut Kuning Set
                Rendang Ayam.
              </p>
              <p>
                On 22 March 2022, the restaurant in BizBox Merlimau was closed
                as the owner focused on handling the factory canteen while still
                handling custom orders and catering. Next, the restaurant
                rebranded as Ayam Gepuk Nina Kitchen on 15 December 2025 which
                focused on Ayam Gepuk dishes and opened for business at the
                current location.
              </p>
              <p>
                The restaurant business primary operation is on-premise food and
                beverage sales, while opening custom orders for cake and
                catering. The menu consists of Nasi Ayam Gepuk and other Ayam
                Gepuk variants such as Ayam Gepuk Indomie. They also serve a
                series of beverages such as coffee, refresher, frappe, and other
                non-coffee series like matcha latte. The restaurant also has
                ready made food such as chocolate donuts and bomboloni.
              </p>
              <p>
                The daily operation crew consists of 3 general workers, 1 cook
                and the owner. The general worker handles the cashier, prepares
                beverages, takes orders, serves food to the tables and other
                kitchen tasks. The cook mainly prepares the food and is assisted
                by the general workers. The owner manages the restaurant,
                performs administrative tasks, and delegates tasks to the crew.
              </p>
              <p className="font-semibold">
                Operation hours: 11:00 AM - 7:00 PM (Closed Sundays)
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-primary">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-4 py-16 text-center text-primary-foreground">
            <h2 className="font-serif text-3xl font-bold text-balance md:text-4xl">
              Ready to order?
            </h2>
            <p className="max-w-lg text-primary-foreground/85 text-pretty">
              Create an account to complete your order and track it in real time.
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
          <p>Ayam Gepuk Nina Kitchen — home-cooked with love.</p>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-foreground">
              Customer login
            </Link>
            <Link href="/login?role=admin" className="hover:text-foreground">
              Administrator login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
