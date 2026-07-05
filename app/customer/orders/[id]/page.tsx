import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, CircleDot } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import { orders, orderStatusSteps } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default async function OrderTrackingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const order =
    orders.find((o) => o.id === id) ??
    // fall back to a synthetic just-placed order for the checkout demo
    (id === 'NK-1043'
      ? {
          id: 'NK-1043',
          customer: 'Aisha Rahman',
          date: '2026-07-05 12:40',
          items: [
            { name: 'Nasi Lemak', quantity: 2, price: 12.9 },
            { name: 'Chicken Satay', quantity: 1, price: 10.5 },
          ],
          total: 40.3,
          status: 'Confirmed' as const,
          paymentStatus: 'Paid' as const,
        }
      : undefined)

  if (!order) notFound()

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
              {orderStatusSteps.map((step, index) => {
                const done = index < currentIndex
                const active = index === currentIndex
                return (
                  <li key={step} className="flex items-start gap-4">
                    <span
                      className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-full border',
                        done && 'border-chart-3 bg-chart-3/20 text-chart-3',
                        active &&
                          'border-primary bg-primary text-primary-foreground',
                        !done &&
                          !active &&
                          'border-border bg-muted text-muted-foreground',
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
                        {step}
                      </p>
                      {active ? (
                        <p className="text-sm text-muted-foreground">
                          Your order is currently at this stage.
                        </p>
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
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {order.items.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between text-sm"
                >
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
                <span
                  className={cn(
                    'font-medium',
                    order.paymentStatus === 'Paid'
                      ? 'text-chart-3'
                      : 'text-destructive',
                  )}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </CardContent>
          </Card>

          {order.paymentStatus === 'Unpaid' ? (
            <Button size="lg" render={<Link href="/customer/checkout" />}>
              Make payment
            </Button>
          ) : (
            <Button
              variant="outline"
              size="lg"
              render={<Link href="/customer/payments" />}
            >
              View payment
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
