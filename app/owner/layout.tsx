'use client'

import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  BarChart3,
  Clock,
} from 'lucide-react'
import { DashboardShell, type NavItem } from '@/components/dashboard-shell'

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/owner', icon: LayoutDashboard },
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
