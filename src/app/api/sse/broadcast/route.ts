import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, title, content, sender } = body;

    if (!type || !title || !content) {
      return NextResponse.json(
        { error: 'type, title, and content are required' },
        { status: 400 }
      );
    }

    if (!['message', 'notification', 'reminder'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid message type' },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_SSE_URL || 'http://localhost:3000';
    const response = await fetch(`${backendUrl}/sse/broadcast`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        title,
        content,
        sender,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Backend responded with ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in SSE broadcast route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
