'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { UtensilsCrossed, ClipboardList, CreditCard, ArrowRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import { customerProfile, menuItems } from '@/lib/mock-data'
import { useOrders, useNotifications } from '@/lib/store'

export default function CustomerDashboard() {
  const [orders, setOrders] = useOrders()
  const myOrders = useMemo(
    () => orders.filter((o) => o.customer === customerProfile.name),
    [orders],
  )
  const activeOrder = myOrders.find(
    (o) => o.status !== 'Completed' && o.status !== 'Cancelled',
  )
  const [isManageOpen, setIsManageOpen] = useState(false)

  const requestCancellation = () => {
    if (!activeOrder) return
    setOrders((prev) =>
      prev.map((o) =>
        o.id === activeOrder.id
          ? { ...o, cancellationRequested: true }
          : o,
      ),
    )
  }
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

  const [notifications] = useNotifications()
  const myNotifications = notifications.filter((n) => !n.read && (n.audience === 'both' || n.audience === 'customer'))

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
        <div className="sm:col-span-3">
          <Card>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">Unread notifications</p>
                <p className="font-serif text-xl font-bold text-foreground">{myNotifications.length}</p>
              </div>
              <div>
                <Button render={<Link href="/customer/notifications" />}>View</Button>
              </div>
            </CardContent>
          </Card>
        </div>
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
              Pickup scheduled for {activeOrder.pickupDateTime}. {activeOrder.status === 'Pending' ? 'Awaiting admin confirmation.' : activeOrder.status === 'Confirmed' ? 'Confirmed by admin. Waiting to start preparing.' : 'Track the progress below.'}
            </p>
            {activeOrder.cancellationRequested ? (
              <p className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                Cancellation request sent. Admin will review it.
              </p>
            ) : null}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">
                RM {activeOrder.total.toFixed(2)}
              </span>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsManageOpen(true)}>
                  Manage order
                </Button>
                <Button
                  variant="outline"
                  render={<Link href={`/customer/orders/${activeOrder.id}`} />}
                >
                  Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {isManageOpen && activeOrder ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-2xl">
            <div className="flex items-center justify-between border-b border-border p-5">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Manage order</h2>
                <p className="text-sm text-muted-foreground">Order {activeOrder.id}</p>
              </div>
              <button
                onClick={() => setIsManageOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-3">
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">Pickup date</p>
                    <p className="font-medium text-foreground">{activeOrder.pickupDateTime}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Order timeline</p>
                  <div className="space-y-3">
                    {activeOrder.statusHistory.map((step) => (
                      <div key={`${step.status}-${step.date}`} className="rounded-lg border border-border p-4">
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-semibold text-foreground">{step.status}</span>
                          <span className="text-sm text-muted-foreground">{step.date}</span>
                        </div>
                        {step.note ? (
                          <p className="text-sm text-muted-foreground mt-2">{step.note}</p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {['Pending', 'Confirmed'].includes(activeOrder.status) && !activeOrder.cancellationRequested ? (
                <Button variant="destructive" onClick={requestCancellation}>
                  Request cancellation
                </Button>
              ) : null}
              {activeOrder.status === 'Preparing' || activeOrder.status === 'Ready' ? (
                <p className="text-sm text-muted-foreground">
                  Cancellation is no longer permitted once preparation has started.
                </p>
              ) : null}
            </CardContent>
          </Card>
        </div>
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
            <div className="relative aspect-[2/3] w-full">
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
