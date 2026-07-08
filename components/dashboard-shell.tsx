'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UtensilsCrossed, LogOut } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useNotifications } from '@/lib/store'

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
}

type DashboardShellProps = {
  role: 'Customer' | 'Business Owner' | 'Administrator'
  userName: string
  navItems: NavItem[]
  children: React.ReactNode
}

export function DashboardShell({
  role,
  userName,
  navItems,
  children,
}: DashboardShellProps) {
  const pathname = usePathname()
  const [notifications] = useNotifications()
  const audience = role === 'Customer' ? 'customer' : 'admin'
  const unreadCount = notifications.filter(
    (n) => !n.read && (n.audience === 'both' || n.audience === audience),
  ).length

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <img src="/logo-kedai.jpg" alt="Nina Kitchen" />
          </span>
          <span className="font-serif text-lg font-bold">Nina Kitchen</span>
        </div>
        <div className="px-5 py-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {role}
          </p>
          <p className="mt-1 font-semibold text-sidebar-foreground">{userName}</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/customer' &&
                item.href !== '/owner' &&
                pathname.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent',
                )}
              >
                <Icon className="size-4" />
                <span className="flex items-center gap-2">
                  {item.label}
                  {item.href.includes('/notifications') && unreadCount > 0 ? (
                    <span className="ml-2 relative inline-flex">
                      <span className="absolute inset-0 flex items-center justify-center rounded-full bg-destructive" />
                      <span className="relative inline-flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs w-5 h-5">{unreadCount}</span>
                    </span>
                  ) : null}
                </span>
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            render={<Link href="/" />}
          >
            <LogOut className="size-4" />
            Log out
          </Button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        {/* Mobile top nav */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-border bg-sidebar px-3 py-2 md:hidden">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'shrink-0 rounded-full px-3 py-1.5 text-xs font-medium',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
