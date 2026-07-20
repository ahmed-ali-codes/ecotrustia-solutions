import { NextResponse } from 'next/server';
import { Project, ProjectSchema } from '../../adminx/lib/db';
import {
  readJsonBlob,
  writeJsonBlob,
  uploadImageToBlob,
} from '../../../lib/blob-storage';

const DATA_KEY = 'data/projects.json';

export async function GET() {
  const projects = await readJsonBlob<Project>(DATA_KEY);
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const newProject = await req.json();

  // Handle base64 image → upload to Vercel Blob
  if (newProject.image) {
    newProject.image = await uploadImageToBlob(newProject.image);
  }

  const result = ProjectSchema.safeParse(newProject);

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues }, { status: 400 });
  }

  const projects = await readJsonBlob<Project>(DATA_KEY);
  projects.push(result.data);
  await writeJsonBlob(DATA_KEY, projects);

  return NextResponse.json(result.data, { status: 201 });
}

export async function PUT(req: Request) {
  try {
    const projects = await req.json();
    
    if (!Array.isArray(projects)) {
      return NextResponse.json({ error: 'Expected an array of projects' }, { status: 400 });
    }
    
    for (const project of projects) {
      const result = ProjectSchema.safeParse(project);
      if (!result.success) {
        return NextResponse.json({ error: result.error.issues }, { status: 400 });
      }
    }
    
    await writeJsonBlob(DATA_KEY, projects);
    return NextResponse.json({ success: true, count: projects.length });
  } catch (error) {
    console.error('Error updating project order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}