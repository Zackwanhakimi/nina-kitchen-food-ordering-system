'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'
import { useNotifications } from '@/lib/store'

export default function OwnerNotificationsPage() {
  const [notifications, setNotifications] = useNotifications()

  const myNotifications = useMemo(
    () => notifications.filter((n) => n.audience === 'both' || n.audience === 'admin'),
    [notifications],
  )

  const toggleRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)))
  }

  return (
    <>
      <PageHeader title="Notifications" description="System and order notifications for admins." />

      <div className="flex flex-col gap-4">
        {myNotifications.map((n) => (
          <Card key={n.id}>
            <CardHeader>
              <CardTitle>{n.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{n.date}</p>
              <p className="mt-2">{n.message}</p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" onClick={() => toggleRead(n.id)}>
                  {n.read ? 'Mark unread' : 'Mark read'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
