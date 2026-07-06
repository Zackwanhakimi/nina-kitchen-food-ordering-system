'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthShell } from '@/components/auth-shell'

function LoginContent() {
  const searchParams = useSearchParams()
  const role = searchParams.get('role') || 'customer'

  const isAdmin = role === 'admin'

  return (
    <AuthShell
      title={isAdmin ? 'Administrator Login' : 'Welcome back'}
      subtitle={
        isAdmin
          ? 'Log in to manage your kitchen and orders.'
          : 'Log in to order food.'
      }
    >
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/login"
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>

        <Button
          size="lg"
          className="mt-2 w-full"
          render={<Link href={isAdmin ? '/owner' : '/customer'} />}
        >
          {isAdmin ? 'Log in as Administrator' : 'Log in as Customer'}
        </Button>

        {!isAdmin && (
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            render={<Link href="/login?role=admin" />}
          >
            Log in as Administrator
          </Button>
        )}

        {isAdmin && (
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            render={<Link href="/login" />}
          >
            Log in as Customer
          </Button>
        )}
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Create one
        </Link>
      </p>
    </AuthShell>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<AuthShell title="Loading..." />}>
      <LoginContent />
    </Suspense>
  )
}
