import { NextResponse } from 'next/server';
import { Project, ProjectSchema } from '../../../adminx/lib/db';
import {
  readJsonBlob,
  writeJsonBlob,
  uploadImageToBlob,
  deleteImageFromBlob,
} from '../../../../lib/blob-storage';

const DATA_KEY = 'data/projects.json';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const projects = await readJsonBlob<Project>(DATA_KEY);
  const project = projects.find((p) => p.id === parseInt(resolvedParams.id));

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const updatedProject = await req.json();

  // Handle base64 image → upload to Vercel Blob
  if (updatedProject.image) {
    updatedProject.image = await uploadImageToBlob(updatedProject.image);
  }

  const result = ProjectSchema.safeParse(updatedProject);

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues }, { status: 400 });
  }

  const projects = await readJsonBlob<Project>(DATA_KEY);
  const index = projects.findIndex((p) => p.id === parseInt(resolvedParams.id));

  if (index === -1) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  // Delete old image from blob if it changed
  const oldImage = projects[index].image;
  if (oldImage !== result.data.image) {
    await deleteImageFromBlob(oldImage);
  }

  projects[index] = result.data;
  await writeJsonBlob(DATA_KEY, projects);

  return NextResponse.json(result.data);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const projects = await readJsonBlob<Project>(DATA_KEY);
  const projectToDelete = projects.find((p) => p.id === parseInt(resolvedParams.id));
  const filteredProjects = projects.filter((p) => p.id !== parseInt(resolvedParams.id));

  if (projects.length === filteredProjects.length) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  // Delete the project's image from blob
  if (projectToDelete) {
    await deleteImageFromBlob(projectToDelete.image);
  }

  await writeJsonBlob(DATA_KEY, filteredProjects);

  return new NextResponse(null, { status: 204 });
}