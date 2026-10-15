import React, { useState } from 'react';
import api from '../api/axios';

export default function BugForm({ onBugAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'Medium',
    steps: '',
    status: 'Open'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Bug title is required.';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters.';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await api.post('/bugs', formData);
      onBugAdded(response.data);
      setFormData({
        title: '',
        description: '',
        severity: 'Medium',
        steps: '',
        status: 'Open'
      });
      setErrors({});
    } catch (err) {
      console.error('Submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#1f2937', marginTop: '0', marginBottom: '20px' }}>Report a Bug</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', color: '#374151' }}>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', background: '#f9fafb', color: '#111827', border: '1px solid #d1d5db', borderRadius: '4px' }}
          placeholder="e.g., Button is unclickable"
        />
        {errors.title && <span style={{ color: 'red', fontSize: '12px' }}>{errors.title}</span>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', color: '#374151' }}>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', background: '#f9fafb', color: '#111827', border: '1px solid #d1d5db', borderRadius: '4px' }}
          placeholder="Describe the bug..."
        />
        {errors.description && <span style={{ color: 'red', fontSize: '12px' }}>{errors.description}</span>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', color: '#374151' }}>Severity:</label>
        <select
          name="severity"
          value={formData.severity}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', background: '#f9fafb', color: '#111827', border: '1px solid #d1d5db', borderRadius: '4px' }}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', color: '#374151' }}>Steps to Reproduce:</label>
        <textarea
          name="steps"
          value={formData.steps}
          onChange={handleChange}
          rows="2"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', background: '#f9fafb', color: '#111827', border: '1px solid #d1d5db', borderRadius: '4px' }}
          placeholder="1. Go to... 2. Click..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        style={{ width: '100%', padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        {isSubmitting ? 'Saving...' : 'Submit Bug Report'}
      </button>
    </form>
  );
}