"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface BookItem {
  id: number
  title?: string
  image?: string
}

interface BookCarouselProps {
  title: string
  items: BookItem[]
}

export function BookCarousel({ title, items }: BookCarouselProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Duplicate items to create seamless infinite loop
  const duplicatedItems = [...items, ...items, ...items]

  return (
    <section className="overflow-hidden">
      <h2 className="text-2xl font-semibold mb-6 px-6">{title}</h2>

      <motion.div
        className="flex gap-4 px-6"
        animate={{
          x: isHovered ? 0 : [0, -(items.length * 144 + items.length * 16)],
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: items.length * 3,
            ease: "linear",
          },
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {duplicatedItems.map((item, index) => (
          <motion.div
            key={`${item.id}-${index}`}
            className="shrink-0 w-32 h-48 bg-gray-300/60 rounded-3xl cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
            }}
            transition={{ duration: 0.2 }}
          >
            {item.image && (
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title || "Book cover"}
                className="w-full h-full object-cover rounded-3xl"
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
