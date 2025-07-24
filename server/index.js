import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const prisma = new PrismaClient();
const JWT_SECRET = 'your_jwt_secret'; // Use process.env.JWT_SECRET in production

app.use(cors());
app.use(express.json());

// Signup
app.post('/auth/signup', async (req, res) => {
  const { email, password, name } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { email, password: hashed, name }
    });
    res.json({ message: 'User created', user: { email: user.email, name: user.name } });
  } catch (e) {
  if (e.code === 'P2002') {
    res.status(400).json({ error: 'Email already exists' });
  } else {
    res.status(500).json({ error: 'Server error', details: e.message });
  }
}
});

// Login
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { email: user.email, name: user.name, role: user.role } });
});

// Auth middleware
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  try {
    const payload = jwt.verify(auth.split(' ')[1], JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Admin middleware
function adminMiddleware(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  next();
}

// Example protected route
app.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected user profile route', user: req.user });
});

// Example admin-only route
app.get('/admin/products', authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: 'Admin products route' });
});

app.listen(4000, () => console.log('Server running on port 4000'));