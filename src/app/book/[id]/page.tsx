"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Quote, Sparkles, Calendar, Info } from "lucide-react"

export default function BookInnerPage() {
  const searchParams = useSearchParams()
  
  // 1. Retrieve the previous search query from the URL parameters
  // If the previous page passed ?q=Truth, this will be "Truth"
  const previousQuery = searchParams.get("q") || "Grace"

  // 2. Retrieve Book Details
  const book = {
    title: searchParams.get("title") || "Unknown Title",
    author: searchParams.get("author") || "Unknown Author",
    year: searchParams.get("year") || "Unknown Year",
    image: searchParams.get("image") || "",
    whyWritten: searchParams.get("whyWritten") || "Details not provided.",
    summary: searchParams.get("summary") || "No summary available.",
    aiInterpretation: searchParams.get("aiInterpretation") || searchParams.get("summary") || "",
    quotes: JSON.parse(searchParams.get("quotes") || "[]")
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* --- NAV --- */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          {/* 3. Link back to /search with the query parameter included */}
          <Link 
            href={`/search?q=${encodeURIComponent(previousQuery)}`} 
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search results for "{previousQuery}"
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        
        {/* --- TOP SECTION --- */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="shrink-0 mx-auto md:mx-0 w-48 md:w-64">
                <div className="rounded-xl overflow-hidden shadow-xl aspect-[2/3] border border-gray-100">
                    <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                </div>
            </div>

            <div className="flex flex-col justify-center space-y-6">
                <div>
                    <p className="text-purple-600 font-bold tracking-wide text-sm uppercase mb-1">{book.author}</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">{book.title}</h1>
                    <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Published: {book.year}</span>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-2 mb-2 text-gray-900 font-semibold">
                        <Info className="w-4 h-4" />
                        <h3>Why it was written</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {book.whyWritten}
                    </p>
                </div>
            </div>
        </div>

        {/* --- SUMMARY SECTION --- */}
        <div className="border-t border-gray-100 pt-10">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-black">AI Interpretation & Summary</h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 leading-8">
                <p className="mb-8">{book.aiInterpretation}</p>

                {/* Quotes */}
                {book.quotes.length > 0 && (
                  <div className="grid gap-6 md:grid-cols-2 mb-12">
                      {book.quotes.map((quote: any, idx: number) => (
                          <div key={idx} className="relative bg-white border-l-4 border-purple-400 pl-6 py-2">
                              <Quote className="absolute -top-2 -left-2 w-4 h-4 text-purple-200 bg-white" />
                              <p className="font-serif italic text-gray-800 text-lg">"{quote}"</p>
                          </div>
                      ))}
                  </div>
                )}
            </div>
        </div>
      </div>
    </div>
  )
}