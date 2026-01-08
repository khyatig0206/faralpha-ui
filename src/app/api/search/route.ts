export const runtime = "nodejs";
import { openai } from '@/src/lib/ai'; 
import { NextResponse } from 'next/server';

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
      "coverImage": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop", 
      "summary": "1 sentence summary.",
      "whyWritten": "2 sentences on why this book was written.",
      "aiInterpretation": "2 sentences on the theological argument.",
      "quotes": ["Quote 1"]
    }
  ]
}
`;

    try {
        const response = await openai.chat.completions.create({
            // FIXED: Use the correct model name. 'gpt-4o-mini' is strictly better for JSON.
            model: 'gpt-4o-mini', 
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: query },
            ],
            // This forces the AI to output valid JSON
            response_format: { type: 'json_object' },
            // Ensure enough tokens are reserved for the answer
            max_tokens: 2000, 
            temperature: 0.7,
        });

        const content = response.choices[0].message.content;
        if (!content) throw new Error('No content received from OpenAI');

        // Check if the content looks cut off before parsing
        if (!content.trim().endsWith('}')) {
             console.error("OpenAI response truncated:", content.substring(content.length - 100));
             throw new Error('Response truncated');
        }

        const data = JSON.parse(content);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in search API:', error);
        return NextResponse.json({ 
            aiOverview: { content: "We are currently experiencing high traffic. Please try again." },
            results: [] 
        }, { status: 200 }); // Return empty valid data instead of crashing
    }
}