import React, { useState, useEffect } from 'react';
import api from './api/axios';
import BugForm from './components/BugForm';
import BugList from './components/BugList';

export default function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial records when page opens using useEffect[cite: 1]
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        setLoading(true);
        const response = await api.get('/bugs');
        setBugs(response.data);
      } catch (err) {
        setError('Cannot connect to the server. Make sure Express is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchBugs();
  }, []);

  // Immutable update when adding a bug
  const handleBugAdded = (newBug) => {
    setBugs([newBug, ...bugs]);
  };

  // Immutable update when deleting a bug[cite: 1]
  const handleDelete = async (id) => {
    try {
      await api.delete(`/bugs/${id}`);
      setBugs(bugs.filter((bug) => bug.id !== id));
    } catch (err) {
      alert('Failed to delete the bug record.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'Arial, sans-serif', padding: '0 20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Simple Bug Report Form</h1>
        <p>Full-Stack Application Dashboard</p>
      </header>

      <BugForm onBugAdded={handleBugAdded} />
      <BugList bugs={bugs} onDelete={handleDelete} loading={loading} error={error} />
    </div>
  );
}