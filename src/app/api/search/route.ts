export const runtime = "nodejs";
import { openai } from '@/src/lib/ai'; 
import { NextResponse } from 'next/server';

// Helper function to fetch cover from Google Books API
async function fetchBookCover(title: string, author: string) {
    try {
        const query = `intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}`;
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`);
        
        if (!res.ok) return null;
        
        const data = await res.json();
        const book = data.items?.[0]?.volumeInfo;
        
        // Get the thumbnail if it exists
        const imageLink = book?.imageLinks?.thumbnail || book?.imageLinks?.smallThumbnail;
        
        // Ensure HTTPS to avoid mixed content warnings
        return imageLink ? imageLink.replace('http://', 'https://') : null;
    } catch (error) {
        console.error(`Failed to fetch cover for ${title}:`, error);
        return null;
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
    }

    const systemPrompt = `
You are a "Faith & Devotional Companion".

**Functional Scope:**
- Answer strictly based on Christian theology.
- Provide 4 book recommendations relevant to the query.

**Response Format:**
You must respond with a valid JSON object strictly matching the following schema. 
*CRITICAL: Do not cut off the response. Ensure valid JSON.*

{
  "aiOverview": {
    "content": "Brief answer (max 6 sentences) responding to the query '${query}'."
  },
  "results": [
    {
      "id": "slug-id", 
      "title": "Book Title",
      "author": "Author Name",
      "year": 1952,
      "category": "Category",
      "summary": "1 sentence summary.",
      "whyWritten": "2 sentences on why this book was written.",
      "aiInterpretation": "2 sentences on the theological argument.",
      "quotes": ["Quote 1"]
    }
  ]
}
`;

    try {
        // 1. Ask AI for the recommendations (Metadata only)
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini', 
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: query },
            ],
            response_format: { type: 'json_object' },
            max_tokens: 2000, 
            temperature: 0.7,
        });

        const content = response.choices[0].message.content;
        if (!content) throw new Error('No content received from OpenAI');
        
        // Check for truncation
        if (!content.trim().endsWith('}')) {
             throw new Error('Response truncated');
        }

        const data = JSON.parse(content);

        // 2. Enhance results with Real Images from Google Books
        // We run this in parallel for speed
        const resultsWithImages = await Promise.all(data.results.map(async (book: any) => {
            const realCover = await fetchBookCover(book.title, book.author);
            
            return {
                ...book,
                // Use real cover if found, otherwise fallback to a generic placeholder
                image: realCover || "https://placehold.co/400x600?text=No+Cover+Found" 
            };
        }));

        // 3. Return combined data
        return NextResponse.json({
            aiOverview: data.aiOverview,
            results: resultsWithImages
        });

    } catch (error) {
        console.error('Error in search API:', error);
        return NextResponse.json({ 
            aiOverview: { content: "We are currently experiencing high traffic. Please try again." },
            results: [] 
        }, { status: 200 });
    }
}