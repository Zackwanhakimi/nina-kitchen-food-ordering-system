'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import { orders as mockOrders } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { Check, ChevronRight, Trash2, Edit2, X } from 'lucide-react'

type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Preparing'
  | 'Ready'
  | 'Out for delivery'
  | 'Completed'
  | 'Cancelled'

type DeleteConfirmation = {
  orderId: string | null
}

export default function LiveOrdersPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirmation>({
    orderId: null,
  })

  const pendingOrders = orders.filter(
    (o) => o.status === 'Pending' || o.status === 'Confirmed' || o.status === 'Preparing'
  )

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    )
    setEditingId(null)
  }

  const confirmCancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Cancelled' } : o))
    )
    setDeleteConfirm({ orderId: null })
  }

  const getNextStatus = (current: OrderStatus): OrderStatus => {
    const statusFlow: Record<OrderStatus, OrderStatus> = {
      Pending: 'Confirmed',
      Confirmed: 'Preparing',
      Preparing: 'Ready',
      Ready: 'Completed',
      'Out for delivery': 'Completed',
      Completed: 'Completed',
      Cancelled: 'Cancelled',
    }
    return statusFlow[current]
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
            <p className="text-sm text-muted-foreground">Pending & Preparing</p>
            <p className="font-serif text-2xl font-bold text-foreground">
              {orders.filter((o) => o.status === 'Pending' || o.status === 'Preparing').length}
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
                  ) : editingId === order.id ? (
                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value as OrderStatus)
                        }
                        className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Ready">Ready</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingId(null)}
                      >
                        Done
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          updateOrderStatus(order.id, getNextStatus(order.status))
                        }
                        className="gap-1"
                      >
                        <Check className="size-4" />
                        Mark ready
                      </Button>
                      <Button
                        size="icon-sm"
                        variant="outline"
                        onClick={() => setEditingId(order.id)}
                        title="Edit status"
                      >
                        <Edit2 className="size-4" />
                      </Button>
                      <Button
                        size="icon-sm"
                        variant="destructive"
                        onClick={() => setDeleteConfirm({ orderId: order.id })}
                        title="Cancel order"
                      >
                        <X className="size-4" />
                      </Button>
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
