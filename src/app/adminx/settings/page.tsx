'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessageType('');
    setMessage('');

    if (password !== confirmPassword) {
      setMessageType('error');
      setMessage('Passwords do not match');
      return;
    }

    const res = await fetch('/api/admin/update-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      setMessage('Credentials updated successfully!');
      setMessageType('success');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    } else {
      const data = await res.json();
      setMessage(data.error || 'Failed to update credentials');
      setMessageType('error');
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px', minHeight: '100vh', color: 'white' }}>
      {/* Header Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', marginBottom: '40px', gap: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button type="button" onClick={() => router.back()} style={{ backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', height: 'fit-content', transition: 'all 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#374151'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}>
            &larr; Back
          </button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 5px 0' }}>Security Settings</h1>
          <p style={{ color: '#9ca3af', margin: 0, fontSize: '14px' }}>Update your underlying administrator portal credentials.</p>
        </div>
        <div></div>
      </div>

      {/* Main Content Area */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '500px', backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '16px', padding: '40px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {message && (
              <div style={{ padding: '15px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', textAlign: 'center', backgroundColor: messageType === 'success' ? '#15803d20' : '#7f1d1d20', color: messageType === 'success' ? '#4ade80' : '#f87171', border: `1px solid ${messageType === 'success' ? '#166534' : '#991b1b'}` }}>
                {message}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="username" style={{ fontSize: '14px', fontWeight: '500', color: '#d1d5db' }}>New Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter new username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ backgroundColor: '#1f2937', border: '1px solid #374151', padding: '12px 16px', borderRadius: '8px', color: 'white', fontSize: '15px', outline: 'none', transition: 'border-color 0.2s', width: '100%' }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#a855f7'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#374151'}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="password" style={{ fontSize: '14px', fontWeight: '500', color: '#d1d5db' }}>New Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ backgroundColor: '#1f2937', border: '1px solid #374151', padding: '12px 16px', borderRadius: '8px', color: 'white', fontSize: '15px', outline: 'none', transition: 'border-color 0.2s', width: '100%' }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#a855f7'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#374151'}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="confirmPassword" style={{ fontSize: '14px', fontWeight: '500', color: '#d1d5db' }}>Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-type new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ backgroundColor: '#1f2937', border: '1px solid #374151', padding: '12px 16px', borderRadius: '8px', color: 'white', fontSize: '15px', outline: 'none', transition: 'border-color 0.2s', width: '100%' }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#a855f7'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#374151'}
              />
            </div>

            <button type="submit" style={{ marginTop: '10px', width: '100%', padding: '16px', background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 14px 0 rgba(168, 85, 247, 0.39)' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
              Update Administrator Credentials
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}