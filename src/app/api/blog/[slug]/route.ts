import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Blog, BlogSchema } from '../../../adminx/lib/db';

const blogsFilePath = path.join(process.cwd(), 'data', 'blogs.json');

const readBlogs = (): Blog[] => {
  const data = fs.readFileSync(blogsFilePath, 'utf-8');
  return JSON.parse(data);
};

const writeBlogs = (blogs: Blog[]) => {
  fs.writeFileSync(blogsFilePath, JSON.stringify(blogs, null, 2));
};

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blogs = readBlogs();
  const blog = blogs.find((p) => p.slug === slug);

  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  return NextResponse.json(blog);
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const updatedBlog = await req.json();
  const result = BlogSchema.safeParse(updatedBlog);

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues }, { status: 400 });
  }

  const blogs = readBlogs();
  const index = blogs.findIndex((p) => p.slug === slug);

  if (index === -1) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  blogs[index] = result.data;
  writeBlogs(blogs);

  return NextResponse.json(result.data);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blogs = readBlogs();
  const filteredBlogs = blogs.filter((p) => p.slug !== slug);

  if (blogs.length === filteredBlogs.length) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  writeBlogs(filteredBlogs);

  return new NextResponse(null, { status: 204 });
}