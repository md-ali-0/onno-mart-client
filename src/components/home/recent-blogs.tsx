"use client"

import { motion } from "framer-motion"
import { CalendarDays, MessageCircle } from 'lucide-react'
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const blogPosts = [
  {
    id: 1,
    title: "Onide Nidie Inida Modfa",
    date: "01 June, 2021",
    comments: 0,
    image: "/placeholder.svg?height=400&width=600",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...",
  },
  {
    id: 2,
    title: "Binis Mnisd Inigs Unisd",
    date: "01 June, 2021",
    comments: 0,
    image: "/placeholder.svg?height=400&width=600",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...",
  },
  {
    id: 3,
    title: "Thisn Lorem Nidhd Monhd",
    date: "01 June, 2021",
    comments: 0,
    image: "/placeholder.svg?height=400&width=600",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...",
  },
]

export default function FeaturedBlogs() {
  return (
    <section className="py-12 px-4 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="space-y-4 text-center mb-12">
          <h2 className="text-primary/80 font-medium tracking-wide">FEATURED BLOGS</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
            Latest Featured Blog
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-[240px] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="px-6 pb-6">
                  <Button
                    variant="outline"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                  >
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

