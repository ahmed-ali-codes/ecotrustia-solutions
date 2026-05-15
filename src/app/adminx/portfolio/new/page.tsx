'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ProjectSchema } from '../../lib/db';
import './new.css';

export default function NewProjectPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProject = {
      id: Date.now(),
      title,
      description,
      image,
      link,
      metaDescription,
      technologies
    };

    const result = ProjectSchema.safeParse(newProject);

    if (!result.success) {
      setError(result.error.errors.map((err) => err.message).join(', '));
      return;
    }

    await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.data),
    });

    router.push('/adminx/portfolio');
  };

  return (
    <div className="new-project-container">
      <h1 style={{ marginBottom: '10px' }}>New Project</h1>
      <div style={{ marginBottom: '20px' }}>
        <button type="button" onClick={() => router.back()} style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: '5px', backgroundColor: '#222', border: '1px solid #444', color: 'white', cursor: 'pointer', transition: 'all 0.3s', height: 'fit-content' }}>
          &larr; Back
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="new-project-form">
        <input
          type="text"
          placeholder="Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Short Description *"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <textarea
          placeholder="Meta Description (SEO)"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Technologies (e.g., React, Node.js)"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
        />
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Image URL..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{ flex: 1 }}
          />
          <span style={{ fontSize: '12px' }}>OR</span>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageFileChange} 
            style={{ padding: '8px' }}
          />
        </div>
        {image && image.startsWith('data:image') && <p style={{fontSize: '10px', color: 'green'}}>Image file selected and ready.</p>}
        <input
          type="text"
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}