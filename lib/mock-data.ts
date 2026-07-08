export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  category: 'Makanan' | 'Ais Batu Campur' | 'Minuman'
  image: string
  available: boolean
  spiceLevels?: boolean
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
  // Makanan
  {
    id: 'm1',
    name: 'Nasi Ayam Gepuk Set A',
    description: 'Fragrant rice with shredded fried chicken, sambal and gravy.',
    price: 7,
    category: 'Makanan',
    image: '/menu/ayam-gepuk-set-a.jpg',
    available: true,
    spiceLevels: true,
  },
  {
    id: 'm2',
    name: 'Nasi Ayam Gepuk Set B',
    description: 'Fragrant rice with shredded fried chicken, egg, sambal and gravy.',
    price: 9,
    category: 'Makanan',
    image: '/menu/ayam-gepuk-set-b.jpg',
    available: true,
    spiceLevels: true,
  },
  {
    id: 'm3',
    name: 'Nasi Ayam Crispy',
    description: 'Fragrant rice with crispy fried chicken.',
    price: 7,
    category: 'Makanan',
    image: '/menu/ayam-crispy.jpg',
    available: true,
    spiceLevels: true,
  },
  {
    id: 'm4',
    name: 'Indomie Telur',
    description: 'Instant noodles with egg.',
    price: 5,
    category: 'Makanan',
    image: '/menu/indomie-telur.jpg',
    available: true,
    spiceLevels: false,
  },
  {
    id: 'm5',
    name: 'Popia Basah (4Pcs)',
    description: 'Soft spring rolls, 4 pieces.',
    price: 5,
    category: 'Makanan',
    image: '/menu/popia-basah.jpg',
    available: true,
    spiceLevels: false,
  },
  {
    id: 'm6',
    name: 'Mi Kari',
    description: 'Curry noodles.',
    price: 7,
    category: 'Makanan',
    image: '/menu/mi-kari.jpg',
    available: true,
    spiceLevels: true,
  },
  {
    id: 'm7',
    name: 'Tauhu Gedik',
    description: 'Fried tofu.',
    price: 5,
    category: 'Makanan',
    image: '/menu/tauhu-gedik.jpg',
    available: true,
    spiceLevels: false,
  },
  {
    id: 'm8',
    name: 'Ramen Chor',
    description: 'Korean noodle soup.',
    price: 14,
    category: 'Makanan',
    image: '/menu/ramen-chor.jpg',
    available: true,
    spiceLevels: true,
  },
  {
    id: 'm9',
    name: 'Keli Gepuk Set A',
    description: 'Shredded fried catfish with rice.',
    price: 7,
    category: 'Makanan',
    image: '/menu/keli-gepuk-set-a.jpg',
    available: true,
    spiceLevels: true,
  },
  {
    id: 'm10',
    name: 'Keli Gepuk Set B',
    description: 'Shredded fried catfish with rice and egg.',
    price: 9,
    category: 'Makanan',
    image: '/menu/keli-gepuk-set-b.jpg',
    available: true,
    spiceLevels: true,
  },
  {
    id: 'm11',
    name: 'Indomie Ayam Gepuk',
    description: 'Instant noodles with shredded fried chicken.',
    price: 10,
    category: 'Makanan',
    image: '/menu/indomie-ayam-gepuk.jpg',
    available: true,
    spiceLevels: true,
  },
  {
    id: 'm12',
    name: 'Bakso',
    description: 'Meatball soup.',
    price: 7,
    category: 'Makanan',
    image: '/menu/bakso.jpg',
    available: true,
    spiceLevels: false,
  },
  {
    id: 'm13',
    name: 'Bihun Sup',
    description: 'Rice vermicelli soup.',
    price: 5,
    category: 'Makanan',
    image: '/menu/bihun-sup.jpg',
    available: true,
    spiceLevels: false,
  },
  {
    id: 'm14',
    name: 'Baby Pancake',
    description: 'Mini fluffy pancakes.',
    price: 8,
    category: 'Makanan',
    image: '/menu/baby-pancake.jpg',
    available: true,
    spiceLevels: false,
  },
  {
    id: 'm15',
    name: 'Tilapia Gepuk Set A',
    description: 'Shredded fried tilapia with rice.',
    price: 10,
    category: 'Makanan',
    image: '/menu/tilapia-gepuk-set-a.jpg',
    available: true,
    spiceLevels: true,
  },
  {
    id: 'm16',
    name: 'Tilapia Gepuk Set B',
    description: 'Shredded fried tilapia with rice and egg.',
    price: 12,
    category: 'Makanan',
    image: '/menu/tilapia-gepuk-set-b.jpg',
    available: true,
    spiceLevels: true,
  },
  // Ais Batu Campur
  {
    id: 'm17',
    name: 'ABC Coklat',
    description: 'Shaved ice with chocolate syrup.',
    price: 7,
    category: 'Ais Batu Campur',
    image: '/menu/abc-coklat.jpg',
    available: true,
    spiceLevels: false,
  },
  {
    id: 'm18',
    name: 'ABC Jagung',
    description: 'Shaved ice with corn.',
    price: 6,
    category: 'Ais Batu Campur',
    image: '/menu/abc-jagung.jpg',
    available: true,
    spiceLevels: false,
  },
  {
    id: 'm19',
    name: 'ABC Naga',
    description: 'Shaved ice with dragon fruit syrup.',
    price: 7,
    category: 'Ais Batu Campur',
    image: '/menu/abc-naga.jpg',
    available: true,
    spiceLevels: false,
  },
  {
    id: 'm20',
    name: 'ABC Mangga',
    description: 'Shaved ice with mango syrup.',
    price: 7,
    category: 'Ais Batu Campur',
    image: '/menu/abc-mangga.jpg',
    available: true,
    spiceLevels: false,
  },
  {
    id: 'm21',
    name: 'ABC Pelangi',
    description: 'Shaved ice with rainbow syrups.',
    price: 6,
    category: 'Ais Batu Campur',
    image: '/menu/abc-pelangi.jpg',
    available: true,
    spiceLevels: false,
  },
  // Minuman
  {
    id: 'm22',
    name: 'Chocolate Boba',
    description: 'Chocolate drink with tapioca pearls.',
    price: 6,
    category: 'Minuman',
    image: '/menu/chocolate-boba.jpg',
    available: true,
    spiceLevels: false,
  },
  {
    id: 'm23',
    name: 'Green Tea Boba',
    description: 'Green tea drink with tapioca pearls.',
    price: 6,
    category: 'Minuman',
    image: '/menu/green-tea-boba.jpg',
    available: true,
    spiceLevels: false,
  },
  {
    id: 'm24',
    name: 'Strawberry Boba',
    description: 'Strawberry drink with tapioca pearls.',
    price: 6,
    category: 'Minuman',
    image: '/menu/strawberry-boba.jpg ',
    available: true,
    spiceLevels: false,
  },
  {
    id: 'm25',
    name: 'Vanilla Blue Boba',
    description: 'Vanilla with butterfly pea tea and tapioca pearls.',
    price: 6,
    category: 'Minuman',
    image: '/menu/vanilla-blue-boba.jpg',
    available: true,
    spiceLevels: false,
  },
  {
    id: 'm26',
    name: 'Laicikang',
    description: 'Lychee drink.',
    price: 5,
    category: 'Minuman',
    image: '/menu/laicikang.jpg',
    available: true,
    spiceLevels: false,
  },
]

