import Link from 'next/link'
import Image from 'next/image'
import { UtensilsCrossed, ClipboardList, CreditCard, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import { menuItems, orders, customerProfile } from '@/lib/mock-data'

export default function CustomerDashboard() {
  const myOrders = orders.filter((o) => o.customer === customerProfile.name)
  const activeOrder = myOrders.find(
    (o) => o.status !== 'Completed' && o.status !== 'Cancelled',
  )
  const stats = [
    {
      label: 'Total orders',
      value: myOrders.length,
      icon: ClipboardList,
    },
    {
      label: 'Active order',
      value: activeOrder ? 1 : 0,
      icon: UtensilsCrossed,
    },
    {
      label: 'Total spent',
      value: `RM ${myOrders.reduce((s, o) => s + o.total, 0).toFixed(2)}`,
      icon: CreditCard,
    },
  ]

  return (
    <>
      <PageHeader
        title={`Welcome back, ${customerProfile.name.split(' ')[0]}`}
        description="Here's what's happening with your orders."
        action={
          <Button render={<Link href="/customer/menu" />}>
            Order food
            <ArrowRight className="size-4" />
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
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

      {activeOrder ? (
        <Card className="mt-6">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Active order · {activeOrder.id}</CardTitle>
            <StatusBadge status={activeOrder.status} />
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              {activeOrder.items
                .map((i) => `${i.quantity}× ${i.name}`)
                .join(', ')}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">
                RM {activeOrder.total.toFixed(2)}
              </span>
              <Button
                variant="outline"
                render={<Link href={`/customer/orders/${activeOrder.id}`} />}
              >
                Track order
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="mt-8 flex items-center justify-between">
        <h2 className="font-serif text-xl font-bold text-foreground">
          Popular dishes
        </h2>
        <Link
          href="/customer/menu"
          className="text-sm font-medium text-primary hover:underline"
        >
          View menu
        </Link>
      </div>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.slice(0, 3).map((item) => (
          <Card key={item.id} className="overflow-hidden pt-0">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={item.image || '/placeholder.svg'}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-semibold text-foreground">{item.name}</p>
                <p className="text-sm text-primary">
                  RM {item.price.toFixed(2)}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                render={<Link href="/customer/menu" />}
              >
                Add
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
