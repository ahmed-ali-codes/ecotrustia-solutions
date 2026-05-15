'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Submission {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
  subject: string;
  services: string[];
  status: string;
}

export default function ContactSubmissions() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    fetch('/api/contact')
      .then((res) => res.json())
      .then((data) => setSubmissions(data));
  }, []);

  const handleDelete = async (id: number) => {
    await fetch('/api/contact', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    setSubmissions(submissions.filter((s) => s.id !== id));
  };

  const handleStatusChange = async (id: number, status: string) => {
    const response = await fetch('/api/contact', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status }),
    });
    const updatedSubmission = await response.json();
    setSubmissions(
      submissions.map((s) => (s.id === id ? updatedSubmission : s))
    );
  };

  const getStatusStyle = (status: string) => {
    switch(status.toLowerCase()) {
      case 'pending': return { backgroundColor: '#b45309', color: '#fef3c7', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' };
      case 'process': return { backgroundColor: '#1d4ed8', color: '#dbeafe', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' };
      case 'completed': return { backgroundColor: '#15803d', color: '#dcfce7', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' };
      case 'cancel': return { backgroundColor: '#b91c1c', color: '#fee2e2', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' };
      default: return { backgroundColor: '#374151', color: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' };
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px', minHeight: '100vh', color: 'white' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', marginBottom: '30px', gap: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button type="button" onClick={() => router.back()} style={{ backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', height: 'fit-content' }}>
            &larr; Back
          </button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 5px 0' }}>Client Submissions</h1>
          <p style={{ color: '#9ca3af', margin: 0, fontSize: '14px' }}>Manage incoming client inquiries, project leads, and contact requests.</p>
        </div>
        <div></div>
      </div>

      <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ width: '100%', minWidth: '1000px', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#1f2937', borderBottom: '2px solid #374151' }}>
              <tr>
                <th style={{ padding: '16px', color: '#d1d5db', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Client Name</th>
                <th style={{ padding: '16px', color: '#d1d5db', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Contact Info</th>
                <th style={{ padding: '16px', color: '#d1d5db', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', width: '30%' }}>Inquiry Details</th>
                <th style={{ padding: '16px', color: '#d1d5db', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Services</th>
                <th style={{ padding: '16px', color: '#d1d5db', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Date</th>
                <th style={{ padding: '16px', color: '#d1d5db', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                <th style={{ padding: '16px', color: '#d1d5db', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>No submissions recorded yet.</td>
                </tr>
              ) : submissions.map((submission) => (
                <tr key={submission.id} style={{ borderBottom: '1px solid #374151', backgroundColor: '#111827' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1f2937'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#111827'}>
                  <td style={{ padding: '16px', fontWeight: '500', whiteSpace: 'nowrap' }}>{submission.name}</td>
                  <td style={{ padding: '16px', whiteSpace: 'nowrap' }}>
                    <a href={`mailto:${submission.email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>{submission.email}</a>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: '500', marginBottom: '4px', color: '#f3f4f6' }}>{submission.subject}</div>
                    <div style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.4' }}>{submission.message}</div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {Array.isArray(submission.services) && submission.services.length > 0 ? (
                         submission.services.map(srv => (
                           <span key={srv} style={{ backgroundColor: '#374151', color: '#e5e7eb', fontSize: '11px', padding: '4px 8px', borderRadius: '12px', border: '1px solid #4b5563', whiteSpace: 'nowrap' }}>
                             {srv}
                           </span>
                         ))
                      ) : <span style={{ color: '#6b7280', fontSize: '12px', fontStyle: 'italic' }}>None</span>}
                    </div>
                  </td>
                  <td style={{ padding: '16px', color: '#9ca3af', fontSize: '14px', whiteSpace: 'nowrap' }}>
                    {new Date(submission.date).toLocaleDateString()}<br/>
                    <span style={{ fontSize: '12px' }}>{new Date(submission.date).toLocaleTimeString()}</span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <select
                      value={submission.status}
                      onChange={(e) => handleStatusChange(submission.id, e.target.value)}
                      style={{ ...getStatusStyle(submission.status), border: 'none', cursor: 'pointer', outline: 'none', appearance: 'none', textAlign: 'center', minWidth: '100px' }}
                    >
                      <option value="pending" style={{ backgroundColor: '#111827', color: 'white' }}>Pending</option>
                      <option value="process" style={{ backgroundColor: '#111827', color: 'white' }}>In Process</option>
                      <option value="completed" style={{ backgroundColor: '#111827', color: 'white' }}>Completed</option>
                      <option value="cancel" style={{ backgroundColor: '#111827', color: 'white' }}>Cancelled</option>
                    </select>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <button 
                      onClick={() => {
                        if (confirm('Permanently delete this submission?')) {
                          handleDelete(submission.id);
                        }
                      }}
                      style={{ backgroundColor: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px' }}
                      title="Delete Submission"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}