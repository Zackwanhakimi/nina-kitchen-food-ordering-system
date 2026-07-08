'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, CreditCard, Wallet, Banknote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/page-header'
import { customerProfile } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { useCart, useOrders } from '@/lib/store'

const methods = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'ewallet', label: 'E-Wallet', icon: Wallet },
  { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
]

export default function CheckoutPage() {
  const [method, setMethod] = useState('card')
  const [pickupDate, setPickupDate] = useState('')
  const [pickupTime, setPickupTime] = useState('12:00')
  const [fulfillment, setFulfillment] = useState<'Pickup' | 'Delivery'>('Pickup')
  const [deliveryAddress, setDeliveryAddress] = useState<string>(customerProfile.address)
  const [placed, setPlaced] = useState(false)
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null)

  const { cartItems, totalPrice, clearCart } = useCart()
  const [, setOrders] = useOrders()

  const subtotal = totalPrice
  const total = subtotal

  const pickupDateTime = useMemo(() => {
    if (!pickupDate || !pickupTime) return ''
    return `${pickupDate} ${pickupTime}`
  }, [pickupDate, pickupTime])

  const canPlaceOrder = cartItems.length > 0 && pickupDateTime !== ''
    && (fulfillment === 'Pickup' || (fulfillment === 'Delivery' && deliveryAddress.trim() !== ''))

  const placeOrder = () => {
    if (!canPlaceOrder) return

    const now = new Date()
    const orderDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate(),
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    const id = `NK-${Math.floor(1000 + Math.random() * 9000)}`

    const orderItems = cartItems.map((entry) => ({
      name: entry.item?.name ?? 'Item',
      quantity: entry.quantity,
      price: entry.item?.price ?? 0,
      notes: entry.notes,
    }))

    const newOrder = {
      id,
      customer: customerProfile.name,
      date: orderDate,
      pickupDateTime,
      fulfillment,
      deliveryAddress: fulfillment === 'Delivery' ? deliveryAddress : undefined,
      items: orderItems,
      total: total,
      status: 'Pending' as const,
      paymentStatus: 'Paid' as const,
      cancellationRequested: false,
      statusHistory: [{ status: 'Pending' as const, date: orderDate }],
    }

    setOrders((prev) => [newOrder, ...prev])
    clearCart()
    setPlaced(true)
    setPlacedOrderId(id)
  }

  if (placed) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-chart-3/20 text-chart-3">
          <CheckCircle2 className="size-8" />
        </span>
        <h1 className="mt-6 font-serif text-2xl font-bold text-foreground">
          Preorder submitted
        </h1>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          Your preorder <strong>{placedOrderId}</strong> is pending admin confirmation. Pickup is scheduled for <strong>{pickupDateTime}</strong>.
        </p>
        <div className="mt-6 flex gap-3">
          <Button render={<Link href="/customer" />}>
            Back to dashboard
          </Button>
          <Button variant="outline" render={<Link href="/customer/orders" />}>
            View order history
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title="Checkout"
        description="Review your preorder and select a pickup time. Preorders must be placed at least 1 day before pickup."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Pickup details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="fulfillment"
                    checked={fulfillment === 'Pickup'}
                    onChange={() => setFulfillment('Pickup')}
                  />
                  Pickup
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="fulfillment"
                    checked={fulfillment === 'Delivery'}
                    onChange={() => setFulfillment('Delivery')}
                  />
                  Delivery
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={customerProfile.name} readOnly />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue={customerProfile.phone} readOnly />
                </div>
              </div>
              {fulfillment === 'Delivery' ? (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="deliveryAddress">Delivery address</Label>
                  <Input
                    id="deliveryAddress"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter delivery address"
                  />
                </div>
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="pickupDate">Pickup date</Label>
                  <Input
                    id="pickupDate"
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={new Date(Date.now() + 86400000).toISOString().slice(0, 10)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="pickupTime">Pickup time</Label>
                  <Input
                    id="pickupTime"
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                  />
                </div>
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
            {cartItems.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Your cart is empty. Add items from the menu before checkout.
              </p>
            ) : (
              cartItems.map((entry) => (
                <div key={`${entry.itemId}-${entry.spiceLevel ?? 'default'}`} className="flex flex-col gap-1 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">
                      {entry.quantity}× {entry.item?.name}
                    </span>
                    <span className="text-muted-foreground">
                      RM {((entry.item?.price ?? 0) * entry.quantity).toFixed(2)}
                    </span>
                  </div>
                  {entry.spiceLevel ? (
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {entry.spiceLevel}
                      </Badge>
                    </div>
                  ) : null}
                  {entry.notes ? (
                    <p className="text-xs text-muted-foreground italic">
                      Note: {entry.notes}
                    </p>
                  ) : null}
                </div>
              ))
            )}

            <div className="border-t border-border pt-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>RM {subtotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between border-t border-border pt-3 font-serif text-lg font-bold text-foreground">
              <span>Total</span>
              <span>RM {total.toFixed(2)}</span>
            </div>
            <Button
              size="lg"
              className="mt-2 w-full"
              onClick={placeOrder}
              disabled={!canPlaceOrder}
            >
              Place preorder
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
