"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Sparkles, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useSearchContext, type Book, type SearchResponse } from "@/src/context/SearchContext"



export default function SearchResults() {
  const searchParams = useSearchParams()
  // 1. Capture the current query (e.g., "Truth")
  const query = searchParams.get("q") || "Grace"

  const { data: cachedData, query: cachedQuery, setSearchState } = useSearchContext()
  const isCached = cachedQuery === query && !!cachedData

  const [loading, setLoading] = useState(!isCached)
  const [error, setError] = useState("")

  // Use cached data if available for the current query
  const data = isCached ? cachedData : null

  useEffect(() => {
    // If we already have the data in context, we don't need to fetch
    if (isCached) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      setLoading(true)
      setError("")
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        if (!res.ok) throw new Error("Failed to fetch results")
        const jsonData = await res.json()
        setSearchState(query, jsonData)
      } catch (err) {
        console.error(err)
        setError("Something went wrong. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (query) {
      fetchData()
    }
  }, [query, isCached, setSearchState])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
        <p className="text-gray-500 font-medium">Consulting the library...</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4">{error || "No results found."}</p>
        <Link href="/" className="text-purple-600 hover:underline">Return Home</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 md:px-8 py-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="px-6 md:px-8 py-10 max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-sm text-gray-500 mb-2 font-medium">Search results for:</p>
          <h1 className="text-4xl md:text-5xl font-medium text-black tracking-tight">"{query}"</h1>
        </div>

        <div className="mb-16 bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-black uppercase tracking-wide">AI Overview</h2>
          </div>
          <p className="text-gray-800 leading-relaxed text-lg font-medium">{data.aiOverview.content}</p>
        </div>


        {data.results.length > 0 ? (
          <div>
            <h2 className="text-2xl md:text-3xl font-medium text-black tracking-tight mb-8">
              Here are what we recommend to expound your understanding on '{query}'
            </h2>

            <div className="flex flex-col gap-6">
              {data.results.map((book, idx) => {
                const imageUrl = book.coverImage || book.image || "https://placehold.co/400x600?text=No+Cover"

                // 2. IMPORTANT: We construct the URLSearchParams here
                // We explicitly include 'q' so the next page knows where to go back to
                const bookParams = new URLSearchParams({
                  q: query || "",
                  title: book.title || "",
                  author: book.author || "",
                  year: String(book.year || ""),
                  image: imageUrl || "",
                  category: book.category || "",
                  summary: book.summary || "",
                  whyWritten: book.whyWritten || "",
                  aiInterpretation: book.aiInterpretation || "",
                  quotes: JSON.stringify(book.quotes || [])
                }).toString()

                return (
                  <Link
                    href={`/book/${book.id || idx}?${bookParams}`}
                    key={book.id || idx}
                    className="group cursor-pointer flex items-start gap-6 hover:bg-gray-50 p-4 -mx-4 rounded-xl transition-colors duration-200"
                  >
                    <div className="relative w-24 md:w-32 aspect-[2/3] shrink-0 rounded-lg overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-all">
                      <img src={imageUrl} alt={book.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="space-y-2 flex-1 py-1">
                      <div>
                        <h3 className="text-xl font-bold text-black leading-tight group-hover:text-purple-700 transition-colors">{book.title}</h3>
                        <p className="text-base font-medium text-gray-500 flex items-center gap-2">
                          {book.author}
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <span className="text-gray-400">{book.year}</span>
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 md:line-clamp-3">{book.summary}</p>
                      <div className="pt-1">
                        <span className="inline-block bg-gray-100 text-gray-600 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md">{book.category}</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-600 font-medium text-lg">
              We couldn't find specific book recommendations for this query, but we hope the AI overview above is helpful.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}