import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import { authMiddleware, adminMiddleware } from './middleware/auth.js';
import carttRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.use('/cart', carttRoutes);
app.use('/orders', orderRoutes);

// Example protected route
app.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected user profile route', user: req.user });
});

// Example admin-only route
app.get('/admin/products', authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: 'Admin products route' });
});

app.listen(4000, () => console.log('Server running on port 4000'));