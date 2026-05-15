'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Blog } from '../lib/db';
import './blog.css';

export default function BlogManagementPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  return (
    <div className="blog-management-container">
      <h1 style={{ marginBottom: '10px' }}>Blog Management</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
        <button type="button" onClick={() => router.back()} style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: '5px', backgroundColor: '#222', border: '1px solid #444', color: 'white', cursor: 'pointer', transition: 'all 0.3s', height: 'fit-content' }}>
          &larr; Back
        </button>
        <Link href="/adminx/blog/new" className="new-post-link" style={{ marginBottom: 0, display: 'inline-flex', alignItems: 'center', height: 'fit-content' }}>
          New Post
        </Link>
      </div>
      <ul className="blog-list">
        {blogs.map((blog) => (
          <li key={blog.id} className="blog-item">
            <h2>{blog.title}</h2>
            <p>{blog.short_description}</p>
            <div className="blog-actions">
              <Link href={`/adminx/blog/edit/${blog.slug}`} className="edit-link">
                Edit
              </Link>
              <button onClick={() => handleDelete(blog.id)} className="delete-button">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}