import Link from 'next/link'
import { UtensilsCrossed } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <UtensilsCrossed className="size-5" />
          </span>
          <span className="font-serif text-xl font-bold text-foreground">
            Nina Kitchen
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/#menu" className="text-muted-foreground hover:text-foreground">
            Menu
          </Link>
          <Link href="/#about" className="text-muted-foreground hover:text-foreground">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="lg" render={<Link href="/login/customer" />}>
            Log in
          </Button>
          <Button size="lg" render={<Link href="/register" />}>
            Sign up
          </Button>
        </div>
      </div>
    </header>
  )
}
