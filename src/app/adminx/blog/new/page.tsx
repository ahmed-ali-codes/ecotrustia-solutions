'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlogSchema } from '../../lib/db';
import './new.css';

export default function NewBlogPostPage() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newBlog = {
      id: Date.now().toString(),
      title,
      slug,
      content,
      short_description: shortDescription,
      imageUrl,
      date: new Date().toISOString(),
      categories: categories.split(',').map((c) => c.trim()),
      tags: tags.split(',').map((t) => t.trim()),
      metaTitle,
      metaDescription,
    };

    const result = BlogSchema.safeParse(newBlog);

    if (!result.success) {
      setError(result.error.issues.map((err) => err.message).join(', '));
      return;
    }

    await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.data),
    });

    router.push('/adminx/blog');
  };

  return (
    <div className="new-post-container">
      <h1 style={{ marginBottom: '10px' }}>New Blog Post</h1>
      <div style={{ marginBottom: '20px' }}>
        <button type="button" onClick={() => router.back()} style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: '5px', backgroundColor: '#222', border: '1px solid #444', color: 'white', cursor: 'pointer', transition: 'all 0.3s', height: 'fit-content' }}>
          &larr; Back
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="new-post-form">
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
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}