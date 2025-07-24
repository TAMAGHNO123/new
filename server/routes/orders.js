import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();


// Admin: Get all orders
router.get('/admin/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch all orders', details: e.message });
  }
});

// Admin: Update order delivery status
router.patch('/admin/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // e.g., "shipped", "delivered"
  try {
    const order = await prisma.order.update({
      where: { id },
      data: { status }
    });
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: 'Failed to update order status', details: e.message });
  }
});

// Get all orders for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch orders', details: e.message });
  }
});

// Get a single order by ID (user can only access their own)
router.get('/:id', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order || order.userId !== userId) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch order', details: e.message });
  }
});


// Place order (for logged-in user)
router.post('/', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const cart = await prisma.cartItem.findMany({ where: { userId } });
  if (!cart.length) return res.status(400).json({ error: 'Cart is empty' });

  // Calculate total and taxes (example: 10% tax)
  let total = 0;
  const items = [];
  for (const item of cart) {
    const product = await prisma.product.findUnique({ where: { id: item.productId } });
    if (!product) continue;
    total += product.price * item.quantity;
    items.push({ productId: item.productId, quantity: item.quantity, price: product.price });
  }
  const taxes = total * 0.1;

  const order = await prisma.order.create({
    data: {
      userId,
      items,
      total,
      taxes
    }
  });

  // Clear cart
  await prisma.cartItem.deleteMany({ where: { userId } });

  res.json({ message: 'Order placed', order });
});

// Guest checkout
router.post('/guest', async (req, res) => {
  const { items, guestEmail } = req.body;
  let total = 0;
  for (const item of items) {
    const product = await prisma.product.findUnique({ where: { id: item.productId } });
    if (!product) continue;
    total += product.price * item.quantity;
  }
  const taxes = total * 0.1;

  const order = await prisma.order.create({
    data: {
      items,
      total,
      taxes,
      guestEmail
    }
  });

  res.json({ message: 'Order placed', order });
});

export default router;