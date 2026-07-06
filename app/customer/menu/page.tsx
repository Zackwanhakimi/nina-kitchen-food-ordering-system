'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Minus, ShoppingBag, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PageHeader } from '@/components/page-header'
import { menuItems, type MenuItem } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const categories = ['All', 'Makanan', 'Ais Batu Campur', 'Minuman'] as const

type CartItem = {
  itemId: string
  quantity: number
  spiceLevel?: string
  notes?: string
}

export default function CustomerMenuPage() {
  const [category, setCategory] =
    useState<(typeof categories)[number]>('All')
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedItemForOptions, setSelectedItemForOptions] = useState<string | null>(null)
  const [spiceLevel, setSpiceLevel] = useState<string>('medium')
  const [notes, setNotes] = useState<string>('')

  const filtered = useMemo(
    () =>
      category === 'All'
        ? menuItems
        : menuItems.filter((m) => m.category === category),
    [category],
  )

  const selectedItem = selectedItemForOptions
    ? menuItems.find((m) => m.id === selectedItemForOptions)
    : null

  const add = (item: MenuItem) => {
    if (item.spiceLevels) {
      setSelectedItemForOptions(item.id)
    } else {
      addToCart(item.id, item.spiceLevels ? spiceLevel : undefined, notes)
      setNotes('')
    }
  }

  const addToCart = (itemId: string, spiceLevel?: string, itemNotes?: string) => {
    setCart((c) => [
      ...c,
      {
        itemId,
        quantity: 1,
        spiceLevel,
        notes: itemNotes,
      },
    ])
    setSelectedItemForOptions(null)
    setSpiceLevel('medium')
    setNotes('')
  }

  const remove = (index: number) => {
    setCart((c) => c.filter((_, i) => i !== index))
  }

  const updateQuantity = (index: number, delta: number) => {
    setCart((c) => {
      const newCart = [...c]
      newCart[index].quantity = Math.max(0, newCart[index].quantity + delta)
      return newCart.filter((item) => item.quantity > 0)
    })
  }

  const totalItems = cart.reduce((s, item) => s + item.quantity, 0)
  const totalPrice = cart.reduce((s, cartItem) => {
    const item = menuItems.find((m) => m.id === cartItem.itemId)
    return s + (item ? item.price * cartItem.quantity : 0)
  }, 0)

  if (selectedItem) {
    return (
      <>
        <PageHeader
          title="Customize Item"
          description={selectedItem.name}
        />

        <div className="mx-auto max-w-2xl rounded-lg border border-border bg-card p-6">
          <div className="flex flex-col gap-6">
            {selectedItem.spiceLevels && (
              <div className="flex flex-col gap-3">
                <Label className="text-base font-semibold">Spice Level</Label>
                <div className="grid grid-cols-3 gap-3">
                  {['mild', 'medium', 'hot'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSpiceLevel(level)}
                      className={cn(
                        'rounded-lg border-2 px-4 py-2 font-medium capitalize transition-colors',
                        spiceLevel === level
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border text-muted-foreground hover:border-primary/50',
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Label htmlFor="notes" className="text-base font-semibold">
                Special Notes
              </Label>
              <textarea
                id="notes"
                placeholder="e.g., no nuts, no tempeh, extra sauce"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-24 rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground"
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setSelectedItemForOptions(null)
                  setSpiceLevel('medium')
                  setNotes('')
                }}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={() =>
                  addToCart(selectedItem.id, spiceLevel, notes)
                }
              >
                <Plus className="size-4" />
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }

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
                <Button
                  className="mt-2 w-full"
                  disabled={!item.available}
                  onClick={() => add(item)}
                >
                  <Plus className="size-4" />
                  Add to cart
                </Button>
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
