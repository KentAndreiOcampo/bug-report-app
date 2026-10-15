import React from 'react';

export default function BugList({ bugs, onDelete, loading, error }) {
  if (loading) return <p style={{ textAlign: 'center' }}>Loading bug reports...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  if (bugs.length === 0) return <p style={{ textAlign: 'center', color: '#666' }}>No bugs reported yet.</p>;

  return (
    <div style={{ marginTop: '30px', background: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2>Submitted Bug Reports</h2>
      <table style={{ width: '100%', marginTop: '15px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f1f1', textAlign: 'left' }}>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Title</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Severity</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'right' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {bugs.map((bug) => (
            <tr key={bug.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{bug.title}</td>
              <td style={{ padding: '10px' }}>{bug.severity}</td>
              <td style={{ padding: '10px' }}>{bug.status}</td>
              <td style={{ padding: '10px', textAlign: 'right' }}>
                <button
                  onClick={() => onDelete(bug.id)}
                  style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}