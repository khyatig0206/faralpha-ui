"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || "Grace"

  // Mock AI Response
  const aiAnalysis = {
    content: `${query}, in Christian theology, represents God's unmerited favor and kindness toward humanity. It is the divine gift of salvation offered freely to those who believe in Christ, not earned through works or merit. Throughout Scripture, grace is portrayed as the foundational mechanism of redemption, emphasized particularly in Paul's epistles where he writes that we are saved by grace through faith. This concept contrasts sharply with legalism and self-righteousness, serving as the cornerstone of Protestant theology. Grace enables believers to live transformed lives, empowering them to overcome sin and grow spiritually. The doctrine of grace has profoundly shaped Christian practice and understanding of God's character across denominations. It emphasizes God's mercy and love as the ultimate source of human salvation and transformation.`,
  }

  // Recommended Books Data with Year
  const recommendedBooks = [
    {
      id: "mere-christianity",
      title: "Mere Christianity",
      author: "C.S. Lewis",
      year: "1952",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
      category: "Christian Thought",
      summary: "A powerful apologetic work that argues for the logical validity of Christian beliefs, discussing the law of human nature and the concept of God.",
    },
    {
      id: "case-for-christ", 
      title: "The Case for Christ",
      author: "Lee Strobel",
      year: "1998",
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop",
      category: "Apologetics",
      summary: "A former atheist and legal editor investigates the historical evidence for Jesus, treating the Gospels as eyewitness testimony to be cross-examined.",
    },
    {
      id: "purpose-driven-life",
      title: "Purpose Driven Life",
      author: "Rick Warren",
      year: "2002",
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1000&auto=format&fit=crop",
      category: "Christian Living",
      summary: "A devotional journey helping readers understand God's plan for their lives, emphasizing worship, fellowship, discipleship, ministry, and mission.",
    },
    {
      id: "orthodoxy",
      title: "Orthodoxy",
      author: "G.K. Chesterton",
      year: "1908",
      image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=1000&auto=format&fit=crop",
      category: "Theology",
      summary: "A classic spiritual autobiography where Chesterton explains how he came to believe in the Christian faith through common sense and the paradoxes of life.",
    },
  ]

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 md:px-8 py-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-8 py-10 max-w-6xl mx-auto">
        
        {/* Search Query Header */}
        <div className="mb-10">
          <p className="text-sm text-gray-500 mb-2 font-medium">Search results for:</p>
          <h1 className="text-4xl md:text-5xl font-medium text-black tracking-tight">"{query}"</h1>
        </div>

        {/* Section 1: AI Analysis (Top) */}
        <div className="mb-16 bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" /> {/* Accent Bar */}
          
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-black uppercase tracking-wide">AI Overview</h2>
          </div>

          <p className="text-gray-800 leading-relaxed text-lg font-medium">
            {aiAnalysis.content}
          </p>
        </div>

        {/* Section 2: Book Recommendations (Bottom) */}
        <div>
          <h2 className="text-2xl md:text-3xl font-medium text-black tracking-tight mb-8">
            Here are what we recommend to expound your understanding on '{query}'
          </h2>

          {/* Book List (Vertical Layout) */}
          <div className="flex flex-col gap-6">
            {recommendedBooks.map((book) => (
              <Link href={`/book/${book.id}`} key={book.id} className="group cursor-pointer flex items-start gap-6 hover:bg-gray-50 p-4 -mx-4 rounded-xl transition-colors duration-200">
                
                {/* Book Image */}
                <div className="relative w-24 md:w-32 aspect-[2/3] shrink-0 rounded-lg overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-all">
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                {/* Details */}
                <div className="space-y-2 flex-1 py-1">
                  <div>
                    <h3 className="text-xl font-bold text-black leading-tight group-hover:text-purple-700 transition-colors">
                      {book.title}
                    </h3>
                    
                    {/* Author & Year */}
                    <p className="text-base font-medium text-gray-500 flex items-center gap-2">
                      {book.author}
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="text-gray-400">{book.year}</span>
                    </p>
                  </div>
                  
                  {/* Summary */}
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 md:line-clamp-3">
                    {book.summary}
                  </p>

                  <div className="pt-1">
                    <span className="inline-block bg-gray-100 text-gray-600 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md">
                      {book.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}