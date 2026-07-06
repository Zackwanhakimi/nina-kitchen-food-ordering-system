'use client'

import { useState } from 'react'
import { User, Check, Plus, Trash2, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/page-header'
import { customerProfile } from '@/lib/mock-data'

type Address = {
  id: string
  label: string
  address: string
  isDefault: boolean
}

export default function CustomerAccountPage() {
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Home',
      address: customerProfile.address,
      isDefault: true,
    },
  ])
  const [editingAddress, setEditingAddress] = useState<string | null>(null)
  const [newAddressLabel, setNewAddressLabel] = useState('')
  const [newAddressText, setNewAddressText] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  const addAddress = () => {
    if (newAddressLabel && newAddressText) {
      setAddresses((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          label: newAddressLabel,
          address: newAddressText,
          isDefault: false,
        },
      ])
      setNewAddressLabel('')
      setNewAddressText('')
      setShowAddForm(false)
    }
  }

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id))
  }

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    )
  }

  return (
    <>
      <PageHeader
        title="My Account"
        description="View and update your personal details."
        action={
          editing ? (
            <Button
              onClick={() => {
                setEditing(false)
                setSaved(true)
              }}
            >
              <Check className="size-4" />
              Save changes
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setEditing(true)}>
              Edit profile
            </Button>
          )
        }
      />

      {saved ? (
        <div className="mb-6 rounded-lg border border-chart-3/40 bg-chart-3/10 px-4 py-3 text-sm text-chart-3">
          Your profile has been updated successfully.
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="h-fit">
          <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
            <span className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="size-9" />
            </span>
            <div>
              <p className="font-serif text-lg font-bold text-foreground">
                {customerProfile.name}
              </p>
              <p className="text-sm text-muted-foreground">
                Member since {customerProfile.joined}
              </p>
            </div>
            <Badge className="bg-accent/20 text-accent-foreground">
              {customerProfile.memberTier} Member
            </Badge>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                defaultValue={customerProfile.name}
                disabled={!editing}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={customerProfile.email}
                disabled={!editing}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                defaultValue={customerProfile.phone}
                disabled={!editing}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Delivery Addresses</CardTitle>
          <Button
            size="sm"
            onClick={() => setShowAddForm(!showAddForm)}
            variant={showAddForm ? 'outline' : 'default'}
          >
            <Plus className="size-4" />
            Add address
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {showAddForm && (
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <div className="flex flex-col gap-3">
                <div>
                  <Label htmlFor="label">Address label</Label>
                  <Input
                    id="label"
                    placeholder="e.g., Home, Office"
                    value={newAddressLabel}
                    onChange={(e) => setNewAddressLabel(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="address-text">Full address</Label>
                  <Input
                    id="address-text"
                    placeholder="Street address, city, postal code"
                    value={newAddressText}
                    onChange={(e) => setNewAddressText(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={addAddress}
                    disabled={!newAddressLabel || !newAddressText}
                  >
                    Save address
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false)
                      setNewAddressLabel('')
                      setNewAddressText('')
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="flex items-start justify-between rounded-lg border border-border p-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">
                      {addr.label}
                    </h4>
                    {addr.isDefault && (
                      <Badge variant="outline" className="text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {addr.address}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!addr.isDefault && (
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => setDefaultAddress(addr.id)}
                      title="Set as default"
                    >
                      <Check className="size-4" />
                    </Button>
                  )}
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    onClick={() => deleteAddress(addr.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
