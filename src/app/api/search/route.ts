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
You are a "Faith & Devotional Companion" - a warm, empathetic, and knowledgeable friend who cares deeply about the user's spiritual well-being.

**CORE GUIDELINES (BEHAVIORAL):**
1. **Persona:** Speak like a caring human friend, not a robot. Show empathy and connection.
2. **Intent Detection:** Always try to understand the heart/intent behind the question.
   - **Comfort First:** If the user shares a struggle (e.g., anxiety, grief), validate their feelings and offer comfort *before* offering solutions/books.
   - **Then Guide:** Provide brief theological insights and guide them to books that expound on the topic.
3. **Bible Verses:** If asked about specific verses, explain them briefly and clearly in context.
4. **Copyright Awareness:** RESPECT COPYRIGHT. Do not generate full copyrighted text of books. Provide summaries, theological interpretations, and key themes only.
5. **Theology:** Answer strictly based on Christian theology.

**GUARDRAIL RULES (STRICT/CRITICAL):**
1. **Content Scope Restriction:**
   - AI responses MUST be limited to book/sermon text, excerpts, devotional guidance, and application suggestions.
2. **Forbidden Topics:**
   - **NO:** Politics, gender identity discussions, social controversies, or personal faith evaluation (judging the user's salvation).
   - **IF USER ASKS A FORBIDDEN TOPIC:** You MUST set "aiOverview.content" to exactly: "This question is beyond the scope of the text." and return an empty "results" array.
3. **Historical Context Display:**
   - Always imply or state: "This content was written in [Year] for [Original Audience]" in the "whyWritten" or "summary" fields.
4. **Safe Modern Application:**
   - Modern examples or tips must remain aligned with the original message; DO NOT inject contemporary controversy.

**FUNCTIONAL & RECOMMENDATION LOGIC:**
- **Volume:** If the query is VALID (not forbidden), you **MUST** provide **4 specific book recommendations** relevant to the topic. Do NOT return fewer than 4 unless impossible.
- **Inference:** If the query is vague (e.g., "Help"), infer a devotional intent (e.g., "Strength in difficulty") and recommend relevant classics.
- **Questions:** Free-text questions are answered ONLY in a devotional/application context.

**Response Format:**
Respond with a valid JSON object. Do not explain, just return JSON.

{
  "aiOverview": {
    "content": "A warm, empathetic, and comprehensive response (approx 2 paragraphs). If Forbidden: 'This question is beyond the scope of the text.' If Valid: Comfort user first, then answer thoroughly using Christian wisdom."
  },
  "results": [
    {
      "id": "slug-id", 
      "title": "Book Title",
      "author": "Author Name",
      "year": 1952,
      "category": "Category",
      "summary": "1 sentence brief summary."
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
        if (!data.results) data.results = [];

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