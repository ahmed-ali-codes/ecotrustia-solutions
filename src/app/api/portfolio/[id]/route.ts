import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Project, ProjectSchema } from '../../../adminx/lib/db';

const projectsFilePath = path.join(process.cwd(), 'data', 'projects.json');

const readProjects = (): Project[] => {
  const data = fs.readFileSync(projectsFilePath, 'utf-8');
  return JSON.parse(data);
};

const writeProjects = (projects: Project[]) => {
  fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));
};

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const projects = readProjects();
  const project = projects.find((p) => p.id === parseInt(resolvedParams.id));

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json(project);
}

const saveImageIfBase64 = (imageBase64: string): string => {
  if (imageBase64 && imageBase64.startsWith('data:image')) {
    const matches = imageBase64.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
      const buffer = Buffer.from(matches[2], 'base64');
      const fileName = `portfolio_${Date.now()}.${ext}`;
      const dirPath = path.join(process.cwd(), 'public', 'portfolio');
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      const filePath = path.join(dirPath, fileName);
      fs.writeFileSync(filePath, buffer);
      return `/portfolio/${fileName}`;
    }
  }
  return imageBase64;
};

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const updatedProject = await req.json();
  
  if (updatedProject.image) {
    updatedProject.image = saveImageIfBase64(updatedProject.image);
  }

  const result = ProjectSchema.safeParse(updatedProject);

  if (!result.success) {
    return NextResponse.json({ error: result.error.errors }, { status: 400 });
  }

  const projects = readProjects();
  const index = projects.findIndex((p) => p.id === parseInt(resolvedParams.id));

  if (index === -1) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  projects[index] = result.data;
  writeProjects(projects);

  return NextResponse.json(result.data);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const projects = readProjects();
  const filteredProjects = projects.filter((p) => p.id !== parseInt(resolvedParams.id));

  if (projects.length === filteredProjects.length) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  writeProjects(filteredProjects);

  return new NextResponse(null, { status: 204 });
}