import Link from 'next/link'
import {
  DollarSign,
  ClipboardList,
  Clock,
  UtensilsCrossed,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import { orders, menuItems } from '@/lib/mock-data'

export default function OwnerDashboard() {
  const revenue = orders
    .filter((o) => o.paymentStatus === 'Paid')
    .reduce((s, o) => s + o.total, 0)
  const pending = orders.filter(
    (o) => o.status === 'Pending' || o.status === 'Confirmed',
  ).length
  const active = orders.filter(
    (o) => o.status !== 'Completed' && o.status !== 'Cancelled',
  ).length

  const stats = [
    { label: 'Revenue', value: `RM ${revenue.toFixed(2)}`, icon: DollarSign },
    { label: 'Total orders', value: orders.length, icon: ClipboardList },
    { label: 'Pending', value: pending, icon: Clock },
    { label: 'Menu items', value: menuItems.length, icon: UtensilsCrossed },
  ]

  const recent = orders.slice(0, 4)

  return (
    <>
      <PageHeader
        title="Kitchen Dashboard"
        description="Overview of your orders, menu and revenue."
        action={
          <Button render={<Link href="/owner/menu/new" />}>Add menu item</Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="font-serif text-xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="mt-6">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Recent orders</CardTitle>
          <Link
            href="/owner/orders"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </CardHeader>
        <CardContent className="flex flex-col divide-y divide-border">
          {recent.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">
                    {order.id}
                  </span>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {order.customer} · RM {order.total.toFixed(2)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                render={<Link href={`/owner/orders/${order.id}`} />}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}
