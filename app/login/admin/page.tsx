import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthShell } from '@/components/auth-shell'

export default function AdminLoginPage() {
  return (
    <AuthShell
      title="Administrator Login"
      subtitle="Log in to manage orders and kitchen operations."
    >
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="admin@example.com" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/login/admin"
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>

        <Button size="lg" className="mt-2 w-full" render={<Link href="/owner" />}>
          Log in as Administrator
        </Button>
      </form>

      <div className="mt-6 space-y-4">
        <div className="border-t border-border pt-4">
          <p className="text-center text-xs text-muted-foreground mb-3">
            Are you a customer?
          </p>
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            render={<Link href="/login/customer" />}
          >
            Customer login
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
