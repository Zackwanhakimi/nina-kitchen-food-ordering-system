import { notFound } from 'next/navigation'
import { MenuItemForm } from '@/components/menu-item-form'
import { menuItems } from '@/lib/mock-data'

export default async function EditMenuItemPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = menuItems.find((m) => m.id === id)
  if (!item) notFound()
  return <MenuItemForm item={item} />
}
