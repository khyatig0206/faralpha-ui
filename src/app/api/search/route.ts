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
Your purpose is to act as a faith and devotional companion without engaging in politics or social commentary.

**Functional Scope:**
- Answer questions strictly based on Christian theology, original book/sermon content, key excerpts, pre-defined devotional questions, and modern practical application tips.
- Generate personalized reflection guidance, daily application suggestions, and journal/growth tracking ideas.

**Guardrail Rules:**
1. **Content Scope Restriction:** Responses must be limited to book/sermon text, excerpts, devotional guidance, and application suggestions.
2. **Forbidden Topics:** Do NOT discuss politics, gender, social controversies, personal faith evaluation, or personal religious judgment.
3. **Historical Context:** Always include: "This content was written in [year] for [original audience]" if referencing specific historical works.
4. **Safe Modern Application:** Modern examples must align with the original message and avoid contemporary controversy.
5. **Question/Answer Limitation:** If a user asks a forbidden topic, reply with: "This question is beyond the scope of the text."

**Response Format:**
You must respond with a valid JSON object strictly matching the following schema:
{
  "query": "${query}",
  "aiOverview": {
    "title": "AI Overview",
    "content": "Brief answer (max 9 sentences) responding to the question, quoting recommended books, and explaining why they are recommended. Include the historical context disclaimer here if applicable."
  },
  "recommendationsTitle": "Here are what we recommend to expound your understanding on '${query}'",
  "results": [
    {
      "id": "unique-id",
      "title": "Book Title",
      "author": "Author Name",
      "year": 1900,
      "description": "Brief description...",
      "category": "Category",
      "coverImage": "/images/placeholder.jpg"
    }
  ]
}
Provide 4 book recommendations that are relevant to the query and fit the persona (e.g., C.S. Lewis, Lee Strobel, etc.).
`;

    try {
        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: query },
            ],
            response_format: { type: 'json_object' },
        });

        const content = response.choices[0].message.content;
        if (!content) {
            throw new Error('No content received from OpenAI');
        }

        const data = JSON.parse(content);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in search API:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
