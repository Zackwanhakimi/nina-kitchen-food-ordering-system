import { Badge } from '@/components/ui/badge'
import { statusColor, type OrderStatus } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export function StatusBadge({ status }: { status: OrderStatus }) {
  return <Badge className={cn(statusColor(status))}>{status}</Badge>
}
