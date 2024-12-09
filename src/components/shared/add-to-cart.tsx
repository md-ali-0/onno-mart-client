'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { CartItem, Product } from '@/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function AddToCartButton({ product }: { product: Product }) {
  const [showDialog, setShowDialog] = useState(false)
  const router = useRouter()

  const addToCart = () => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find(item => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      if (cart.length > 0 && cart[0].shopId !== product.shopId) {
        setShowDialog(true)
        return
      }
      cart.push({ ...product, quantity: 1 })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    router.refresh()
  }

  const replaceCart = () => {
    localStorage.setItem('cart', JSON.stringify([{ ...product, quantity: 1 }]))
    setShowDialog(false)
    router.refresh()
  }

  return (
    <>
      <Button onClick={addToCart}>Add to Cart</Button>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Replace Cart Items?</DialogTitle>
            <DialogDescription>
              This product is from a different shop. Adding it will replace all items in your cart. Do you want to proceed?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={replaceCart}>Replace Cart</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

