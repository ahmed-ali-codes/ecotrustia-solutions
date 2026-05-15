'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Blog, BlogSchema } from '../../../lib/db';
import './edit.css';

export default function EditBlogPostPage({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categories, setCategories] = useState('');
  const [tags, setTags] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`/api/blog/${params.slug}`);
      const data = await res.json();
      setBlog(data);
      setTitle(data.title);
      setSlug(data.slug);
      setContent(data.content);
      setShortDescription(data.short_description);
      setImageUrl(data.imageUrl);
      setCategories(data.categories.join(', '));
      setTags(data.tags.join(', '));
      setMetaTitle(data.metaTitle);
      setMetaDescription(data.metaDescription);
    };
    fetchBlog();
  }, [params.slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!blog) return;

    const updatedBlog = {
      ...blog,
      title,
      slug,
      content,
      short_description: shortDescription,
      imageUrl,
      categories: categories.split(',').map((c) => c.trim()),
      tags: tags.split(',').map((t) => t.trim()),
      metaTitle,
      metaDescription,
    };

    const result = BlogSchema.safeParse(updatedBlog);

    if (!result.success) {
      setError(result.error.errors.map((err) => err.message).join(', '));
      return;
    }

    await fetch(`/api/blog/${blog.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.data),
    });

    router.push('/adminx/blog');
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-post-container">
      <h1 style={{ marginBottom: '10px' }}>Edit Blog Post</h1>
      <div style={{ marginBottom: '20px' }}>
        <button type="button" onClick={() => router.back()} style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: '5px', backgroundColor: '#222', border: '1px solid #444', color: 'white', cursor: 'pointer', transition: 'all 0.3s', height: 'fit-content' }}>
          &larr; Back
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="edit-post-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Short Description"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Categories (comma-separated)"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="text"
          placeholder="Meta Title"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Meta Description"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
        />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}