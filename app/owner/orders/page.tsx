'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight, Search, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import { orders, type OrderStatus } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function OwnerOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'All'>('All')

  const statuses: (OrderStatus | 'All')[] = [
    'All',
    'Pending',
    'Confirmed',
    'Preparing',
    'Ready',
    'Out for delivery',
    'Completed',
    'Cancelled',
  ]

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        searchQuery === '' ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus

      const matchesDate =
        selectedDate === '' || order.date.startsWith(selectedDate)

      return matchesSearch && matchesStatus && matchesDate
    })
  }, [searchQuery, selectedStatus, selectedDate])

  return (
    <>
      <PageHeader
        title="All Orders"
        description="View and manage all orders."
      />

      <div className="space-y-4 mb-6">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by order ID or customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="date">Filter by date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Filter by status</Label>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={cn(
                      'rounded-full px-3 py-1 text-sm font-medium transition-colors',
                      selectedStatus === status
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-secondary',
                    )}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {(searchQuery || selectedDate || selectedStatus !== 'All') && (
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-3 text-sm">
            <p className="text-muted-foreground">
              {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}{' '}
              found
            </p>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setSearchQuery('')
                setSelectedDate('')
                setSelectedStatus('All')
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>

      {filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No orders found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredOrders.map((order) => (
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
      )}
    </>
  )
}
