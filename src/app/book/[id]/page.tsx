"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Quote, Sparkles, Calendar, Info, Loader2 } from "lucide-react"
import { useSearchContext, type Book } from "@/src/context/SearchContext"

export default function BookInnerPage() {
  const searchParams = useSearchParams()
  const { data, setSearchState, query: contextQuery } = useSearchContext()


  // 1. Retrieve the previous search query
  const previousQuery = searchParams.get("q") || contextQuery || "Grace"

  // 2. Retrieve Book Details
  // Initialize with URL params, including new and deprecated fields
  const [book, setBook] = useState<Book>({
    id: searchParams.get("id") || "",
    title: searchParams.get("title") || "Unknown Title",
    author: searchParams.get("author") || "Unknown Author",
    year: searchParams.get("year") || "Unknown Year",
    image: searchParams.get("image") || "",
    category: searchParams.get("category") || "",
    summary: searchParams.get("summary") || "No summary available.",

    // New Fields
    applicationParagraph: searchParams.get("applicationParagraph") || undefined,
    devotionalQuestion: searchParams.get("devotionalQuestion") || undefined,
    practicalTip: searchParams.get("practicalTip") || undefined,
    quotes: searchParams.get("quotes") ? JSON.parse(searchParams.get("quotes")!) : undefined,

    // Deprecated Fields
    whyWritten: searchParams.get("whyWritten") || undefined,
    aiInterpretation: searchParams.get("aiInterpretation") || undefined,
  })

  // Start loading if we are missing the deep details (applicationParagraph is a good proxy)
  const [loadingDetails, setLoadingDetails] = useState(!book.applicationParagraph)

  // 3. Fetch Deep Details if missing
  useEffect(() => {
    // If we have the new applicationParagraph, we don't need to fetch
    if (book.applicationParagraph) return;

    const fetchDetails = async () => {
      setLoadingDetails(true)
      try {
        const res = await fetch('/api/book-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: previousQuery,
            title: book.title,
            author: book.author
          })
        })

        if (!res.ok) throw new Error("Failed to fetch details")

        const details = await res.json()

        setBook(prev => ({
          ...prev,
          applicationParagraph: details.applicationParagraph,
          aiInterpretation: details.aiInterpretation,
          devotionalQuestion: details.devotionalQuestion,
          practicalTip: details.practicalTip,
          quotes: details.quotes
        }))

      } catch (err) {
        console.error("Failed to fetch book details:", err)
      } finally {
        setLoadingDetails(false)
      }
    }

    if (book.title && book.author) {
      fetchDetails()
    }
  }, [book.title, book.author, previousQuery, book.applicationParagraph])

  if (loadingDetails) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
        <p className="text-gray-500 font-medium">Consulting the library...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">

      {/* --- NAV --- */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto">
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

            {/* THE REQUESTED 'Why it was written' BOX */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 min-h-[160px]">
              <div className="flex items-center gap-2 mb-2 text-gray-900 font-semibold">
                <Info className="w-4 h-4" />
                <h3>Why it was written</h3>
              </div>
              {loadingDetails ? (
                <div className="flex items-center gap-2 text-gray-500 animate-pulse mt-4">
                  <Sparkles className="w-4 h-4" />
                  <p>Consulting the library...</p>
                </div>
              ) : (
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {/* HERE IS THE CONTENT CHANGE REQUESTED */}
                  {book.applicationParagraph || book.whyWritten || book.summary}
                </p>
              )}
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
            {loadingDetails ? (
              <div className="space-y-3 animate-pulse mb-8">
                <div className="h-4 bg-gray-100 rounded w-full"></div>
                <div className="h-4 bg-gray-100 rounded w-5/6"></div>
              </div>
            ) : (
              <p className="mb-8">{book.aiInterpretation || book.summary}</p>
            )}

            {/* Quotes */}
            {(book.quotes?.length ?? 0) > 0 && (
              <div className="grid gap-6 md:grid-cols-2 mb-12">
                {book.quotes?.map((quote: any, idx: number) => (
                  <div key={idx} className="relative bg-white border-l-4 border-purple-400 pl-6 py-2">
                    <Quote className="absolute -top-2 -left-2 w-4 h-4 text-purple-200 bg-white" />
                    <p className="font-serif italic text-gray-800 text-lg">"{quote}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* --- NEW ADDITIONS BELOW (Requested) --- */}
          {(book.devotionalQuestion || book.practicalTip) && (
            <div className="grid md:grid-cols-2 gap-6 mt-10 mb-12">
              {/* Question Card */}
              <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                <h3 className="text-purple-900 font-bold mb-3 uppercase text-xs tracking-wider">Devotional Question</h3>
                <p className="text-lg font-medium text-purple-950 font-serif">
                  {book.devotionalQuestion}
                </p>
              </div>

              {/* Practice Tip Card */}
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                <h3 className="text-emerald-900 font-bold mb-3 uppercase text-xs tracking-wider">Modern Practice</h3>
                <p className="text-lg font-medium text-emerald-950">
                  {book.practicalTip}
                </p>
              </div>
            </div>
          )}

          {/* Journal section */}
          <div className="pt-8 border-t border-gray-100">
            <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              <span>📖</span> Personal Journal
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm focus-within:ring-2 focus-within:ring-purple-500 transition-shadow">
              <textarea
                className="w-full h-32 resize-none outline-none text-gray-700 placeholder:text-gray-400"
                placeholder="Write your reflections here..."
              />
              <div className="flex justify-end mt-2">
                <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  Save Progress
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
