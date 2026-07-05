'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, CreditCard, Wallet, Banknote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PageHeader } from '@/components/page-header'
import { menuItems, customerProfile } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const sampleCart = [
  { item: menuItems[0], qty: 2 },
  { item: menuItems[3], qty: 1 },
]

const methods = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'ewallet', label: 'E-Wallet', icon: Wallet },
  { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
]

export default function CheckoutPage() {
  const [method, setMethod] = useState('card')
  const [placed, setPlaced] = useState(false)

  const subtotal = sampleCart.reduce((s, c) => s + c.item.price * c.qty, 0)
  const delivery = 4
  const total = subtotal + delivery

  if (placed) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-chart-3/20 text-chart-3">
          <CheckCircle2 className="size-8" />
        </span>
        <h1 className="mt-6 font-serif text-2xl font-bold text-foreground">
          Order placed &amp; paid!
        </h1>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          Your order <strong>NK-1043</strong> has been received and paid via{' '}
          {methods.find((m) => m.id === method)?.label}. You can track its
          status now.
        </p>
        <div className="mt-6 flex gap-3">
          <Button render={<Link href="/customer/orders/NK-1043" />}>
            Track order
          </Button>
          <Button variant="outline" render={<Link href="/customer" />}>
            Back to dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title="Checkout"
        description="Review your order and complete payment."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Delivery details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={customerProfile.name} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue={customerProfile.phone} />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="address">Delivery address</Label>
                <Input id="address" defaultValue={customerProfile.address} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment method</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {methods.map((m) => {
                const Icon = m.icon
                const active = method === m.id
                return (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg border p-3 text-left transition-colors',
                      active
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted',
                    )}
                  >
                    <Icon
                      className={cn(
                        'size-5',
                        active ? 'text-primary' : 'text-muted-foreground',
                      )}
                    />
                    <span className="flex-1 font-medium text-foreground">
                      {m.label}
                    </span>
                    <span
                      className={cn(
                        'size-4 rounded-full border-2',
                        active
                          ? 'border-primary bg-primary'
                          : 'border-border',
                      )}
                    />
                  </button>
                )
              })}
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Order summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {sampleCart.map((c) => (
              <div
                key={c.item.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-foreground">
                  {c.qty}× {c.item.name}
                </span>
                <span className="text-muted-foreground">
                  RM {(c.item.price * c.qty).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t border-border pt-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>RM {subtotal.toFixed(2)}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span>RM {delivery.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between border-t border-border pt-3 font-serif text-lg font-bold text-foreground">
              <span>Total</span>
              <span>RM {total.toFixed(2)}</span>
            </div>
            <Button
              size="lg"
              className="mt-2 w-full"
              onClick={() => setPlaced(true)}
            >
              Place order &amp; pay
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
