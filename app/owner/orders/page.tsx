import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import { orders } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function OwnerOrdersPage() {
  return (
    <>
      <PageHeader
        title="Orders"
        description="Manage incoming orders and update their status."
      />

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-serif font-semibold text-foreground">
                    {order.id}
                  </span>
                  <StatusBadge status={order.status} />
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
                <p className="text-sm text-muted-foreground">
                  {order.customer} · {order.date}
                </p>
                <p className="text-sm text-muted-foreground">
                  {order.items
                    .map((i) => `${i.quantity}× ${i.name}`)
                    .join(', ')}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-foreground">
                  RM {order.total.toFixed(2)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  render={<Link href={`/owner/orders/${order.id}`} />}
                >
                  Manage
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
