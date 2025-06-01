import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a helpful real estate assistant. Answer questions about property, renting, investment, and real estate contracts.' },
        ...messages,
      ],
      max_tokens: 500,
    });

    const aiMessage = completion.choices[0].message?.content || 'Sorry, I could not generate a response.';
    return NextResponse.json({ message: aiMessage });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
} 