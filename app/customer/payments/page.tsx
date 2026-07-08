'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { orders } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { Printer, X } from 'lucide-react'

type ReceiptModal = {
  isOpen: boolean
  orderId: string | null
}

export default function CustomerReceiptsPage() {
  const [modal, setModal] = useState<ReceiptModal>({ isOpen: false, orderId: null })

  const completedOrders = orders.filter((o) => o.status === 'Completed')
  const totalAmount = completedOrders.reduce((s, o) => s + o.total, 0)

  const selectedOrder = modal.orderId
    ? orders.find((o) => o.id === modal.orderId)
    : null

  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <PageHeader
        title="Receipts"
        description="View and print your order receipts."
      />

      <Card className="mb-6">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-muted-foreground">Total spent</p>
            <p className="font-serif text-2xl font-bold text-foreground">
              RM {totalAmount.toFixed(2)}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {completedOrders.length} completed orders
          </p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <div className="hidden grid-cols-5 gap-4 border-b border-border bg-muted/50 px-5 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground sm:grid">
          <span>Order ID</span>
          <span>Date</span>
          <span>Items</span>
          <span className="text-right">Total</span>
          <span className="text-right">Action</span>
        </div>
        <div className="divide-y divide-border">
          {completedOrders.map((order) => (
            <div
              key={order.id}
              className="grid gap-2 px-5 py-4 text-sm sm:grid-cols-5 sm:items-center sm:gap-4"
            >
              <span className="font-medium text-foreground">{order.id}</span>
              <span className="text-muted-foreground">{order.date}</span>
              <span className="text-muted-foreground">
                {order.items.length} item{order.items.length > 1 ? 's' : ''}
              </span>
              <span className="font-semibold text-foreground">
                RM {order.total.toFixed(2)}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setModal({ isOpen: true, orderId: order.id })}
                className="justify-self-end"
              >
                View receipt
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {modal.isOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between border-b border-border p-5">
              <h2 className="text-xl font-semibold text-foreground">
                Receipt - Order {selectedOrder.id}
              </h2>
              <button
                onClick={() => setModal({ isOpen: false, orderId: null })}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <CardContent className="p-6 print:p-0">
              <div className="space-y-6 print:space-y-4">
                <div className="text-center border-b border-border pb-4 print:pb-2">
                  <h1 className="font-serif text-2xl font-bold text-foreground">
                    Ayam Gepuk Nina Kitchen
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Jalan Merlimau Utama, Taman Merlimau Utama
                  </p>
                  <p className="text-sm text-muted-foreground">
                    77300 Merlimau, Melaka
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">
                      Receipt Number
                    </p>
                    <p className="font-semibold text-foreground">
                      {selectedOrder.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">
                      Date
                    </p>
                    <p className="font-semibold text-foreground">
                      {selectedOrder.date}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 border-y border-border py-4">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-foreground">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-semibold text-foreground">
                        RM {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-foreground">Total:</span>
                  <span className="font-serif text-2xl font-bold text-primary">
                    RM {selectedOrder.total.toFixed(2)}
                  </span>
                </div>

                <div className="text-center border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground">
                    Thank you for your order!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Operation hours: 11:00 AM - 7:00 PM (Closed Sundays)
                  </p>
                </div>
              </div>
            </CardContent>

            <div className="flex gap-3 border-t border-border p-5 print:hidden">
              <Button
                onClick={handlePrint}
                className="flex-1"
              >
                <Printer className="size-4" />
                Print receipt
              </Button>
              <Button
                variant="outline"
                onClick={() => setModal({ isOpen: false, orderId: null })}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
