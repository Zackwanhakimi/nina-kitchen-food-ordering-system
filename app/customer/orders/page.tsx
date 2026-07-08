'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Printer, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { StatusBadge } from '@/components/status-badge'
import { orders, customerProfile } from '@/lib/mock-data'

type ReceiptModal = {
  isOpen: boolean
  orderId: string | null
}

export default function CustomerOrdersPage() {
  const [modal, setModal] = useState<ReceiptModal>({ isOpen: false, orderId: null })
  const myOrders = orders.filter((o) => o.customer === customerProfile.name)
  const selectedOrder = modal.orderId ? orders.find((o) => o.id === modal.orderId) : null

  const handlePrint = () => {
    window.print()
  }

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
                  {order.date} · Pickup {order.pickupDateTime} ·{' '}
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
                  onClick={() => setModal({ isOpen: true, orderId: order.id })}
                >
                  View receipt
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
                      Preorder date
                    </p>
                    <p className="font-semibold text-foreground">
                      {selectedOrder.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">
                      Pickup date
                    </p>
                    <p className="font-semibold text-foreground">
                      {selectedOrder.pickupDateTime}
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
