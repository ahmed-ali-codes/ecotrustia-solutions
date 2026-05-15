import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

// Ensure JWT_SECRET is set, otherwise throw an error during startup.
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHashB64 = process.env.ADMIN_PASSWORD_HASH;

  if (!adminUsername || !adminPasswordHashB64) {
    return NextResponse.json({ error: 'Admin credentials not configured' }, { status: 500 });
  }

  // Decode the base64-encoded bcrypt hash (stored this way to avoid
  // dotenv $ variable expansion corrupting the bcrypt hash)
  const adminPasswordHash = Buffer.from(adminPasswordHashB64, 'base64').toString('utf-8');

  const isPasswordValid = await bcrypt.compare(password, adminPasswordHash);

  if (username === adminUsername && isPasswordValid) {
    const token = await new SignJWT({ username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(JWT_SECRET);

    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 3600, // 1 hour in seconds
    });
    return response;
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}