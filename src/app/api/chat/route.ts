import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const systemPrompt = `You are the Ecotrustia Solutions AI Assistant. 
Ecotrustia Solutions is a premier digital agency specializing in AI development, Web3 solutions, mobile app engineering, and automation services. 
You also provide the "Neural Workbench", a suite of 40+ professional-grade digital tools (calculators, media processors, developer utilities).
When users ask for examples, references, a demo of our work, or past projects, DO NOT invent fake projects. Instead, politely direct them to view our Featured Projects portfolio at: [Ecotrustia Portfolio](/portfolio). Keep it brief and professional.
Your goal is to help visitors understand our services, navigate our tools, and feel welcomed. 
Be concise, professional, and helpful. Use a futuristic, high-tech tone but remain easy to understand.
`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured.' },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Initialize client fresh per request so key changes take effect
    const genAI = new GoogleGenerativeAI(apiKey);

    // Format history for Gemini.
    // Gemini requires history to start with role 'user', so we strip any
    // leading 'model' (assistant) messages (e.g. the greeting shown in the UI).
    const rawHistory = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));
    // Drop entries from the front until the first 'user' message.
    const firstUserIndex = rawHistory.findIndex((m) => m.role === 'user');
    const history = firstUserIndex === -1 ? [] : rawHistory.slice(firstUserIndex);

    const currentMessage = messages[messages.length - 1].content;

    // Use gemini-1.5-flash which is widely available on the free tier
    const model = genAI.getGenerativeModel({
      model: 'gemini-flash-latest',
      systemInstruction: systemPrompt,
    });

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(currentMessage);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error: unknown) {
    const err = error as { message?: string; status?: number };
    console.error('Gemini API Error:', err);

    const msg = err?.message ?? '';
    if (msg.includes('429') || msg.includes('quota')) {
      return NextResponse.json(
        { error: 'API quota exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    if (msg.includes('API_KEY_INVALID') || msg.includes('400')) {
      return NextResponse.json(
        { error: 'Invalid API key. Please check configuration.' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: 'An error occurred while communicating with the AI.' },
      { status: 500 }
    );
  }
}
