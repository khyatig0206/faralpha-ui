"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Book {
    id: string
    title: string
    author: string
    year: string | number
    image: string
    coverImage?: string
    category: string
    summary: string

    // Deep Details (Fetched On Demand)
    applicationParagraph?: string // "This book was written for [audience]..."
    devotionalQuestion?: string   // "What does obedience mean..."
    practicalTip?: string         // "Try this today..."
    quotes?: string[]

    // Deprecated / Backwards Compat
    whyWritten?: string
    aiInterpretation?: string
}

export interface SearchResponse {
    aiOverview: {
        content: string
    }
    results: Book[]
}

interface SearchContextType {
    data: SearchResponse | null
    query: string
    setSearchState: (query: string, data: SearchResponse) => void
    clearSearchState: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<SearchResponse | null>(null)
    const [query, setQuery] = useState("")

    const setSearchState = (newQuery: string, newData: SearchResponse) => {
        setQuery(newQuery)
        setData(newData)
    }

    const clearSearchState = () => {
        setQuery("")
        setData(null)
    }

    return (
        <SearchContext.Provider value={{ data, query, setSearchState, clearSearchState }}>
            {children}
        </SearchContext.Provider>
    )
}

export function useSearchContext() {
    const context = useContext(SearchContext)
    if (context === undefined) {
        throw new Error('useSearchContext must be used within a SearchProvider')
    }
    return context
}
