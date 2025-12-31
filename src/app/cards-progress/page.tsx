"use client"

import { useState } from "react"
import { Flame, BookOpen, PieChart, Clock, X, RotateCcw, Lightbulb, Sparkles, ChevronDown } from "lucide-react"
import { Button } from "@/src/components/ui/button"

interface Card {
  id: string
  title: string
  author: string
  tags: string[]
  year?: string
  originalExcerpt: string
  modernExcerpt: string
  contextNote: string
  aiQuestion: string
  applicationTip: string
  meditationPoints: string[]
}

const devotionalCards: Card[] = [
  {
    id: "1",
    title: "On Morning Prayer",
    author: "C.S. Lewis",
    tags: ["Prayer", "Daily Life"],
    year: "1952",
    originalExcerpt:
      "Prayer is the most powerful thing we can do. It aligns our hearts with God's will and opens doors we cannot see.",
    modernExcerpt:
      "When we pray, we're simply having an honest conversation with God. It's how we realign ourselves with what truly matters.",
    contextNote: "From Lewis's personal reflections on faith and practice",
    aiQuestion: "How does this change your view on starting your day intentionally?",
    applicationTip: "Set aside 10 minutes each morning for quiet reflection before checking your phone.",
    meditationPoints: [
      "The power of consistent prayer",
      "Starting your day with intention",
      "Aligning with divine purpose",
    ],
  },
  {
    id: "2",
    title: "Faith and Doubt",
    author: "Oswald Chambers",
    tags: ["Theology", "Faith"],
    year: "1935",
    originalExcerpt: "Doubt is not the opposite of faith; it's faith that has lost its focus.",
    modernExcerpt: "Doubt doesn't mean you're unfaithful—it means you're looking for clarity in the right places.",
    contextNote: "Chambers on navigating uncertainty in spiritual life",
    aiQuestion: "What doubts in your faith journey could actually strengthen your trust?",
    applicationTip: "Journal about one doubt you have and what it reveals about your spiritual growth.",
    meditationPoints: ["Understanding doubt in faith", "Deepening through questioning", "Trust beyond understanding"],
  },
  {
    id: "3",
    title: "Love as Action",
    author: "Corrie ten Boom",
    tags: ["Love", "Application"],
    year: "1971",
    originalExcerpt: "Love is not just a feeling, but a choice and a commitment to act on that choice.",
    modernExcerpt:
      "Real love means showing up—not just feeling warmly about someone, but actively choosing their good.",
    contextNote: "Ten Boom's reflections from her experiences during WWII",
    aiQuestion: "Who in your life needs you to show love through action, not just words?",
    applicationTip: "Perform one act of service today without expecting recognition.",
    meditationPoints: ["Love as deliberate action", "Sacrifice and commitment", "Living love practically"],
  },
  {
    id: "4",
    title: "Scripture Memorization",
    author: "Phyllis Schlafly",
    tags: ["Scripture", "Discipline"],
    year: "1980",
    originalExcerpt: "The Word stored in our hearts becomes our spiritual sword in times of need.",
    modernExcerpt: "When God's words live in your mind and heart, they become your anchor when life gets uncertain.",
    contextNote: "On the spiritual discipline of biblical memorization",
    aiQuestion: "What Scripture passage speaks most powerfully to your current season?",
    applicationTip: "Memorize one verse this week. Say it aloud each morning.",
    meditationPoints: ["Power of Scripture", "Building spiritual resilience", "God's word as foundation"],
  },
  {
    id: "5",
    title: "Serving Others Humbly",
    author: "Mother Teresa",
    tags: ["Service", "Humility"],
    year: "1997",
    originalExcerpt: "We cannot all do great things. But we can do small things with great love.",
    modernExcerpt: "Impact isn't about grand gestures—it's about bringing genuine care to everyday moments.",
    contextNote: "Mother Teresa on the spiritual practice of humble service",
    aiQuestion: "How can you serve someone today in a way that shows genuine love?",
    applicationTip: "Notice one small way you can help someone today—a word, a gesture, a meal.",
    meditationPoints: ["Greatness in humility", "Small acts of love", "Serving with heart"],
  },
  {
    id: "6",
    title: "Grace Beyond Measure",
    author: "John Newton",
    tags: ["Grace", "Theology"],
    year: "1779",
    originalExcerpt: "Grace is not just forgiveness—it's the boundless love of God made personal to us.",
    modernExcerpt: "Grace means God looks at you—all your mess and struggle—and chooses to love you anyway.",
    contextNote: "Newton's reflection after his own dramatic spiritual transformation",
    aiQuestion: "Where do you need to extend grace to yourself as God extends it to you?",
    applicationTip: "Write down three things you haven't forgiven yourself for, then release them.",
    meditationPoints: ["Understanding grace", "Personal transformation", "God's inexhaustible love"],
  },
]

