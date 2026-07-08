import Link from 'next/link'
import { Clock, MapPin, Phone, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4">
          <Button
            variant="ghost"
            size="icon"
            render={<Link href="/" />}
            title="Back to home"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="font-serif text-xl font-bold text-foreground">
            About Ayam Gepuk Nina Kitchen
          </h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-4 py-12">
        <div className="space-y-8">
          {/* Opening Hours - Highlighted */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Clock className="size-6 shrink-0 text-primary mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    Opening Hours
                  </h2>
                  <p className="text-foreground font-medium">
                    11:00 AM - 7:00 PM
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Closed on Sundays
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <MapPin className="size-6 shrink-0 text-primary mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    Location
                  </h2>
                  <p className="text-foreground">
                    Jalan Merlimau Utama
                    <br />
                    Taman Merlimau Utama
                    <br />
                    77300 Merlimau, Melaka
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Us */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground font-serif">
              Our Story
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Ayam Gepuk Nina Kitchen started as a business known as Nina Kitchen in
              BizBox Merlimau, selling various menu items including donuts, cake,
              and other Malaysian cuisines such as Kuih Muih and Pulut Kuning Set
              Rendang Ayam.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              On 22 March 2022, the restaurant in BizBox Merlimau was closed as the
              owner focused on handling the factory canteen while still handling
              custom orders and catering. Next, the restaurant rebranded as Ayam
              Gepuk Nina Kitchen on 15 December 2025 which focused on Ayam Gepuk
              dishes and opened for business at the current location.
            </p>
          </section>

          {/* What We Offer */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground font-serif">
              What We Offer
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The restaurant's primary operation is on-premise food and beverage
              sales, while we also welcome custom orders for cake and catering
              services. Our menu specializes in Nasi Ayam Gepuk and other Ayam
              Gepuk variants such as Ayam Gepuk Indomie.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">
                    Main Dishes
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Nasi Ayam Gepuk, Keli Gepuk, Tilapia Gepuk, and more
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">
                    Beverages
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Coffee, refreshers, frappes, matcha latte, and more
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">
                    Desserts
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Shaved ice drinks, chocolate donuts, and bomboloni
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">
                    Catering
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Custom orders and catering services available
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Our Team
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground font-serif">
              Our Team
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our daily operation crew consists of 3 general workers, 1 cook, and
              the owner. The general workers handle the cashier, prepare beverages,
              take orders, serve food to the tables, and assist with kitchen tasks.
              The cook focuses on preparing fresh meals, assisted by the general
              workers. The owner manages the restaurant, performs administrative
              tasks, and ensures the highest standards of service.
            </p>
          </section> */}

          {/* CTA */}
          <div className="pt-8 text-center">
            <Button size="lg" render={<Link href="/register" />}>
              Order Now
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-background mt-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row">
          <p>Ayam Gepuk Nina Kitchen — home-cooked with love.</p>
          <div className="flex gap-4">
            <Link href="/login/customer" className="hover:text-foreground">
              Customer login
            </Link>
            <Link href="/login/admin" className="hover:text-foreground">
              Administrator login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
