

"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Quote, Sparkles, Calendar, Info } from "lucide-react"

// --- MOCK DATA ---
const booksData: Record<string, any> = {
  "mere-christianity": {
    title: "Mere Christianity",
    author: "C.S. Lewis",
    year: "1952",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
    whyWritten: "This book was originally delivered as radio talks during WWII to explain and defend the common beliefs of the Christian faith to a skeptical public. Lewis wrote it not to convert people to a specific denomination, but to argue for the logical validity of the core Christian doctrines.",
    summary: "In this profound work, Lewis dismantles the arguments of moral relativism, positing that the universal 'Law of Human Nature' points undeniably to a Moral Lawgiver. He transitions from logic to theology, explaining that Christ's claim to be God leaves us with only three options: He is a Liar, a Lunatic, or the Lord. The text ultimately serves as a guide for 'making new men,' illustrating how the biological life of humans can be transformed into the spiritual life of God.",
    quotes: [
      "If I find in myself a desire which no experience in this world can satisfy, the most probable explanation is that I was made for another world.",
      "The Son of God became a man to enable men to become sons of God."
    ]
  },
  "default": {
    title: "The Case for Christ",
    author: "Lee Strobel",
    year: "1998",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop",
    whyWritten: "Written by a former atheist journalist, this book documents his personal investigation into the historical evidence for Jesus. It aims to challenge skeptics by applying legal and journalistic standards of proof to the claims of Christianity.",
    summary: "Strobel treats the Gospel accounts as evidence in a courtroom, interviewing experts to cross-examine the historical reliability of the Bible. The book systematically builds a case for the Resurrection, arguing that it is the most rational explanation for the historical facts. It concludes that faith in Jesus is not a leap into the dark, but a step into the light of evidence.",
    quotes: [
      "To be a Christian is to have a relationship with God, not just to know about Him.",
      "The evidence for the resurrection is better than for claimed miracles in any other religion."
    ]
  }
}

const similarBooks = [
  {
    id: "orthodoxy",
    title: "Orthodoxy",
    author: "G.K. Chesterton",
    image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=1000&auto=format&fit=crop",
    category: "Theology",
  },
  {
    id: "purpose-driven-life",
    title: "Purpose Driven Life",
    author: "Rick Warren",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1000&auto=format&fit=crop",
    category: "Christian Living",
  },
  {
    id: "screwtape-letters",
    title: "The Screwtape Letters",
    author: "C.S. Lewis",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop",
    category: "Fiction / Apologetics",
  },
  {
    id: "knowing-god",
    title: "Knowing God",
    author: "J.I. Packer",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop",
    category: "Theology",
  }
]

export default function BookInnerPage() {
  const params = useParams()
  // Safe handling of params.id
  const idString = Array.isArray(params?.id) ? params.id[0] : params?.id
  const book = booksData[idString || "mere-christianity"] || booksData["default"]

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* --- NAV --- */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/search" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        
        {/* --- TOP SECTION: IMAGE & METADATA --- */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Book Image (SIZE REDUCED) */}
            <div className="shrink-0 mx-auto md:mx-0 w-48 md:w-64">
                <div className="rounded-xl overflow-hidden shadow-xl aspect-[2/3] border border-gray-100">
                    <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Info Column */}
            <div className="flex flex-col justify-center space-y-6">
                <div>
                    <p className="text-purple-600 font-bold tracking-wide text-sm uppercase mb-1">{book.author}</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">{book.title}</h1>
                    <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Published: {book.year}</span>
                    </div>
                </div>

                {/* Book Points */}
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
                <p className="mb-8">{book.summary}</p>

                {/* Famous Quotes */}
                <div className="grid gap-6 md:grid-cols-2 mb-12">
                    {book.quotes.map((quote: string, idx: number) => (
                        <div key={idx} className="relative bg-white border-l-4 border-purple-400 pl-6 py-2">
                             <Quote className="absolute -top-2 -left-2 w-4 h-4 text-purple-200 bg-white" />
                             <p className="font-serif italic text-gray-800 text-lg">
                                "{quote}"
                             </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- SIMILAR BOOKS LIST --- */}
        <div className="border-t border-gray-100 pt-10 pb-10">
          <h2 className="text-xl font-bold text-black mb-6">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {similarBooks.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3 bg-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 truncate">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.author}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
