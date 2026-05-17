import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Project, ProjectSchema } from '../../adminx/lib/db';

const projectsFilePath = path.join(process.cwd(), 'data', 'projects.json');

const readProjects = (): Project[] => {
  const data = fs.readFileSync(projectsFilePath, 'utf-8');
  return JSON.parse(data);
};

const writeProjects = (projects: Project[]) => {
  fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));
};

export async function GET() {
  const projects = readProjects();
  return NextResponse.json(projects);
}

const saveImageIfBase64 = (imageBase64: string): string => {
  if (imageBase64.startsWith('data:image')) {
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

export async function POST(req: Request) {
  const newProject = await req.json();
  
  // Handle base64 image save
  if (newProject.image) {
    newProject.image = saveImageIfBase64(newProject.image);
  }

  const result = ProjectSchema.safeParse(newProject);

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues }, { status: 400 });
  }

  const projects = readProjects();
  projects.push(result.data);
  writeProjects(projects);

  return NextResponse.json(result.data, { status: 201 });
}