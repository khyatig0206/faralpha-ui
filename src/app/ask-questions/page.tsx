"use client"

import { useState } from "react"
import {
  Search,
  PlusCircle,
  MessageCircle,
  ThumbsUp,
  X,
} from "lucide-react"

// --- YOUR EXACT IMPORT PATHS ---
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, // Added for accessibility
} from "@/src/components/ui/dialog"

/* -------------------- Types -------------------- */

interface Answer {
  id: string
  author: string
  content: string
  likes: number
}

interface Question {
  id: string
  title: string
  description: string
  topic: string
  author: string
  timeAgo: string
  upvotes: number
  answersList: Answer[]
}

/* -------------------- Constants -------------------- */

const TOPICS = [
  "All Topics",
  "Theology",
  "Daily Life",
  "Scripture",
  "Relationships",
  "Prayer",
  "Church",
  "Faith",
]

const FILTERS = ["Recent", "Trending", "Unanswered"]

const INITIAL_QUESTIONS: Question[] = [
  {
    id: "1",
    title: "What is the significance of the Trinity in Christian theology?",
    description:
      "Can someone explain how the concept of the Trinity is understood across different Christian denominations?",
    topic: "Theology",
    author: "Sarah J.",
    timeAgo: "2h ago",
    upvotes: 24,
    answersList: [
      {
        id: "a1",
        author: "Pastor David M.",
        content:
          "The Trinity expresses God as three persons in one essence—Father, Son, and Holy Spirit.",
        likes: 12,
      },
    ],
  },
  {
    id: "2",
    title: "How do I start daily devotionals?",
    description:
      "I want to establish a regular devotional practice but am not sure where to begin.",
    topic: "Daily Life",
    author: "Michael R.",
    timeAgo: "4h ago",
    upvotes: 31,
    answersList: [],
  },
]

/* -------------------- Component -------------------- */

