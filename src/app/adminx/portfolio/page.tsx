'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Project } from '../lib/db';
import './portfolio.css';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableProjectItem({ project, handleDelete }: { project: Project, handleDelete: (id: number) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto',
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <li ref={setNodeRef} style={style} className={`project-item ${isDragging ? 'dragging' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
        <div {...attributes} {...listeners} className="drag-handle" title="Drag to reorder">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M8 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm12-12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ marginTop: 0 }}>
            {project.title}
            <span style={{ fontSize: '12px', padding: '3px 8px', borderRadius: '12px', background: '#333', marginLeft: '10px', fontWeight: 'normal' }}>
              {project.type === 'automation' ? 'Automation' : 'Web'}
            </span>
          </h2>
          <p style={{ color: '#aaa' }}>{project.description}</p>
          <div className="project-actions">
            <Link href={`/adminx/portfolio/edit/${project.id}`} className="edit-link">
              Edit
            </Link>
            <button onClick={() => handleDelete(project.id)} className="delete-button">
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function PortfolioManagementPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [filter, setFilter] = useState<'all' | 'web' | 'automation'>('all');

  const filteredProjects = projects.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'web') return !p.type || p.type === 'web';
    if (filter === 'automation') return p.type === 'automation';
    return true;
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex((p) => p.id === active.id);
      const newIndex = projects.findIndex((p) => p.id === over.id);
      
      const newProjects = arrayMove(projects, oldIndex, newIndex);
      setProjects(newProjects);
      
      // Auto-save order
      setIsSaving(true);
      try {
        await fetch('/api/portfolio', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProjects),
        });
      } catch (err) {
        console.error('Failed to save order', err);
        alert('Failed to save order. Please try again.');
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="portfolio-management-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <h1 style={{ margin: 0 }}>Portfolio Management</h1>
        {isSaving && <span style={{ color: '#8B5CF6', fontSize: '14px', fontWeight: 'bold' }}>Saving order...</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
        <button type="button" onClick={() => router.back()} style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: '5px', backgroundColor: '#222', border: '1px solid #444', color: 'white', cursor: 'pointer', transition: 'all 0.3s', height: 'fit-content' }}>
          &larr; Back
        </button>
        <Link href="/adminx/portfolio/new" className="new-project-link" style={{ marginBottom: 0, display: 'inline-flex', alignItems: 'center', height: 'fit-content' }}>
          New Project
        </Link>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
          <button onClick={() => setFilter('all')} style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #444', background: filter === 'all' ? '#8B5CF6' : '#222', color: 'white', cursor: 'pointer' }}>All</button>
          <button onClick={() => setFilter('web')} style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #444', background: filter === 'web' ? '#8B5CF6' : '#222', color: 'white', cursor: 'pointer' }}>Web</button>
          <button onClick={() => setFilter('automation')} style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #444', background: filter === 'automation' ? '#8B5CF6' : '#222', color: 'white', cursor: 'pointer' }}>Automation</button>
        </div>
      </div>
      
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <ul className="project-list">
          <SortableContext 
            items={filteredProjects.map(p => p.id)}
            strategy={verticalListSortingStrategy}
          >
            {filteredProjects.map((project) => (
              <SortableProjectItem key={project.id} project={project} handleDelete={handleDelete} />
            ))}
          </SortableContext>
        </ul>
      </DndContext>
    </div>
  );
}