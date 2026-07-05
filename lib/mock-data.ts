export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  category: 'Mains' | 'Noodles' | 'Sides' | 'Dessert'
  image: string
  available: boolean
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Preparing'
  | 'Ready'
  | 'Out for delivery'
  | 'Completed'
  | 'Cancelled'

export type OrderItem = {
  name: string
  quantity: number
  price: number
}

export type Order = {
  id: string
  customer: string
  date: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  paymentStatus: 'Paid' | 'Unpaid'
}

export type Payment = {
  id: string
  orderId: string
  date: string
  method: string
  amount: number
  status: 'Paid' | 'Pending' | 'Refunded'
}

export const menuItems: MenuItem[] = [
  {
    id: 'm1',
    name: 'Nasi Lemak',
    description:
      'Fragrant coconut rice with crispy fried chicken, sambal, roasted peanuts and egg.',
    price: 12.9,
    category: 'Mains',
    image: '/images/dish-nasi-lemak.png',
    available: true,
  },
  {
    id: 'm2',
    name: 'Beef Rendang',
    description:
      'Slow-cooked beef in rich coconut and spice gravy, served with steamed rice.',
    price: 16.5,
    category: 'Mains',
    image: '/images/dish-beef-rendang.png',
    available: true,
  },
  {
    id: 'm3',
    name: 'Curry Laksa',
    description:
      'Spicy coconut noodle soup with prawns, tofu puffs, bean sprouts and egg.',
    price: 14.0,
    category: 'Noodles',
    image: '/images/dish-laksa.png',
    available: true,
  },
  {
    id: 'm4',
    name: 'Chicken Satay',
    description:
      'Grilled marinated chicken skewers with peanut sauce, rice cakes and cucumber.',
    price: 10.5,
    category: 'Sides',
    image: '/images/dish-satay.png',
    available: true,
  },
  {
    id: 'm5',
    name: 'Mee Goreng',
    description:
      'Wok-fried noodles with egg, tofu, vegetables and a squeeze of lime.',
    price: 11.5,
    category: 'Noodles',
    image: '/images/dish-mee-goreng.png',
    available: true,
  },
  {
    id: 'm6',
    name: 'Cendol',
    description:
      'Shaved ice dessert with green rice jelly, coconut milk and palm sugar syrup.',
    price: 6.5,
    category: 'Dessert',
    image: '/images/dish-cendol.png',
    available: false,
  },
]

export const orders: Order[] = [
  {
    id: 'NK-1042',
    customer: 'Aisha Rahman',
    date: '2026-07-05 12:15',
    items: [
      { name: 'Nasi Lemak', quantity: 2, price: 12.9 },
      { name: 'Chicken Satay', quantity: 1, price: 10.5 },
    ],
    total: 36.3,
    status: 'Preparing',
    paymentStatus: 'Paid',
  },
  {
    id: 'NK-1041',
    customer: 'Aisha Rahman',
    date: '2026-07-03 19:40',
    items: [{ name: 'Curry Laksa', quantity: 1, price: 14.0 }],
    total: 14.0,
    status: 'Completed',
    paymentStatus: 'Paid',
  },
  {
    id: 'NK-1040',
    customer: 'Daniel Tan',
    date: '2026-07-03 18:05',
    items: [
      { name: 'Beef Rendang', quantity: 1, price: 16.5 },
      { name: 'Mee Goreng', quantity: 1, price: 11.5 },
    ],
    total: 28.0,
    status: 'Ready',
    paymentStatus: 'Paid',
  },
  {
    id: 'NK-1039',
    customer: 'Priya Kumar',
    date: '2026-07-02 13:20',
    items: [{ name: 'Chicken Satay', quantity: 3, price: 10.5 }],
    total: 31.5,
    status: 'Pending',
    paymentStatus: 'Unpaid',
  },
  {
    id: 'NK-1038',
    customer: 'Aisha Rahman',
    date: '2026-06-28 20:10',
    items: [
      { name: 'Nasi Lemak', quantity: 1, price: 12.9 },
      { name: 'Cendol', quantity: 2, price: 6.5 },
    ],
    total: 25.9,
    status: 'Completed',
    paymentStatus: 'Paid',
  },
]

export const payments: Payment[] = [
  {
    id: 'PAY-5021',
    orderId: 'NK-1042',
    date: '2026-07-05 12:16',
    method: 'Credit Card',
    amount: 36.3,
    status: 'Paid',
  },
  {
    id: 'PAY-5020',
    orderId: 'NK-1041',
    date: '2026-07-03 19:41',
    method: 'E-Wallet',
    amount: 14.0,
    status: 'Paid',
  },
  {
    id: 'PAY-5019',
    orderId: 'NK-1038',
    date: '2026-06-28 20:11',
    method: 'Credit Card',
    amount: 25.9,
    status: 'Paid',
  },
]

export const customerProfile = {
  name: 'Aisha Rahman',
  email: 'aisha.rahman@example.com',
  phone: '+60 12-345 6789',
  address: '24 Jalan Melur, Taman Seri, 50450 Kuala Lumpur',
  joined: 'March 2026',
  memberTier: 'Gold',
}

export const orderStatusSteps: OrderStatus[] = [
  'Pending',
  'Confirmed',
  'Preparing',
  'Ready',
  'Out for delivery',
  'Completed',
]

export function statusColor(status: OrderStatus): string {
  switch (status) {
    case 'Pending':
      return 'bg-muted text-muted-foreground'
    case 'Confirmed':
    case 'Preparing':
      return 'bg-accent/20 text-accent-foreground'
    case 'Ready':
    case 'Out for delivery':
      return 'bg-primary/15 text-primary'
    case 'Completed':
      return 'bg-chart-3/20 text-chart-3'
    case 'Cancelled':
      return 'bg-destructive/15 text-destructive'
    default:
      return 'bg-muted text-muted-foreground'
  }
}
