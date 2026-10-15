const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middleware registration (CORS, JSON parsing, and logger)
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 2. GET: List all bug records (Status: 200)[cite: 1]
app.get('/api/bugs', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bugs ORDER BY created_at DESC');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching bugs.' });
  }
});

// 3. GET: Get one bug record by ID (Status: 200, 404)[cite: 1]
app.get('/api/bugs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM bugs WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Bug record not found.' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// 4. POST: Create a new bug record with server-side validation (Status: 201, 400)[cite: 1]
app.post('/api/bugs', async (req, res) => {
  try {
    const { title, description, severity, steps, status } = req.body;

    // Server-side validation: Never trust the client[cite: 1]
    if (!title || title.trim().length < 3) {
      return res.status(400).json({ error: 'Title is required and must be at least 3 characters.' });
    }
    if (!description) {
      return res.status(400).json({ error: 'Description is required.' });
    }

    // Parameterized query to prevent SQL injection[cite: 1]
    const query = 'INSERT INTO bugs (title, description, severity, steps, status) VALUES (?, ?, ?, ?, ?)';
    const values = [title, description, severity || 'Medium', steps || '', status || 'Open'];
    
    const [result] = await pool.query(query, values);
    
    const [newBug] = await pool.query('SELECT * FROM bugs WHERE id = ?', [result.insertId]);
    res.status(201).json(newBug[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while creating bug.' });
  }
});

// 5. DELETE: Remove a bug record (Status: 200, 404)[cite: 1]
app.delete('/api/bugs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM bugs WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Bug record not found for deletion.' });
    }

    res.status(200).json({ message: 'Bug deleted successfully', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while deleting.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running successfully on port ${PORT}`);
});