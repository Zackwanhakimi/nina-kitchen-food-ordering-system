import { notFound } from 'next/navigation'
import { OwnerOrderManager } from '@/components/owner-order-manager'
import { orders } from '@/lib/mock-data'

export default async function OwnerOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const order = orders.find((o) => o.id === id)
  if (!order) notFound()
  return <OwnerOrderManager order={order} />
}
