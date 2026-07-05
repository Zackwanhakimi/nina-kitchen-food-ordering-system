'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Bell, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import {
  orderStatusSteps,
  type Order,
  type OrderStatus,
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export function OwnerOrderManager({ order }: { order: Order }) {
  const [status, setStatus] = useState<OrderStatus>(order.status)
  const [notified, setNotified] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        render={<Link href="/owner/orders" />}
      >
        <ArrowLeft className="size-4" />
        Back to orders
      </Button>

      <PageHeader
        title={`Order ${order.id}`}
        description={`${order.customer} · ${order.date}`}
        action={<StatusBadge status={status} />}
      />

      {notified ? (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-chart-3/40 bg-chart-3/10 px-4 py-3 text-sm text-chart-3">
          <Check className="size-4" />
          Customer notified that the order is now &ldquo;{status}&rdquo;.
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Update order status</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {orderStatusSteps.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setStatus(s)
                    setNotified(false)
                  }}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                    status === s
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-secondary',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 border-t border-border pt-4">
              <Button onClick={() => setNotified(true)}>
                <Bell className="size-4" />
                Notify customer
              </Button>
              <Button variant="outline" onClick={() => setNotified(true)}>
                <Check className="size-4" />
                Save status
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Order details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {order.items.map((item) => (
              <div key={item.name} className="flex justify-between text-sm">
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
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Payment</span>
              <Badge
                className={cn(
                  order.paymentStatus === 'Paid'
                    ? 'bg-chart-3/20 text-chart-3'
                    : 'bg-destructive/15 text-destructive',
                )}
              >
                {order.paymentStatus}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
