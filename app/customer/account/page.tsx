'use client'

import { useState } from 'react'
import { User, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/page-header'
import { customerProfile } from '@/lib/mock-data'

export default function CustomerAccountPage() {
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)

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
            <div className="flex flex-col gap-2 sm:col-span-2">
              <Label htmlFor="address">Delivery address</Label>
              <Input
                id="address"
                defaultValue={customerProfile.address}
                disabled={!editing}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
