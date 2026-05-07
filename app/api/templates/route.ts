import { NextRequest, NextResponse } from 'next/server';

// This is a placeholder API route for future enhancements
// Currently, Firestore is accessed directly from the client

export async function GET() {
  return NextResponse.json(
    { message: 'Use client-side Firestore operations' },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { message: 'Use client-side Firestore operations' },
    { status: 200 }
  );
}
