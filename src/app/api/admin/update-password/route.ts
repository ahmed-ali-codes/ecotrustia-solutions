import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and Password are required' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Base64-encode the hash to avoid dotenv $ variable expansion issues
    const base64Hash = Buffer.from(hashedPassword).toString('base64');

    const envPath = path.resolve(process.cwd(), '.env.local');
    let envFileContent = await fs.readFile(envPath, 'utf-8');

    // Update Username
    const usernameRegex = /^ADMIN_USERNAME=.*$/m;
    if (usernameRegex.test(envFileContent)) {
      envFileContent = envFileContent.replace(usernameRegex, `ADMIN_USERNAME=${username}`);
    } else {
      envFileContent += `\nADMIN_USERNAME=${username}`;
    }

    // Update Password Hash
    const passwordRegex = /^ADMIN_PASSWORD_HASH=.*$/m;
    if (passwordRegex.test(envFileContent)) {
      envFileContent = envFileContent.replace(passwordRegex, `ADMIN_PASSWORD_HASH=${base64Hash}`);
    } else {
      envFileContent += `\nADMIN_PASSWORD_HASH=${base64Hash}`;
    }

    await fs.writeFile(envPath, envFileContent);

    return NextResponse.json({ message: 'Credentials updated successfully' });
  } catch (error) {
    console.error('Error updating credentials:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}