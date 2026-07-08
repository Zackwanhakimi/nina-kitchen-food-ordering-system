'use client'

import { useEffect, useState } from 'react'
import { menuItems, orders as initialOrders, notifications as initialNotifications, type MenuItem, type Order, type Notification } from './mock-data'

const ORDERS_STORAGE_KEY = 'nina-kitchen-orders-v1'
const CART_STORAGE_KEY = 'nina-kitchen-cart-v1'
const NOTIFICATIONS_STORAGE_KEY = 'nina-kitchen-notifications-v1'

export type CartItem = {
  itemId: string
  quantity: number
  spiceLevel?: string
  notes?: string
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)

  useEffect(() => {
    const stored = window.localStorage.getItem(ORDERS_STORAGE_KEY)
    if (stored) {
      try {
        setOrders(JSON.parse(stored))
      } catch {
        setOrders(initialOrders)
      }
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
  }, [orders])

  return [orders, setOrders] as const
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch {}
  }, [cart])

  const addToCart = (itemId: string, quantity = 1, spiceLevel?: string, notes?: string) => {
    setCart((current) => {
      const existing = current.find((cartItem) => cartItem.itemId === itemId && cartItem.spiceLevel === spiceLevel && cartItem.notes === notes)
      if (existing) {
        return current.map((cartItem) =>
          cartItem === existing
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem,
        )
      }
      return [...current, { itemId, quantity, spiceLevel, notes }]
    })
  }

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((current) =>
      current
        .map((cartItem) =>
          cartItem.itemId === itemId
            ? { ...cartItem, quantity: Math.max(0, cartItem.quantity + delta) }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    )
  }

  const removeFromCart = (itemId: string) => {
    setCart((current) => current.filter((cartItem) => cartItem.itemId !== itemId))
  }

  const clearCart = () => setCart([])

  const cartItems = cart.map((entry) => ({
    ...entry,
    item: menuItems.find((item) => item.id === entry.itemId),
  }))

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce(
    (sum, entry) => sum + (entry.item ? entry.item.price * entry.quantity : 0),
    0,
  )

  return {
    cart,
    cartItems,
    totalItems,
    totalPrice,
    setCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  }
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  useEffect(() => {
    const stored = window.localStorage.getItem(NOTIFICATIONS_STORAGE_KEY)
    if (stored) {
      try {
        setNotifications(JSON.parse(stored))
      } catch {
        setNotifications(initialNotifications)
      }
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications))
  }, [notifications])

  return [notifications, setNotifications] as const
}
