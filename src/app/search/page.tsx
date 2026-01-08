"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || "Grace"

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        if (!res.ok) {
          throw new Error("Failed to fetch results")
        }
        const jsonData = await res.json()
        setData(jsonData)
      } catch (err) {
        setError("Failed to load results. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (query) {
      fetchData()
    }
  }, [query])

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">

      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 md:px-8 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          {/* <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest hidden md:block">
            Responses are based strictly on the text and historical context of this work.
          </span> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-8 py-10 max-w-6xl mx-auto">

        {/* Search Query Header */}
        <div className="mb-10">
          <p className="text-sm text-gray-500 mb-2 font-medium">Search results for:</p>
          <h1 className="text-4xl md:text-5xl font-medium text-black tracking-tight flex items-center gap-3">
            "{query}"
            {loading && <span className="text-lg text-gray-400 animate-pulse">(Searching...)</span>}
          </h1>
        </div>

        {error ? (
          <div className="p-8 bg-red-50 text-red-600 rounded-xl border border-red-100 text-center">
            <p className="font-medium">{error}</p>
          </div>
        ) : loading ? (
          <div className="animate-pulse space-y-12">
            <div className="h-64 bg-gray-100 rounded-2xl w-full"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-100 rounded w-1/3"></div>
              <div className="h-40 bg-gray-100 rounded-xl w-full"></div>
              <div className="h-40 bg-gray-100 rounded-xl w-full"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Section 1: AI Analysis (Top) */}
            <div className="mb-16 bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" /> {/* Accent Bar */}

              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-black uppercase tracking-wide">{data?.aiOverview?.title}</h2>
              </div>

              <div className="prose prose-lg text-gray-800 leading-relaxed font-medium">
                <p>{data?.aiOverview?.content}</p>
              </div>
            </div>

            {/* Section 2: Book Recommendations (Bottom) */}
            <div>
              <h2 className="text-2xl md:text-3xl font-medium text-black tracking-tight mb-8">
                {data?.recommendationsTitle}
              </h2>

              {/* Book List (Vertical Layout) */}
              <div className="flex flex-col gap-6">
                {data?.results?.map((book: any) => (
                  <Link href={`/book/${book.id}`} key={book.id} className="group cursor-pointer flex items-start gap-6 hover:bg-gray-50 p-4 -mx-4 rounded-xl transition-colors duration-200">

                    {/* Book Image */}
                    <div className="relative w-24 md:w-32 aspect-[2/3] shrink-0 rounded-lg overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-all">
                      {book.coverImage ? (
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                          <span className="text-xs">No Cover</span>
                        </div>
                      )}

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
                        {book.description}
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
          </>
        )}

      </div>
    </div>
  )
}