export const orders: Order[] = [
  {
    id: 'NK-1042',
    customer: 'Aisha Rahman',
    date: '2026-07-05 12:15',
    items: [
      { name: 'Nasi Ayam Gepuk Set A', quantity: 2, price: 7 },
      { name: 'Mi Kari', quantity: 1, price: 7 },
    ],
    total: 21,
    status: 'Preparing',
    paymentStatus: 'Paid',
  },
  {
    id: 'NK-1041',
    customer: 'Aisha Rahman',
    date: '2026-07-03 19:40',
    items: [{ name: 'Ramen Chor', quantity: 1, price: 14 }],
    total: 14,
    status: 'Completed',
    paymentStatus: 'Paid',
  },
  {
    id: 'NK-1040',
    customer: 'Daniel Tan',
    date: '2026-07-03 18:05',
    items: [
      { name: 'Keli Gepuk Set B', quantity: 1, price: 9 },
      { name: 'Indomie Ayam Gepuk', quantity: 1, price: 10 },
    ],
    total: 19,
    status: 'Ready',
    paymentStatus: 'Paid',
  },
  {
    id: 'NK-1039',
    customer: 'Priya Kumar',
    date: '2026-07-02 13:20',
    items: [{ name: 'Nasi Ayam Crispy', quantity: 3, price: 7 }],
    total: 21,
    status: 'Pending',
    paymentStatus: 'Unpaid',
  },
  {
    id: 'NK-1038',
    customer: 'Aisha Rahman',
    date: '2026-06-28 20:10',
    items: [
      { name: 'Nasi Ayam Gepuk Set A', quantity: 1, price: 7 },
      { name: 'ABC Coklat', quantity: 2, price: 7 },
    ],
    total: 21,
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
