'use client'

import { Download, TrendingUp, ClipboardList, DollarSign } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'
import { orders } from '@/lib/mock-data'

const weeklySales = [
  { day: 'Mon', sales: 320 },
  { day: 'Tue', sales: 410 },
  { day: 'Wed', sales: 280 },
  { day: 'Thu', sales: 520 },
  { day: 'Fri', sales: 640 },
  { day: 'Sat', sales: 780 },
  { day: 'Sun', sales: 690 },
]

const topDishes = [
  { name: 'Nasi Lemak', value: 42 },
  { name: 'Beef Rendang', value: 28 },
  { name: 'Curry Laksa', value: 18 },
  { name: 'Chicken Satay', value: 12 },
]

const pieColors = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-5)',
]

export default function OwnerReportsPage() {
  const revenue = orders
    .filter((o) => o.paymentStatus === 'Paid')
    .reduce((s, o) => s + o.total, 0)
  const avgOrder = revenue / orders.filter((o) => o.paymentStatus === 'Paid').length

  const summary = [
    {
      label: 'Total revenue',
      value: `RM ${revenue.toFixed(2)}`,
      icon: DollarSign,
    },
    { label: 'Orders', value: orders.length, icon: ClipboardList },
    {
      label: 'Avg. order value',
      value: `RM ${avgOrder.toFixed(2)}`,
      icon: TrendingUp,
    },
  ]

  return (
    <>
      <PageHeader
        title="Reports"
        description="Sales performance and business insights."
        action={
          <Button variant="outline">
            <Download className="size-4" />
            Export report
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {summary.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="font-serif text-xl font-bold text-foreground">
                    {s.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Weekly sales (RM)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklySales}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'var(--color-muted)' }}
                    contentStyle={{
                      background: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '0.5rem',
                      color: 'var(--color-foreground)',
                    }}
                  />
                  <Bar
                    dataKey="sales"
                    fill="var(--color-chart-1)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top dishes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topDishes}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {topDishes.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '0.5rem',
                      color: 'var(--color-foreground)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-col gap-2">
              {topDishes.map((dish, index) => (
                <div
                  key={dish.name}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-2 text-foreground">
                    <span
                      className="size-3 rounded-full"
                      style={{
                        background: pieColors[index % pieColors.length],
                      }}
                    />
                    {dish.name}
                  </span>
                  <span className="text-muted-foreground">{dish.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
