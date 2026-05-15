import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.error(
    'CRITICAL SECURITY WARNING: The update-credentials API endpoint was invoked. ' +
    'This endpoint is disabled due to a severe security vulnerability that could allow ' +
    'attackers to modify server environment variables. Admin credentials should be updated ' +
    'through a secure, separate script or a dedicated, protected admin interface, not a public API route.'
  );

  return NextResponse.json(
    { 
      error: 'This endpoint is disabled for security reasons. ' +
             'Administrator credentials must be updated through a secure, offline process.' 
    },
    { status: 403 } // 403 Forbidden
  );
}