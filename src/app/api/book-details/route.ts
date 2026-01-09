export const runtime = "nodejs";
import { openai } from '@/src/lib/ai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // We expect { query, title, author }
        const { query, title, author } = body;

        if (!title || !author) {
            return NextResponse.json({ error: 'Title and Author required' }, { status: 400 });
        }

        const systemPrompt = `
You are a "Faith & Devotional Companion".
You are analyzing the book "${title}" by "${author}" in the context of the user's query: "${query || 'General Spiritual Growth'}".

**Goal:** Provide specific devotional insights.

**Response Format:**
Respond with a valid JSON object. Do not include markdown formatting (like \`\`\`json).
            {
                "applicationParagraph": "One single paragraph (approx 3 sentences). Must start with: 'This book was written for [original audience] and today teaches us [core message]...'",
                "aiInterpretation": "2-3 sentences on the theological argument and how it applies to the user's query.",
                "quotes": ["Excerpts/Quote 1", "Excerpts/Quote 2", "Excerpts/Quote 3"],
                "devotionalQuestion": "A provocative, open-ended question for personal reflection based on the book's theme.",
                "practicalTip": "A short, actionable practice or habit the user can try today."
}
        `;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `Analyze "${title}"` },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.7,
        });

        const content = response.choices[0].message.content;
        if (!content) throw new Error('No content from OpenAI');

        return NextResponse.json(JSON.parse(content));

    } catch (error) {
        console.error("Error in book-details:", error);
        return NextResponse.json({ error: "Failed to fetch details" }, { status: 500 });
    }
}
