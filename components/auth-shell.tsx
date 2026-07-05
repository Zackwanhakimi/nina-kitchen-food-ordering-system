import Link from 'next/link'
import Image from 'next/image'
import { UtensilsCrossed } from 'lucide-react'

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src="/images/hero-dish.png"
          alt="Home-cooked meal from Nina Kitchen"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/50" />
        <div className="absolute inset-0 flex flex-col justify-between p-10 text-primary-foreground">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/20">
              <UtensilsCrossed className="size-5" />
            </span>
            <span className="font-serif text-xl font-bold">Nina Kitchen</span>
          </Link>
          <blockquote className="max-w-sm">
            <p className="font-serif text-2xl leading-snug text-balance">
              &ldquo;Every dish is cooked fresh, with the warmth of a home
              kitchen.&rdquo;
            </p>
            <footer className="mt-3 text-sm text-primary-foreground/80">
              — Nina, Head Cook
            </footer>
          </blockquote>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <Link
            href="/"
            className="mb-8 flex items-center gap-2 lg:hidden"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <UtensilsCrossed className="size-5" />
            </span>
            <span className="font-serif text-xl font-bold text-foreground">
              Nina Kitchen
            </span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  )
}
