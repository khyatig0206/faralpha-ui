import { Menu, Search } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { BookCarousel } from "@/src/components/book-carousel/book-carousel";

export default function LandingPage() {
  // Mock Data
  const recommendedBooks = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Book ${i + 1}`,
  }));

  const christianThoughts = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Thought ${i + 1}`,
  }));

  const theologyBooks = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Theology ${i + 1}`,
  }));

  return (
    // Fixed: 'bg-linear-to-b' -> 'bg-gradient-to-b' for standard Tailwind
    <div className="min-h-screen bg-linear-to-b from-white to-[#EEC9C9]">
    
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-6 py-16 md:py-24">
        {/* Added 'font-sans' to force Boring Sans */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans text-center mb-8 text-balance text-gray-900">
          Where should we begin ?
        </h1>

        {/* Search Bar */}
        <div className="w-full max-w-2xl mb-4">
          <div className="flex items-center gap-4 bg-gray-200/50 backdrop-blur-sm rounded-full px-6 py-4 shadow-sm border border-white/20">
            <Menu className="w-5 h-5 text-gray-600 shrink-0" />
            <input
              type="text"
              placeholder="Hinted search text"
              className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-500 font-sans"
            />
            <Search className="w-5 h-5 text-gray-600 shrink-0" />
          </div>
        </div>

        <p className="text-sm text-gray-600 text-center font-sans">
          Search by authors, books or topics …
        </p>
      </div>

      {/* Content Sections */}
      <div className="pb-16 space-y-12 px-4 md:px-8">
        <BookCarousel title="Recommended Books" items={recommendedBooks} />
        <BookCarousel title="Christian Thoughts" items={christianThoughts} />
        <BookCarousel title="Theology Books" items={theologyBooks} />
      </div>
    </div>
  );
}