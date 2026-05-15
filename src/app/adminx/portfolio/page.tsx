'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Project } from '../lib/db';
import './portfolio.css';

export default function PortfolioManagementPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch('/api/portfolio');
      const data = await res.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await fetch(`/api/portfolio/${id}`, {
        method: 'DELETE',
      });
      setProjects(projects.filter((project) => project.id !== id));
    }
  };

  return (
    <div className="portfolio-management-container">
      <h1 style={{ marginBottom: '10px' }}>Portfolio Management</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
        <button type="button" onClick={() => router.back()} style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: '5px', backgroundColor: '#222', border: '1px solid #444', color: 'white', cursor: 'pointer', transition: 'all 0.3s', height: 'fit-content' }}>
          &larr; Back
        </button>
        <Link href="/adminx/portfolio/new" className="new-project-link" style={{ marginBottom: 0, display: 'inline-flex', alignItems: 'center', height: 'fit-content' }}>
          New Project
        </Link>
      </div>
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.id} className="project-item">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="project-actions">
              <Link href={`/adminx/portfolio/edit/${project.id}`} className="edit-link">
                Edit
              </Link>
              <button onClick={() => handleDelete(project.id)} className="delete-button">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}