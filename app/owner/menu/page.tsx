import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/page-header'
import { menuItems } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function OwnerMenuPage() {
  return (
    <>
      <PageHeader
        title="Menu Management"
        description="Create, update and manage your dishes."
        action={
          <Button render={<Link href="/owner/menu/new" />}>
            <Plus className="size-4" />
            New item
          </Button>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <Card key={item.id} className="overflow-hidden pt-0">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={item.image || '/placeholder.svg'}
                alt={item.name}
                fill
                className="object-cover"
              />
              <Badge
                className={cn(
                  'absolute right-2 top-2',
                  item.available
                    ? 'bg-chart-3/90 text-primary-foreground'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                {item.available ? 'Available' : 'Sold out'}
              </Badge>
            </div>
            <CardContent className="flex flex-col gap-2 p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {item.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {item.category}
                  </span>
                </div>
                <span className="shrink-0 font-semibold text-primary">
                  RM {item.price.toFixed(2)}
                </span>
              </div>
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {item.description}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full"
                render={<Link href={`/owner/menu/${item.id}`} />}
              >
                <Pencil className="size-4" />
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
