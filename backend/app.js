const express = require('express');
const cors = require('cors');
const store = require('./store');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/tasks', (req, res) => {
  res.json(store.list());
});

app.post('/api/tasks', (req, res) => {
  const title = typeof req.body?.title === 'string' ? req.body.title.trim() : '';
  if (!title) {
    return res.status(400).json({ error: 'El título no puede estar vacío' });
  }
  res.status(201).json(store.create(title));
});

module.exports = app;