export default function AskQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("Recent")
  const [activeTopicFilter, setActiveTopicFilter] = useState("All Topics")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
  })

  /* -------------------- Handlers -------------------- */

  const handlePostQuestion = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Title and description are required.")
      return
    }

    const newQuestion: Question = {
      id: crypto.randomUUID(),
      title: formData.title,
      description: formData.description,
      topic: formData.tags || "Faith",
      author: "You",
      timeAgo: "Just now",
      upvotes: 0,
      answersList: [],
    }

    setQuestions((prev) => [newQuestion, ...prev])
    setIsModalOpen(false)
    setFormData({ title: "", description: "", tags: "" })
  }

  /* -------------------- Filtering Logic -------------------- */

  const filteredQuestions = questions
    .filter(
      (q) =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (activeTopicFilter === "All Topics" || q.topic === activeTopicFilter),
    )
    .sort((a, b) => {
      if (activeFilter === "Trending") return b.upvotes - a.upvotes
      if (activeFilter === "Unanswered") return a.answersList.length - b.answersList.length
      return 0 // Recent (default order)
    })

  /* -------------------- UI -------------------- */

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#EEC9C9]">
      {/* Header */}
      <header className="px-6 py-12">
        <h1 className="font-serif text-5xl font-bold mb-3">Community Q&A</h1>
        <p className="text-gray-600 text-lg">
          Ask questions, share insights, and grow together in faith.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-12">
        {/* Search & Ask */}
        <div className="flex gap-3 mb-8 sticky top-0 bg-gradient-to-b from-white to-[#EEC9C9] py-4 z-50">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <Input
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/60 backdrop-blur-md font-sans"
            />
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white hover:bg-gray-800 flex gap-2 font-sans"
          >
            <PlusCircle size={18} />
            Ask
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-sans transition-all ${
                activeFilter === filter
                  ? "bg-black text-white"
                  : "bg-white/60 text-gray-700 hover:bg-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Topics */}
        <div className="flex gap-2 overflow-x-auto mb-8 scrollbar-hide">
          {TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => setActiveTopicFilter(topic)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap font-sans transition-all ${
                activeTopicFilter === topic
                  ? "bg-black text-white"
                  : "bg-white/60 text-gray-700 hover:bg-white"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Questions Grid */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 && (
            <div className="text-center text-gray-500 py-16 font-sans">
              No questions found.
            </div>
          )}

          {filteredQuestions.map((q) => (
            <button
              key={q.id}
              onClick={() => setSelectedQuestion(q)}
              aria-label={`Open question ${q.title}`}
              className="w-full text-left bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 hover:shadow-lg transition-all group"
            >
              <span className="text-xs bg-black text-white px-3 py-1 rounded-full font-sans">
                {q.topic}
              </span>
              <h3 className="text-xl font-bold font-sans mt-3 mb-2 group-hover:text-black/80">{q.title}</h3>
              <p className="text-gray-600 line-clamp-2 mb-4 font-sans">{q.description}</p>
              <div className="flex justify-between text-sm text-gray-500 font-sans">
                <span>
                  {q.author} • {q.timeAgo}
                </span>
                <span className="flex gap-4">
                  <span className="flex gap-1 items-center">
                    <MessageCircle size={16} />
                    {q.answersList.length}
                  </span>
                  <span className="flex gap-1 items-center">
                    <ThumbsUp size={16} />
                    {q.upvotes}
                  </span>
                </span>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* --- MODAL 1: ASK A QUESTION --- */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">Ask a Question</DialogTitle>
            <DialogDescription>
              Share your question with the community.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Input
              placeholder="Question title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="font-sans"
            />
            <Textarea
              rows={5}
              placeholder="Describe your question"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="font-sans"
            />
            <Input
              placeholder="Topic / tags (optional)"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="font-sans"
            />
            <Button onClick={handlePostQuestion} className="w-full bg-black text-white font-sans hover:bg-gray-800">
              Post Question
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* --- MODAL 2: QUESTION DETAIL --- */}
      <Dialog open={!!selectedQuestion} onOpenChange={(open) => !open && setSelectedQuestion(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedQuestion && (
            <>
              {/* This DialogHeader block fixes the missing title error */}
              <DialogHeader>
                 <DialogTitle className="text-3xl font-bold font-serif pr-8 leading-tight">
                    {selectedQuestion.title}
                 </DialogTitle>
                 {/* Metadata Row */}
                 <div className="flex gap-2 text-sm text-gray-500 font-sans pt-2">
                    <span>{selectedQuestion.author}</span>
                    <span>•</span>
                    <span>{selectedQuestion.timeAgo}</span>
                    <span>•</span>
                    <span className="text-black font-medium">{selectedQuestion.topic}</span>
                 </div>
                 {/* Empty description to satisfy accessibility if needed, though strictly only Title is mandatory */}
                 <DialogDescription className="sr-only">
                    Details for question: {selectedQuestion.title}
                 </DialogDescription>
              </DialogHeader>

              {/* Body Content */}
              <div className="mt-4 mb-8">
                 <p className="text-gray-700 text-lg font-sans leading-relaxed">
                   {selectedQuestion.description}
                 </p>
              </div>

              {/* Answers Section */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-xl font-bold font-sans mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Answers ({selectedQuestion.answersList.length})
                </h3>

                {selectedQuestion.answersList.length === 0 ? (
                  <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500 font-sans">
                    No answers yet. Be the first to help!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedQuestion.answersList.map((a) => (
                      <div
                        key={a.id}
                        className="bg-gray-50/80 border border-gray-100 rounded-xl p-5"
                      >
                        <div className="flex justify-between items-start mb-2">
                           <span className="font-bold font-sans text-gray-900">{a.author}</span>
                           <span className="text-xs text-gray-400">Answered just now</span>
                        </div>
                        <p className="text-gray-700 mb-3 font-sans">{a.content}</p>
                        <div className="flex gap-4">
                           <button className="flex gap-1 items-center text-sm text-gray-500 hover:text-black transition-colors">
                             <ThumbsUp size={14} /> {a.likes} Helpful
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}