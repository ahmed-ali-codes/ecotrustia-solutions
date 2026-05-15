import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Blog, BlogSchema } from '../../adminx/lib/db';

const blogsFilePath = path.join(process.cwd(), 'data', 'blogs.json');

const readBlogs = (): Blog[] => {
  const data = fs.readFileSync(blogsFilePath, 'utf-8');
  return JSON.parse(data);
};

const writeBlogs = (blogs: Blog[]) => {
  fs.writeFileSync(blogsFilePath, JSON.stringify(blogs, null, 2));
};

export async function GET() {
  const blogs = readBlogs();
  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  const newBlog = await req.json();
  const result = BlogSchema.safeParse(newBlog);

  if (!result.success) {
    return NextResponse.json({ error: result.error.errors }, { status: 400 });
  }

  const blogs = readBlogs();
  blogs.push(result.data);
  writeBlogs(blogs);

  return NextResponse.json(result.data, { status: 201 });
}