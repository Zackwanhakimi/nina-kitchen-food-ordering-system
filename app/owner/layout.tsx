'use client'

import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  BarChart3,
  Clock,
  Bell,
} from 'lucide-react'
import { DashboardShell, type NavItem } from '@/components/dashboard-shell'

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/owner', icon: LayoutDashboard },
  { label: 'Notifications', href: '/owner/notifications', icon: Bell },
  { label: 'Pending orders', href: '/owner/pending-orders', icon: Clock },
  { label: 'Live Orders', href: '/owner/live-orders', icon: Clock },
  { label: 'Menu Management', href: '/owner/menu', icon: UtensilsCrossed },
  { label: 'Orders', href: '/owner/orders', icon: ClipboardList },
  { label: 'Reports', href: '/owner/reports', icon: BarChart3 },
]

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardShell role="Administrator" userName="Nina Ismail" navItems={navItems}>
      {children}
    </DashboardShell>
  )
}
