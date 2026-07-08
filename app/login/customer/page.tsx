import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthShell } from '@/components/auth-shell'

export default function CustomerLoginPage() {
  return (
    <AuthShell
      title="Customer Login"
      subtitle="Log in to order delicious meals from Ayam Gepuk Nina Kitchen."
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
              href="/login/customer"
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>

        <Button size="lg" className="mt-2 w-full" render={<Link href="/customer" />}>
          Log in
        </Button>
      </form>

      <div className="mt-6 space-y-4">
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Create one
          </Link>
        </p>

        <div className="border-t border-border pt-4">
          <p className="text-center text-xs text-muted-foreground mb-3">
            Are you an administrator?
          </p>
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            render={<Link href="/login/admin" />}
          >
            Administrator login
          </Button>
        </div>

        <Button
          size="sm"
          variant="ghost"
          className="w-full mt-4"
          render={<Link href="/" />}
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to home
        </Button>
      </div>
    </AuthShell>
  )
}
