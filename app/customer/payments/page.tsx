import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/page-header'
import { payments } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function CustomerPaymentsPage() {
  const totalPaid = payments
    .filter((p) => p.status === 'Paid')
    .reduce((s, p) => s + p.amount, 0)

  return (
    <>
      <PageHeader
        title="Payments"
        description="Review your payment history and receipts."
      />

      <Card className="mb-6">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-muted-foreground">Total paid</p>
            <p className="font-serif text-2xl font-bold text-foreground">
              RM {totalPaid.toFixed(2)}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {payments.length} transactions
          </p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <div className="hidden grid-cols-5 gap-4 border-b border-border bg-muted/50 px-5 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground sm:grid">
          <span>Payment ID</span>
          <span>Order</span>
          <span>Date</span>
          <span>Method</span>
          <span className="text-right">Amount</span>
        </div>
        <div className="divide-y divide-border">
          {payments.map((p) => (
            <div
              key={p.id}
              className="grid gap-2 px-5 py-4 text-sm sm:grid-cols-5 sm:items-center sm:gap-4"
            >
              <span className="font-medium text-foreground">{p.id}</span>
              <span className="text-muted-foreground">{p.orderId}</span>
              <span className="text-muted-foreground">{p.date}</span>
              <span className="text-muted-foreground">{p.method}</span>
              <span className="flex items-center justify-between sm:justify-end sm:gap-3">
                <Badge
                  className={cn(
                    p.status === 'Paid'
                      ? 'bg-chart-3/20 text-chart-3'
                      : p.status === 'Refunded'
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-accent/20 text-accent-foreground',
                  )}
                >
                  {p.status}
                </Badge>
                <span className="font-semibold text-foreground">
                  RM {p.amount.toFixed(2)}
                </span>
              </span>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}
