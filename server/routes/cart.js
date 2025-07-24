import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get current user's cart
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const cart = await prisma.cartItem.findMany({ where: { userId } });
  res.json(cart);
});

// Add/update item in cart
router.post('/', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;
  const existing = await prisma.cartItem.findFirst({ where: { userId, productId } });
  if (existing) {
    const updated = await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity }
    });
    res.json(updated);
  } else {
    const item = await prisma.cartItem.create({
      data: { userId, productId, quantity }
    });
    res.json(item);
  }
});

// Remove item from cart
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  await prisma.cartItem.delete({ where: { id } });
  res.json({ message: 'Item removed' });
});

export default router;