"use client";

import { useState, useMemo } from "react";
import { Search, Filter, X, ChevronDown, Check } from "lucide-react";

// --- TYPES ---
type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
  century: number;
  era: "Early Church" | "Pre-Reformation" | "Reformation" | "Modern";
  image: string;
};

// --- MOCK DATA ---
const ALL_BOOKS: Book[] = [
  // 1st - 5th Century (Early Church)
  { id: "1", title: "Didache", author: "Unknown", year: 100, century: 1, era: "Early Church", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000" },
  { id: "2", title: "Confessions", author: "Augustine of Hippo", year: 397, century: 4, era: "Early Church", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=1000" },
  { id: "3", title: "City of God", author: "Augustine of Hippo", year: 426, century: 5, era: "Early Church", image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=1000" },
  { id: "4", title: "On the Incarnation", author: "Athanasius", year: 318, century: 4, era: "Early Church", image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&q=80&w=1000" },
  
  // 16th Century (Reformation)
  { id: "5", title: "The Bondage of the Will", author: "Martin Luther", year: 1525, century: 16, era: "Reformation", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1000" },
  { id: "6", title: "Institutes of the Christian Religion", author: "John Calvin", year: 1536, century: 16, era: "Reformation", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1000" },
  
  // 17th - 19th Century (Post-Reformation / Modern)
  { id: "7", title: "The Pilgrim's Progress", author: "John Bunyan", year: 1678, century: 17, era: "Reformation", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1000" },
  
  // 20th - 21st Century (Modern)
  { id: "8", title: "Mere Christianity", author: "C.S. Lewis", year: 1952, century: 20, era: "Modern", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1000" },
  { id: "9", title: "The Cost of Discipleship", author: "Dietrich Bonhoeffer", year: 1937, century: 20, era: "Modern", image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&q=80&w=1000" },
  { id: "10", title: "Knowing God", author: "J.I. Packer", year: 1973, century: 20, era: "Modern", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1000" },
];

const ERAS = ["Early Church", "Reformation", "Modern"];
const CENTURIES = Array.from({ length: 21 }, (_, i) => i + 1); // [1, 2, ... 21]

export default function LibraryPage() {
  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const [selectedCentury, setSelectedCentury] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false); // Mobile toggle

  // --- FILTER LOGIC ---
  const filteredBooks = useMemo(() => {
    return ALL_BOOKS.filter((book) => {
      // 1. Author Search
      const matchesSearch = book.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 2. Era Filter
      const matchesEra = selectedEra ? book.era === selectedEra : true;
      
      // 3. Century Filter
      const matchesCentury = selectedCentury ? book.century === selectedCentury : true;

      return matchesSearch && matchesEra && matchesCentury;
    });
  }, [searchQuery, selectedEra, selectedCentury]);

  // --- HANDLERS ---
  const clearFilters = () => {
    setSelectedEra(null);
    setSelectedCentury(null);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* Page Header */}
      <div className="bg-gray-50/50 border-b border-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            The Library
          </h1>
          <p className="text-gray-500 max-w-2xl text-lg">
            Explore 2,000 years of Christian thought. Filter by era, century, or search for your favorite theologians.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* --- SIDEBAR FILTERS --- */}
        <aside className={`lg:w-64 flex-shrink-0 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          
          {/* Active Filters Summary */}
          {(selectedEra || selectedCentury) && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Active Filters</span>
                <button onClick={clearFilters} className="text-xs text-blue-600 hover:underline">Clear all</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedEra && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                    {selectedEra} <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedEra(null)}/>
                  </span>
                )}
                {selectedCentury && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                    {selectedCentury}th Century <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCentury(null)}/>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Era Filter */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">By Era</h3>
            <div className="space-y-2">
              {ERAS.map((era) => (
                <label key={era} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${selectedEra === era ? 'border-black bg-black' : 'border-gray-300 group-hover:border-gray-400'}`}>
                    {selectedEra === era && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                  <input 
                    type="radio" 
                    name="era" 
                    className="hidden" 
                    checked={selectedEra === era} 
                    onChange={() => {
                        setSelectedEra(era); 
                        setSelectedCentury(null); // Optional: clear century if era changes
                    }} 
                  />
                  <span className={`text-sm ${selectedEra === era ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>{era}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Century Filter */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">By Century</h3>
            <div className="grid grid-cols-3 gap-2">
              {CENTURIES.map((cent) => (
                <button
                  key={cent}
                  onClick={() => setSelectedCentury(selectedCentury === cent ? null : cent)}
                  className={`px-2 py-1.5 text-xs rounded border transition-all ${
                    selectedCentury === cent 
                      ? "bg-black text-white border-black" 
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {cent}th
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-1">
          
          {/* Search Bar & Mobile Filter Toggle */}
          <div className="flex gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by author name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:border-gray-400 focus:bg-white transition-all"
              />
            </div>
            
            {/* Mobile Filter Button */}
            <button 
              className="lg:hidden px-4 py-2 border border-gray-200 rounded-full flex items-center gap-2 hover:bg-gray-50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
            </button>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div key={book.id} className="group cursor-pointer">
                  {/* Book Cover / Card */}
                  <div className="relative aspect-[3/4] mb-4 rounded-xl overflow-hidden bg-gray-100 shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                    <img 
                        src={book.image} 
                        alt={book.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                         <span className="inline-block px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-wider mb-2 border border-white/20">
                            {book.century}th Century
                         </span>
                    </div>
                  </div>
                  
                  {/* Metadata */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                        {book.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">{book.author}</p>
                    <p className="text-xs text-gray-400 mt-1">{book.year} AD</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No books found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query.</p>
                <button onClick={clearFilters} className="mt-4 text-sm font-semibold text-blue-600 hover:underline">
                    Clear all filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}