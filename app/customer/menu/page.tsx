'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Minus, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/page-header'
import { menuItems, type MenuItem } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const categories = ['All', 'Mains', 'Noodles', 'Sides', 'Dessert'] as const

export default function CustomerMenuPage() {
  const [category, setCategory] =
    useState<(typeof categories)[number]>('All')
  const [cart, setCart] = useState<Record<string, number>>({})

  const filtered = useMemo(
    () =>
      category === 'All'
        ? menuItems
        : menuItems.filter((m) => m.category === category),
    [category],
  )

  const add = (item: MenuItem) =>
    setCart((c) => ({ ...c, [item.id]: (c[item.id] ?? 0) + 1 }))
  const remove = (item: MenuItem) =>
    setCart((c) => {
      const next = { ...c }
      const qty = (next[item.id] ?? 0) - 1
      if (qty <= 0) delete next[item.id]
      else next[item.id] = qty
      return next
    })

  const cartItems = Object.entries(cart)
  const totalItems = cartItems.reduce((s, [, q]) => s + q, 0)
  const totalPrice = cartItems.reduce((s, [id, q]) => {
    const item = menuItems.find((m) => m.id === id)
    return s + (item ? item.price * q : 0)
  }, 0)

  return (
    <>
      <PageHeader
        title="Our Menu"
        description="Pick your favourites and add them to your cart."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              category === c
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-secondary',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-5 pb-28 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => {
          const qty = cart[item.id] ?? 0
          return (
            <Card key={item.id} className="flex flex-col overflow-hidden pt-0">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                {!item.available ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/50">
                    <Badge className="bg-background text-foreground">
                      Sold out
                    </Badge>
                  </div>
                ) : null}
              </div>
              <CardContent className="flex flex-1 flex-col gap-2 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {item.name}
                  </h3>
                  <span className="shrink-0 font-semibold text-primary">
                    RM {item.price.toFixed(2)}
                  </span>
                </div>
                <p className="flex-1 text-sm text-muted-foreground text-pretty">
                  {item.description}
                </p>
                {qty === 0 ? (
                  <Button
                    className="mt-2 w-full"
                    disabled={!item.available}
                    onClick={() => add(item)}
                  >
                    <Plus className="size-4" />
                    Add to cart
                  </Button>
                ) : (
                  <div className="mt-2 flex items-center justify-between rounded-lg border border-border p-1">
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => remove(item)}
                    >
                      <Minus className="size-4" />
                    </Button>
                    <span className="font-semibold">{qty}</span>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => add(item)}
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {totalItems > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-8">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShoppingBag className="size-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">
                  {totalItems} item{totalItems > 1 ? 's' : ''} in cart
                </p>
                <p className="font-serif text-lg font-bold text-foreground">
                  RM {totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
            <Button size="lg" render={<Link href="/customer/checkout" />}>
              Checkout
            </Button>
          </div>
        </div>
      ) : null}
    </>
  )
}
