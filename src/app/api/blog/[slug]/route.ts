import { NextResponse } from 'next/server';
import { Blog, BlogSchema } from '../../../adminx/lib/db';
import { readJsonBlob, writeJsonBlob } from '../../../../lib/blob-storage';

const DATA_KEY = 'data/blogs.json';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blogs = await readJsonBlob<Blog>(DATA_KEY);
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

  const blogs = await readJsonBlob<Blog>(DATA_KEY);
  const index = blogs.findIndex((p) => p.slug === slug);

  if (index === -1) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  blogs[index] = result.data;
  await writeJsonBlob(DATA_KEY, blogs);

  return NextResponse.json(result.data);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blogs = await readJsonBlob<Blog>(DATA_KEY);
  const filteredBlogs = blogs.filter((p) => p.slug !== slug);

  if (blogs.length === filteredBlogs.length) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  await writeJsonBlob(DATA_KEY, filteredBlogs);

  return new NextResponse(null, { status: 204 });
}