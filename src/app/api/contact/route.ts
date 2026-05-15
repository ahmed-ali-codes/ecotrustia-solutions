import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'contacts.json');

// Helper function to read and parse the JSON data file
async function readContactsFile() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist or is empty, return an empty array
    return [];
  }
}

export async function GET() {
  try {
    const contacts = await readContactsFile();
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Failed to read contacts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, message, subject, services } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const contacts = await readContactsFile();
    const newId = contacts.length > 0 ? Math.max(...contacts.map((c: { id: number }) => c.id)) + 1 : 1;

    const newSubmission = {
      id: newId,
      name,
      email,
      message,
      subject: subject || '',
      services: services || [],
      date: new Date().toISOString(),
      status: 'pending',
    };

    contacts.push(newSubmission);
    await fs.writeFile(dataFilePath, JSON.stringify(contacts, null, 2));
    return NextResponse.json(newSubmission, { status: 201 });
  } catch (error) {
    console.error('Failed to create contact:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Submission ID is required' }, { status: 400 });
    }

    let contacts = await readContactsFile();
    const initialLength = contacts.length;
    contacts = contacts.filter((s: { id: number }) => s.id !== id);

    if (contacts.length === initialLength) {
      return NextResponse.json({ message: 'Submission not found' }, { status: 404 });
    }

    await fs.writeFile(dataFilePath, JSON.stringify(contacts, null, 2));
    return NextResponse.json({ message: 'Submission deleted successfully' });
  } catch (error) {
    console.error('Failed to delete contact:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'Submission ID and status are required' }, { status: 400 });
    }

    const contacts = await readContactsFile();
    const submissionIndex = contacts.findIndex((s: { id: number }) => s.id === id);

    if (submissionIndex === -1) {
      return NextResponse.json({ message: 'Submission not found' }, { status: 404 });
    }

    contacts[submissionIndex].status = status;
    await fs.writeFile(dataFilePath, JSON.stringify(contacts, null, 2));
    return NextResponse.json(contacts[submissionIndex]);
  } catch (error) {
    console.error('Failed to update contact:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}