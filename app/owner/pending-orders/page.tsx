'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import { useOrders } from '@/lib/store'
import { cn } from '@/lib/utils'

export default function OwnerPendingOrdersPage() {
  const [orders, setOrders] = useOrders()
  const [declineId, setDeclineId] = useState<string | null>(null)
  const [declineNote, setDeclineNote] = useState('')

  const pendingOrders = useMemo(
    () => orders.filter((order) => order.status === 'Pending'),
    [orders],
  )

  const confirmOrder = (orderId: string) => {
    const now = new Date()
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate(),
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: 'Confirmed',
              statusHistory: [
                ...order.statusHistory,
                { status: 'Confirmed', date: timestamp },
              ],
            }
          : order,
      ),
    )
  }

  const declineOrder = (orderId: string) => {
    const now = new Date()
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate(),
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: 'Declined',
              adminNote: declineNote,
              statusHistory: [
                ...order.statusHistory,
                { status: 'Declined', date: timestamp, note: declineNote },
              ],
            }
          : order,
      ),
    )
    setDeclineId(null)
    setDeclineNote('')
  }

  return (
    <>
      <PageHeader
        title="Pending orders"
        description="Review preorders and confirm or decline them before kitchen preparation."
      />

      {pendingOrders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No pending orders at the moment.</p>
            <Button className="mt-4" render={<Link href="/owner/live-orders" />}>
              View live orders
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {pendingOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex-row items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-serif text-lg font-semibold text-foreground">
                      {order.id}
                    </span>
                    <StatusBadge status={order.status} />
                    {order.cancellationRequested ? (
                      <Badge className="bg-destructive/15 text-destructive">
                        Cancellation requested
                      </Badge>
                    ) : null}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {order.customer} · Pickup {order.pickupDateTime}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  render={<Link href={`/owner/orders/${order.id}`} />}
                >
                  <ArrowLeft className="size-4 rotate-180" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  {order.items.map((item) => (
                    <div key={`${item.name}-${item.quantity}`} className="flex justify-between">
                      <span>{item.quantity}× {item.name}</span>
                      <span>RM {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">RM {order.total.toFixed(2)}</span>
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" onClick={() => confirmOrder(order.id)}>
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setDeclineId(order.id)}
                    >
                      Decline
                    </Button>
                  </div>
                </div>
                {declineId === order.id ? (
                  <div className="space-y-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">Reason for declining</p>
                        <p className="text-xs text-muted-foreground">
                          This note will be visible to the customer.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setDeclineId(null)
                          setDeclineNote('')
                        }}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <textarea
                      value={declineNote}
                      onChange={(event) => setDeclineNote(event.target.value)}
                      placeholder="Enter reason for declining the order"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        disabled={!declineNote.trim()}
                        variant="destructive"
                        onClick={() => declineOrder(order.id)}
                      >
                        Confirm decline
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setDeclineId(null)
                          setDeclineNote('')
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
