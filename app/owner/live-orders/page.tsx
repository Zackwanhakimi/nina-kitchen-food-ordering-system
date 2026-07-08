'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import { useOrders } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { useNotifications } from '@/lib/store'

type DeleteConfirmation = {
  orderId: string | null
}

export default function LiveOrdersPage() {
  const [orders, setOrders] = useOrders()
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirmation>({
    orderId: null,
  })

  const pendingOrders = useMemo(
    () => orders.filter((o) => o.status === 'Confirmed' || o.status === 'Preparing' || o.status === 'Ready'),
    [orders],
  )

  const updateOrderStatus = (orderId: string, newStatus: 'Confirmed' | 'Preparing' | 'Ready' | 'Completed') => {
    const now = new Date()
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate(),
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: newStatus,
              statusHistory: [
                ...o.statusHistory,
                { status: newStatus, date: timestamp },
              ],
            }
          : o,
      ),
    )
  }

  const [notifications, setNotifications] = useNotifications()

  const sendNotification = (orderId: string, audience: 'customer' | 'admin' | 'both' = 'customer') => {
    const now = new Date()
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate(),
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    const id = `N-${Math.floor(1000 + Math.random() * 9000)}`
    const notif = {
      id,
      title: `Update for ${orderId}`,
      message: `Admin sent an update regarding ${orderId}.`,
      date,
      read: false,
      orderId,
      audience,
    }
    setNotifications((prev) => [notif, ...prev])
  }

  const confirmCancelOrder = (orderId: string) => {
    const now = new Date()
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate(),
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'Cancelled',
              statusHistory: [
                ...o.statusHistory,
                { status: 'Cancelled', date: timestamp },
              ],
            }
          : o,
      ),
    )
    setDeleteConfirm({ orderId: null })
  }

  return (
    <>
      <PageHeader
        title="Live Order Queue"
        description={`${pendingOrders.length} active order${pendingOrders.length !== 1 ? 's' : ''}`}
      />

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Confirmed & Preparing</p>
            <p className="font-serif text-2xl font-bold text-foreground">
              {orders.filter((o) => o.status === 'Confirmed' || o.status === 'Preparing').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Ready for pickup</p>
            <p className="font-serif text-2xl font-bold text-foreground">
              {orders.filter((o) => o.status === 'Ready').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {pendingOrders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No active orders at the moment</p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {pendingOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-serif text-lg font-semibold text-foreground">
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
                  <p className="text-sm text-muted-foreground mb-2">
                    {order.customer} · {order.date}
                  </p>
                  <div className="space-y-1">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="text-sm text-foreground">
                        {item.quantity}× {item.name} (RM {item.price.toFixed(2)})
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:items-end">
                  <span className="font-semibold text-foreground">
                    RM {order.total.toFixed(2)}
                  </span>

                  {deleteConfirm.orderId === order.id ? (
                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                      <p className="text-xs text-muted-foreground text-right">
                        Cancel order?
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setDeleteConfirm({ orderId: null })}
                        >
                          No
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => confirmCancelOrder(order.id)}
                        >
                          Yes, cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                      {order.status === 'Confirmed' ? (
                        <Button
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, 'Preparing')}
                          className="gap-1"
                        >
                          <Check className="size-4" />
                          Start preparing
                        </Button>
                      ) : order.status === 'Preparing' ? (
                        <Button
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, 'Ready')}
                          className="gap-1"
                        >
                          <Check className="size-4" />
                          Ready for pickup
                        </Button>
                      ) : order.status === 'Ready' ? (
                        order.fulfillment === 'Delivery' ? (
                          <div className="flex flex-col gap-2">
                            <Button
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'Out for delivery')}
                              className="gap-1"
                            >
                              <Check className="size-4" />
                              Out for delivery
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'Completed')}
                              className="gap-1"
                            >
                              <Check className="size-4" />
                              Mark as complete
                            </Button>
                          </div>
                        ) : (
                        <Button
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, 'Completed')}
                          className="gap-1"
                        >
                          <Check className="size-4" />
                          Mark as complete
                        </Button>
                        )
                      ) : null}
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => sendNotification(order.id, 'customer')}
                        >
                          Send notification
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setDeleteConfirm({ orderId: order.id })}
                        >
                          Cancel order
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {deleteConfirm.orderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-sm">
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Cancel order?
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Are you sure you want to cancel this order? This action cannot be
                undone.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setDeleteConfirm({ orderId: null })}
                >
                  Keep order
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() =>
                    deleteConfirm.orderId && confirmCancelOrder(deleteConfirm.orderId)
                  }
                >
                  Cancel order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
