'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CartItem } from "@/types"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const router = useRouter()

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the order to your backend
    alert('Order placed successfully!')
    localStorage.removeItem('cart')
    router.push('/')
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input id="address" required />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="font-bold mt-2">
            Total: ${total.toFixed(2)}
          </div>
        </div>
        <Button type="submit">Place Order</Button>
      </form>
    </div>
  )
}

