"use client"

import { useState } from "react"
import { Search, Sparkles } from "lucide-react"

const categories = ["Christian Life", "Theology", "Sermons", "Church History"]
const difficulties = ["Beginner", "Intermediate", "Advanced"]
const eras = ["Classics", "Modern"]

// Mock book data
// Mock book data with working placeholders
const mockBooks = [
  {
    id: 1,
    title: "The Pilgrim's Progress",
    author: "John Bunyan",
    summary:
      "A timeless allegory of Christian spiritual journey and growth. Following the protagonist through trials and triumphs.",
    cover: "https://placehold.co/400x600/eec9c9/592c2c?text=Pilgrim%27s+Progress",
    tags: ["Theology", "Classics"],
  },
  {
    id: 2,
    title: "Mere Christianity",
    author: "C.S. Lewis",
    summary:
      "A thoughtful exploration of Christian faith and belief. A foundational work for understanding Christian philosophy.",
    cover: "https://placehold.co/400x600/eec9c9/592c2c?text=Mere+Christianity",
    tags: ["Christian Life", "Modern"],
  },
  {
    id: 3,
    title: "The Shack",
    author: "William P. Young",
    summary:
      "A contemporary story exploring faith, redemption, and God's nature. Challenges traditional theological perspectives.",
    cover: "https://placehold.co/400x600/eec9c9/592c2c?text=The+Shack",
    tags: ["Christian Life", "Modern"],
  },
  {
    id: 4,
    title: "Systematic Theology",
    author: "Wayne Grudem",
    summary:
      "A comprehensive guide to Christian doctrine and theology. Essential reference for serious theological study.",
    cover: "https://placehold.co/400x600/eec9c9/592c2c?text=Systematic+Theology",
    tags: ["Theology", "Advanced"],
  },
  {
    id: 5,
    title: "The Cost of Discipleship",
    author: "Dietrich Bonhoeffer",
    summary:
      "A profound reflection on authentic Christian commitment. Examines the demands and rewards of following Christ.",
    cover: "https://placehold.co/400x600/eec9c9/592c2c?text=Cost+of+Discipleship",
    tags: ["Christian Life", "Classics"],
  },
  {
    id: 6,
    title: "Church History Essentials",
    author: "Various Authors",
    summary:
      "A comprehensive overview of Christian history from early church to modern times. Explores key figures and movements.",
    cover: "https://placehold.co/400x600/eec9c9/592c2c?text=Church+History",
    tags: ["Church History", "Modern"],
  },
  {
    id: 7,
    title: "Knowing God",
    author: "J.I. Packer",
    summary:
      "An accessible introduction to Christian theology and God's attributes. Perfect for believers seeking deeper knowledge.",
    cover: "https://placehold.co/400x600/eec9c9/592c2c?text=Knowing+God",
    tags: ["Theology", "Beginner"],
  },
  {
    id: 8,
    title: "Practicing the Presence of God",
    author: "Brother Lawrence",
    summary:
      "Timeless spiritual classic on living in awareness of God's presence. Simple yet profound spiritual wisdom.",
    cover: "https://placehold.co/400x600/eec9c9/592c2c?text=Presence+of+God",
    tags: ["Christian Life", "Classics"],
  },
];

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recommended")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [selectedEras, setSelectedEras] = useState<string[]>([])

  const toggleFilter = (item: string, list: string[], setList: (items: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item))
    } else {
      setList([...list, item])
    }
  }

  // Filter books based on selections
  let filteredBooks = mockBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.summary.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.some((cat) => book.tags.includes(cat))

    return matchesSearch && matchesCategory
  })

  // Sort books
  if (sortBy === "popular") {
    filteredBooks = [...filteredBooks].sort(() => Math.random() - 0.5)
  } else if (sortBy === "added") {
    filteredBooks = [...filteredBooks].reverse()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#EEC9C9]">
      {/* Header */}
      <div className="px-6 md:px-12 py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">Explore the Library</h1>
        <p className="text-lg text-gray-600 font-sans">Curated resources for your spiritual journey.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 px-6 md:px-12 pb-20">
        {/* Sidebar */}
        <aside className="w-full md:w-48 flex-shrink-0">
          {/* Category Filter */}
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-widest font-bold text-foreground/70 mb-4">Category</h3>
            <div className="space-y-3">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-foreground/80">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-widest font-bold text-foreground/70 mb-4">Difficulty</h3>
            <div className="space-y-3">
              {difficulties.map((diff) => (
                <label key={diff} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDifficulties.includes(diff)}
                    onChange={() => toggleFilter(diff, selectedDifficulties, setSelectedDifficulties)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-foreground/80">{diff}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Era Filter */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-foreground/70 mb-4">Era</h3>
            <div className="space-y-3">
              {eras.map((era) => (
                <label key={era} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedEras.includes(era)}
                    onChange={() => toggleFilter(era, selectedEras, setSelectedEras)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-foreground/80">{era}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Sort Row */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
              <input
                type="text"
                placeholder="Search by Title, Author, or Topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400/50 text-foreground placeholder:text-gray-500"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400/50 text-foreground font-sans"
            >
              <option value="recommended">AI Recommended</option>
              <option value="popular">Most Popular</option>
              <option value="added">Newly Added</option>
            </select>
          </div>

          {/* Book Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group cursor-pointer"
              >
                {/* Book Cover */}
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={book.cover || "/placeholder.svg"}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h3 className="font-bold text-foreground text-sm line-clamp-2 mb-1">{book.title}</h3>
                  <p className="text-xs text-gray-600 mb-3">{book.author}</p>
                  <p className="text-xs text-gray-700 line-clamp-2 mb-4 leading-relaxed">{book.summary}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {book.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 font-sans">No books found matching your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating AI Guide Button */}
      <button className="fixed bottom-8 right-8 bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-900 transition-colors shadow-lg group">
        <Sparkles className="w-5 h-5" />
        <span className="font-sans font-medium">AI Guide</span>
      </button>
    </div>
  )
}
