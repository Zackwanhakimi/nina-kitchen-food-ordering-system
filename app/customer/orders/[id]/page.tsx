'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { ArrowLeft, Check, CircleDot } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import { orderStatusSteps } from '@/lib/mock-data'
import { useOrders } from '@/lib/store'
import { cn } from '@/lib/utils'

export default function OrderTrackingPage() {
  const params = useParams()
  const id = params?.id as string | undefined
  const [orders] = useOrders()

  const order = useMemo(
    () => orders.find((o) => o.id === id),
    [orders, id],
  )

  if (!order) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center py-16 text-center">
        <h1 className="font-serif text-2xl font-bold text-foreground">Order not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We could not find that order. Please return to your orders list.
        </p>
        <div className="mt-6">
          <Button variant="outline" render={<Link href="/customer/orders" />}>
            Back to orders
          </Button>
        </div>
      </div>
    )
  }

  const currentIndex = orderStatusSteps.indexOf(order.status)

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        render={<Link href="/customer/orders" />}
      >
        <ArrowLeft className="size-4" />
        Back to orders
      </Button>

      <PageHeader
        title={`Order ${order.id}`}
        description={`Placed on ${order.date}`}
        action={<StatusBadge status={order.status} />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Order status</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="flex flex-col gap-6">
              {order.statusHistory.map((step, index) => {
                const done = index < currentIndex
                const active = index === currentIndex
                return (
                  <li key={`${step.status}-${step.date}`} className="flex items-start gap-4">
                    <span
                      className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-full border',
                        done && 'border-chart-3 bg-chart-3/20 text-chart-3',
                        active &&
                          'border-primary bg-primary text-primary-foreground',
                        !done && !active && 'border-border bg-muted text-muted-foreground',
                      )}
                    >
                      {done ? (
                        <Check className="size-4" />
                      ) : active ? (
                        <CircleDot className="size-4" />
                      ) : (
                        <span className="text-xs">{index + 1}</span>
                      )}
                    </span>
                    <div className="pt-1">
                      <p
                        className={cn(
                          'font-medium',
                          active ? 'text-foreground' : 'text-muted-foreground',
                        )}
                      >
                        {step.status}
                      </p>
                      <p className="text-sm text-muted-foreground">{step.date}</p>
                      {step.note ? (
                        <p className="text-sm text-muted-foreground mt-1">{step.note}</p>
                      ) : null}
                    </div>
                  </li>
                )
              })}
            </ol>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Order details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {order.items.map((item) => (
                <div key={`${item.name}-${item.quantity}`} className="flex justify-between text-sm">
                  <span className="text-foreground">
                    {item.quantity}× {item.name}
                  </span>
                  <span className="text-muted-foreground">
                    RM {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between border-t border-border pt-3 font-serif font-bold text-foreground">
                <span>Total</span>
                <span>RM {order.total.toFixed(2)}</span>
              </div>
              <div className="space-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Pickup</span>
                  <span>{order.pickupDateTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Preorder placed</span>
                  <span>{order.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Payment</span>
                  <span>{order.paymentStatus}</span>
                </div>
              </div>
              {order.adminNote ? (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  Admin note: {order.adminNote}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
