'use client'

import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  CreditCard,
  User,
} from 'lucide-react'
import { DashboardShell, type NavItem } from '@/components/dashboard-shell'
import { customerProfile } from '@/lib/mock-data'

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/customer', icon: LayoutDashboard },
  { label: 'Menu', href: '/customer/menu', icon: UtensilsCrossed },
  { label: 'My Orders', href: '/customer/orders', icon: ClipboardList },
  { label: 'Payments', href: '/customer/payments', icon: CreditCard },
  { label: 'My Account', href: '/customer/account', icon: User },
]

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardShell
      role="Customer"
      userName={customerProfile.name}
      navItems={navItems}
    >
      {children}
    </DashboardShell>
  )
}
