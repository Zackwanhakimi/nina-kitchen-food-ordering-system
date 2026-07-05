'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label, Textarea } from '@/components/ui/label'
import { PageHeader } from '@/components/page-header'
import type { MenuItem } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const categories = ['Mains', 'Noodles', 'Sides', 'Dessert'] as const

export function MenuItemForm({ item }: { item?: MenuItem }) {
  const isEdit = Boolean(item)
  const [category, setCategory] = useState(item?.category ?? 'Mains')
  const [available, setAvailable] = useState(item?.available ?? true)
  const [saved, setSaved] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        render={<Link href="/owner/menu" />}
      >
        <ArrowLeft className="size-4" />
        Back to menu
      </Button>

      <PageHeader
        title={isEdit ? `Edit ${item?.name}` : 'Create menu item'}
        description={
          isEdit
            ? 'Update the details of this dish.'
            : 'Add a new dish to your menu.'
        }
      />

      {saved ? (
        <div className="mb-6 rounded-lg border border-chart-3/40 bg-chart-3/10 px-4 py-3 text-sm text-chart-3">
          Menu item {isEdit ? 'updated' : 'created'} successfully.
        </div>
      ) : null}

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Item details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Dish name</Label>
            <Input
              id="name"
              defaultValue={item?.name}
              placeholder="e.g. Nasi Lemak"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              defaultValue={item?.description}
              placeholder="Describe the dish..."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="price">Price (RM)</Label>
              <Input
                id="price"
                type="number"
                step="0.10"
                defaultValue={item?.price}
                placeholder="0.00"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Category</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={cn(
                      'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                      category === c
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-secondary',
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="font-medium text-foreground">Available</p>
              <p className="text-sm text-muted-foreground">
                Toggle whether customers can order this item.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAvailable((a) => !a)}
              className={cn(
                'relative h-6 w-11 rounded-full transition-colors',
                available ? 'bg-primary' : 'bg-muted',
              )}
              aria-pressed={available}
              aria-label="Toggle availability"
            >
              <span
                className={cn(
                  'absolute top-0.5 size-5 rounded-full bg-background transition-transform',
                  available ? 'translate-x-5' : 'translate-x-0.5',
                )}
              />
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={() => setSaved(true)}>
              <Check className="size-4" />
              {isEdit ? 'Save changes' : 'Create item'}
            </Button>
            <Button variant="outline" render={<Link href="/owner/menu" />}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
