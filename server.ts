import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './src/server/db';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Routes

// 1. Get competition details
app.get('/api/competitions/:id', (req, res) => {
  const comp = db.getCompetition(req.params.id);
  if (!comp) {
    return res.status(404).json({ success: false, error: 'Competition not found' });
  }
  res.json({ success: true, data: comp });
});

// 2. Get user participation state for competition
app.get('/api/competitions/:id/user-state', (req, res) => {
  const { id } = req.params;
  const userId = (req.query.userId as string) || 'user_ketan_101';
  const state = db.getUserState(id, userId);
  res.json({ success: true, data: state });
});

// 3. Register user for competition (Atomic spot reservation with concurrency protection)
app.post('/api/competitions/:id/register', (req, res) => {
  const { id } = req.params;
  const { userId, userName, userEmail, phone, paymentMethod } = req.body;

  if (!userId || !userName) {
    return res.status(400).json({ success: false, error: 'User ID and name are required' });
  }

  const result = db.registerUser({
    competitionId: id,
    userId,
    userName,
    userEmail: userEmail || `${userId}@example.com`,
    phone: phone || '+91 9876543210',
    paymentMethod: paymentMethod || 'RAZORPAY_UPI'
  });

  if (!result.success) {
    return res.status(result.statusCode || 400).json(result);
  }

  res.json(result);
});

// 4. Upload submission
app.post('/api/competitions/:id/submit', (req, res) => {
  const { id } = req.params;
  const { userId, title, danceForm, videoUrl, description, durationSec } = req.body;

  if (!userId || !title || !videoUrl) {
    return res.status(400).json({ success: false, error: 'User ID, title, and video are required' });
  }

  const result = db.createSubmission({
    competitionId: id,
    userId,
    title,
    danceForm: danceForm || 'Kathak',
    videoUrl,
    description: description || '',
    durationSec: Number(durationSec) || 180
  });

  if (!result.success) {
    return res.status(result.statusCode || 400).json(result);
  }

  res.json(result);
});

// 5. Get submissions for competition
app.get('/api/competitions/:id/submissions', (req, res) => {
  const { id } = req.params;
  const submissions = db.getSubmissions(id);
  res.json({ success: true, data: submissions });
});

// 6. Testimonials
app.get('/api/testimonials', (req, res) => {
  const testimonials = db.getTestimonials();
  res.json({ success: true, data: testimonials });
});

// 7. Concurrency simulation endpoint for technical evaluation
app.post('/api/competitions/:id/simulate-concurrency', async (req, res) => {
  const { id } = req.params;
  const count = Math.min(Number(req.body.count) || 5, 20);
  const results = await db.simulateConcurrentRegistrations(id, count);
  res.json({ success: true, data: results });
});

// 8. Lifecycle override / Admin state switcher (for demo & testing edge cases)
app.post('/api/competitions/:id/lifecycle', (req, res) => {
  const { id } = req.params;
  const { lifecycleState, spotsOverride } = req.body;
  const updated = db.overrideCompetitionState(id, lifecycleState, spotsOverride);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Competition not found' });
  }
  res.json({ success: true, data: updated });
});

// 9. Reset competition state to initial screenshot reference
app.post('/api/competitions/:id/reset', (req, res) => {
  const { id } = req.params;
  const resetData = db.resetCompetition(id);
  res.json({ success: true, data: resetData });
});

// Start Express server and mount Vite
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Feedants Full-Stack Server running on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
