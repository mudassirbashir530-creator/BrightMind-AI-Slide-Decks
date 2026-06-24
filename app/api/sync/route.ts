import { NextRequest, NextResponse } from 'next/server';

interface SyncSession {
  day: number;
  slideIndex: number;
  lastUpdated: number;
}

// In-Memory Global Store for Session Syncing (works inside Cloud Run / Node containers)
const globalForSync = global as unknown as {
  sessions?: Map<string, SyncSession>;
};

if (!globalForSync.sessions) {
  globalForSync.sessions = new Map();
}

const sessions = globalForSync.sessions;

// Clean stale sessions (older than 3 hours) to prevent leaks
const CLEANUP_INTERVAL = 3 * 60 * 60 * 1000; // 3 hours
let lastCleanup = Date.now();

function performCleanup() {
  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL) {
    for (const [code, session] of sessions.entries()) {
      if (now - session.lastUpdated > CLEANUP_INTERVAL) {
        sessions.delete(code);
      }
    }
    lastCleanup = now;
  }
}

export async function GET(req: NextRequest) {
  performCleanup();
  const { searchParams } = new URL(req.url);
  const sessionCode = searchParams.get('sessionCode')?.toUpperCase();

  if (!sessionCode) {
    return NextResponse.json({ success: false, error: 'Session code is required' }, { status: 400 });
  }

  const session = sessions.get(sessionCode);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    day: session.day,
    slideIndex: session.slideIndex,
    lastUpdated: session.lastUpdated,
  });
}

export async function POST(req: NextRequest) {
  performCleanup();
  try {
    const { action, sessionCode, day, slideIndex } = await req.json();

    if (action === 'host') {
      let code = sessionCode?.trim().toUpperCase();
      if (!code) {
        code = `CAMP-${Math.floor(1000 + Math.random() * 9000)}`;
      }
      
      sessions.set(code, {
        day: day || 1,
        slideIndex: slideIndex || 0,
        lastUpdated: Date.now(),
      });

      return NextResponse.json({ success: true, sessionCode: code });
    }

    if (action === 'update') {
      const code = sessionCode?.trim().toUpperCase();
      if (!code) {
        return NextResponse.json({ success: false, error: 'Session code is required' }, { status: 400 });
      }

      sessions.set(code, {
        day: day || 1,
        slideIndex: slideIndex || 0,
        lastUpdated: Date.now(),
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Server error' }, { status: 500 });
  }
}
