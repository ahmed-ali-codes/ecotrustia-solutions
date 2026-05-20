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