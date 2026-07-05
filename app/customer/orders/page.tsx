import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import { orders, customerProfile } from '@/lib/mock-data'

export default function CustomerOrdersPage() {
  const myOrders = orders.filter((o) => o.customer === customerProfile.name)

  return (
    <>
      <PageHeader
        title="Order History"
        description="View your past and current orders."
        action={
          <Button render={<Link href="/customer/menu" />}>New order</Button>
        }
      />

      <div className="flex flex-col gap-4">
        {myOrders.map((order) => (
          <Card key={order.id}>
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <span className="font-serif font-semibold text-foreground">
                    {order.id}
                  </span>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {order.date} ·{' '}
                  {order.items.map((i) => `${i.quantity}× ${i.name}`).join(', ')}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-foreground">
                  RM {order.total.toFixed(2)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  render={<Link href={`/customer/orders/${order.id}`} />}
                >
                  Details
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
