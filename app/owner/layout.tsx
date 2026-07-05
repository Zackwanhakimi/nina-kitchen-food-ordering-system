'use client'

import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  BarChart3,
} from 'lucide-react'
import { DashboardShell, type NavItem } from '@/components/dashboard-shell'

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/owner', icon: LayoutDashboard },
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
    <DashboardShell role="Business Owner" userName="Nina Ismail" navItems={navItems}>
      {children}
    </DashboardShell>
  )
}
