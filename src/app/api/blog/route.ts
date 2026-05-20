import { NextResponse } from 'next/server';
import { Blog, BlogSchema } from '../../adminx/lib/db';
import { readJsonBlob, writeJsonBlob, uploadImageToBlob } from '../../../lib/blob-storage';

const DATA_KEY = 'data/blogs.json';

export async function GET() {
  const blogs = await readJsonBlob<Blog>(DATA_KEY);
  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  const newBlog = await req.json();
  
  if (newBlog.imageUrl) {
    newBlog.imageUrl = await uploadImageToBlob(newBlog.imageUrl);
  }

  const result = BlogSchema.safeParse(newBlog);

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues }, { status: 400 });
  }

  const blogs = await readJsonBlob<Blog>(DATA_KEY);
  blogs.push(result.data);
  await writeJsonBlob(DATA_KEY, blogs);

  return NextResponse.json(result.data, { status: 201 });
}