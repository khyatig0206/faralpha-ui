"use client"

import { useState, useRef } from "react"
import { ChevronRight, ChevronLeft, Search } from "lucide-react"

// --- COMPONENTS ---

const TrendingCard = ({ tag, title, description, contributors, avatars, image }: any) => (
  <div className="relative h-64 min-w-[280px] md:min-w-[340px] rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow snap-start">
    <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
      style={{ backgroundImage: `url(${image})` }}
    />
    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

    <div className="relative h-full flex flex-col justify-between p-6 text-white">
      <div className="flex items-center gap-2 group-hover:gap-3 transition-all">
        <span className="text-[15px] font-bold tracking-tight">{tag}</span>
        <ChevronRight className="w-4 h-4 text-white/80" />
      </div>

      <div className="mt-2">
         <p className="text-[15px] font-medium leading-snug text-gray-100 line-clamp-2">
            {description}
         </p>
      </div>

      <div className="flex items-end justify-between mt-auto">
        <div className="flex flex-col">
           <span className="text-[13px] font-bold text-white">{contributors}</span>
           <span className="text-[11px] font-medium text-gray-400">Readers</span>
        </div>
        <div className="flex -space-x-2">
          {avatars.map((avatar: string, i: number) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full border border-white bg-cover bg-center"
              style={{ backgroundImage: `url(${avatar})` }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
)

const BookSection = ({ title, items }: { title: string, items: any[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef
      const scrollAmount = direction === 'left' ? -400 : 400
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="px-8 relative group">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-sm font-bold text-black tracking-wide uppercase">{title}</h2>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>

      {/* Navigation Buttons (Visible on Hover) */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-4 top-[55%] -translate-y-1/2 z-20 w-10 h-10 bg-white border border-gray-200 shadow-lg rounded-full flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 disabled:opacity-0"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button 
        onClick={() => scroll('right')}
        className="absolute right-4 top-[55%] -translate-y-1/2 z-20 w-10 h-10 bg-white border border-gray-200 shadow-lg rounded-full flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar -mx-8 px-8 scroll-smooth"
      >
        {items.map((topic, idx) => (
          <TrendingCard key={idx} {...topic} />
        ))}
      </div>
    </div>
  )
}

// --- MAIN PAGE ---

export default function Home() {
  const [activeTab, setActiveTab] = useState("hire")

  const bookTopics = [
    {
      tag: "Mere Christianity",
      description: "A powerful defense of the Christian faith by C.S. Lewis.",
      contributors: "12.5k",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
      avatars: ["https://i.pravatar.cc/150?u=1", "https://i.pravatar.cc/150?u=2", "https://i.pravatar.cc/150?u=3"],
    },
    {
      tag: "The Case for Christ",
      description: "A journalist's personal investigation of the evidence for Jesus.",
      contributors: "8.2k",
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop",
      avatars: ["https://i.pravatar.cc/150?u=4", "https://i.pravatar.cc/150?u=5", "https://i.pravatar.cc/150?u=6"],
    },
    {
      tag: "Purpose Driven Life",
      description: "What on earth am I here for? A journey of discovery.",
      contributors: "24k",
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1000&auto=format&fit=crop",
      avatars: ["https://i.pravatar.cc/150?u=7", "https://i.pravatar.cc/150?u=8", "https://i.pravatar.cc/150?u=9"],
    },
    {
      tag: "Orthodoxy",
      description: "G.K. Chesterton's spiritual autobiography and philosophy.",
      contributors: "5.1k",
      image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=1000&auto=format&fit=crop",
      avatars: ["https://i.pravatar.cc/150?u=10", "https://i.pravatar.cc/150?u=11", "https://i.pravatar.cc/150?u=12"],
    },
    {
        tag: "The Screwtape Letters",
        description: "A satirical Christian apologetic novel by C.S. Lewis.",
        contributors: "9.3k",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop",
        avatars: ["https://i.pravatar.cc/150?u=13", "https://i.pravatar.cc/150?u=14", "https://i.pravatar.cc/150?u=15"],
    }
  ]

  return (
    <div className="min-h-screen bg-white font-sans">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center px-4 pt-24 pb-20 overflow-hidden">
        {/* Background Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#eef2ff_0%,#ffffff_70%)] -z-10" />

        <h1 className="text-xl md:text-[50px] leading-[1.1] font-semibold text-center mb-6 text-black tracking-tight">
          Where should we begin?
        </h1>

        <p className="text-center text-slate-500 mb-12 max-w-2xl text-[18px] leading-relaxed">
          Search by authors, books or topics you want to learn or any question you have on
          the Christian Themes
        </p>

        {/* Search Bar - WITH BLUE SHADOW EFFECT */}
        {/* Added: shadow-[0_20px_60px_-15px_rgba(59,130,246,0.15)] */}
       <div className="w-full max-w-5xl shadow-[0_40px_80px_-20px_rgba(59,130,246,0.4)] rounded-full">
          <div className="flex items-center p-2 pl-6 bg-white rounded-full border border-gray-100 hover:border-gray-200 transition-colors">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="What do you want to study today?"
              className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400 text-[17px]"
            />
            <button className="bg-[#1a1b1e] text-white rounded-full px-8 py-3.5 text-[15px] font-medium hover:bg-black transition-colors whitespace-nowrap ml-2">
              Browse 1M+ Christian Books
            </button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto py-10 space-y-16">
        <BookSection title="RECOMMENDED BOOKS" items={bookTopics} />
        <BookSection title="CHRISTIAN THOUGHTS" items={bookTopics} />
        <BookSection title="THEOLOGY BOOKS" items={bookTopics} />
      </div>
    </div>
  )
}