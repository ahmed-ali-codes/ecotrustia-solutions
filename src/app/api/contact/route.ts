import { NextResponse } from 'next/server';
import { readJsonBlob, writeJsonBlob } from '../../../lib/blob-storage';

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  subject: string;
  services: string[];
  date: string;
  status: string;
}

const DATA_KEY = 'data/contacts.json';

export async function GET() {
  try {
    const contacts = await readJsonBlob<Contact>(DATA_KEY);
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

    const contacts = await readJsonBlob<Contact>(DATA_KEY);
    const newId = contacts.length > 0 ? Math.max(...contacts.map((c) => c.id)) + 1 : 1;

    const newSubmission: Contact = {
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
    await writeJsonBlob(DATA_KEY, contacts);
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

    let contacts = await readJsonBlob<Contact>(DATA_KEY);
    const initialLength = contacts.length;
    contacts = contacts.filter((s) => s.id !== id);

    if (contacts.length === initialLength) {
      return NextResponse.json({ message: 'Submission not found' }, { status: 404 });
    }

    await writeJsonBlob(DATA_KEY, contacts);
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

    const contacts = await readJsonBlob<Contact>(DATA_KEY);
    const submissionIndex = contacts.findIndex((s) => s.id === id);

    if (submissionIndex === -1) {
      return NextResponse.json({ message: 'Submission not found' }, { status: 404 });
    }

    contacts[submissionIndex].status = status;
    await writeJsonBlob(DATA_KEY, contacts);
    return NextResponse.json(contacts[submissionIndex]);
  } catch (error) {
    console.error('Failed to update contact:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}