export default function CardsTrackerPage() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [isOriginalText, setIsOriginalText] = useState(true)
  const [expandedGuide, setExpandedGuide] = useState(false)
  const [reflection, setReflection] = useState("")

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-[#EEC9C9]">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/60 backdrop-blur-md border-b border-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Tracker Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 font-serif">Your Progress</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Streak Card */}
            <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Flame className="w-6 h-6 text-orange-500" />
                <span className="text-sm text-gray-600">Current Streak</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">7 Days</p>
            </div>

            {/* Cards Read Card */}
            <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-blue-500" />
                <span className="text-sm text-gray-600">Cards Read</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">42 Total</p>
            </div>

            {/* Topic Completion Card */}
            <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <PieChart className="w-6 h-6 text-purple-500" />
                <span className="text-sm text-gray-600">Topic Completion</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">60%</p>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>

          {/* History Button */}
          <Button variant="outline" className="gap-2 bg-transparent">
            <Clock className="w-4 h-4" />
            View History & Journal
          </Button>
        </section>

        {/* Devotional Cards Section */}
        <section>
          <h2 className="text-4xl font-bold text-gray-900 mb-8 font-serif">Today's Recommendations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devotionalCards.map((card) => (
              <button
                key={card.id}
                onClick={() => setSelectedCard(card)}
                className="text-left bg-white/60 backdrop-blur-md border border-white/50 rounded-xl shadow-sm p-6 hover:shadow-md hover:border-white/70 transition-all duration-200 cursor-pointer"
              >
                <h3 className="font-bold text-gray-900 text-lg mb-1">{card.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{card.author}</p>
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span key={tag} className="inline-block bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Expanded Card Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-md border border-white/50 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedCard(null)
                setReflection("")
                setExpandedGuide(false)
              }}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Modal Content */}
            <div className="p-8">
              {/* Header */}
              <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif">{selectedCard.title}</h2>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">{selectedCard.author}</span>
                {selectedCard.year && ` • ${selectedCard.year}`}
              </p>
              <p className="text-sm text-gray-500 italic mb-6">{selectedCard.contextNote}</p>

              {/* Excerpt Section */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-semibold text-gray-700">
                    {isOriginalText ? "Original Text" : "Modern Version"}
                  </span>
                  <button
                    onClick={() => setIsOriginalText(!isOriginalText)}
                    className="ml-auto relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isOriginalText ? "translate-x-1" : "translate-x-6"
                      }`}
                    />
                  </button>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-gray-700 leading-relaxed">
                  {isOriginalText ? selectedCard.originalExcerpt : selectedCard.modernExcerpt}
                </div>
              </div>

              {/* Reflection Section */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Reflect on This</h3>
                <p className="font-semibold text-gray-900 mb-4">{selectedCard.aiQuestion}</p>
                <Button variant="outline" className="gap-2 mb-6 bg-transparent">
                  <RotateCcw className="w-4 h-4" />
                  Suggest Another Question
                </Button>

                {/* Application Tip */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
                  <Lightbulb className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-900">{selectedCard.applicationTip}</p>
                </div>
              </div>

              {/* Journaling Section */}
              <div className="mb-8">
                <label className="block font-bold text-gray-900 mb-3">Your Reflection</label>
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Write your thoughts here..."
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">Auto-saving to history...</p>
              </div>

              {/* AI Guide Accordion */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedGuide(!expandedGuide)}
                  className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-gray-900">Deeper Meditation (AI Guide)</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform ${expandedGuide ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedGuide && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Suggested Prayer Points:</h4>
                    <ul className="space-y-2">
                      {selectedCard.meditationPoints.map((point, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex gap-2">
                          <span className="text-purple-600 font-bold">{idx + 1}.</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
