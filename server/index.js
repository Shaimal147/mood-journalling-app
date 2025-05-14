import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = 3001

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Mood Journal API is alive!');
});

app.get('/entries', async (_req, res) => {
  await db.read();
  const entries = [...db.data.entries].reverse();
  res.json(entries);
});

app.post('/entries', async (req, res) => {
  const { id, emoji, answers } = req.body;
  if (!id || !emoji || !Array.isArray(answers) || answers.length !== 5) {
    return res.status(400).json({ error: 'Bad payload' });
  }

  await db.read();
  // Simple “upsert” (replace if same id)
  db.data.entries = db.data.entries.filter(e => e.id !== id);
  db.data.entries.push({ id, emoji, answers });
  await db.write();

  res.status(201).json({ ok: true });
});

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);