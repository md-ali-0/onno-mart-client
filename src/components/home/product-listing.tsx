'use client'

import { motion } from 'framer-motion'
import { BarChart2, Heart, Search, ShoppingCart, Star } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
}

export default function ProductListing() {
  const [activeTab, setActiveTab] = useState<'bestselling' | 'toprated'>('bestselling')

  const products: Product[] = [
    {
      id: 1,
      name: "Faceted Dog Tag Pendant",
      price: 110.00,
      originalPrice: 130.00,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Sterling Silver with Gold Plate",
      price: 70.00,
      originalPrice: 85.00,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Hollow Evergreen Rope Chain",
      price: 19.00,
      originalPrice: 29.00,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Onide snded mnide",
      price: 50.00,
      originalPrice: 50.00,
      image: "/placeholder.svg"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-6 mb-12 text-white relative overflow-hidden">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-2">Hurry Up!</h2>
          <p className="text-6xl font-extrabold">50% OFF</p>
          <p className="text-xl mt-2">For All Items</p>
        </motion.div>
        <div className="absolute right-10 bottom-0 opacity-20">
          <div className="w-32 h-32 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-8 mb-8 border-b">
        <button
          onClick={() => setActiveTab('bestselling')}
          className={`pb-4 px-4 text-lg font-semibold relative ${
            activeTab === 'bestselling'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground'
          }`}
        >
          Best Selling
          {activeTab === 'bestselling' && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('toprated')}
          className={`pb-4 px-4 text-lg font-semibold relative ${
            activeTab === 'toprated'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground'
          }`}
        >
          Top Rated
          {activeTab === 'toprated' && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group"
          >
            <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-square mb-4 bg-gray-100 rounded-xl overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200">
                    <Search className="w-5 h-5" />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200">
                    <BarChart2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2 truncate">{product.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <button className="bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary/90 transition-colors duration-200">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

