import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get all products (public)
router.get('/', async (req, res) => {
  const {
    q, minPrice, maxPrice, brand, model, year, category, status, sortBy, sortOrder
  } = req.query;

  const where = {};

  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
      { brand: { contains: q, mode: 'insensitive' } },
      { model: { contains: q, mode: 'insensitive' } }
    ];
  }
  if (category) where.category = category;
  if (brand) where.brand = brand;
  if (model) where.model = model;
  if (status) where.status = status;
  if (year) where.year = Number(year);
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = Number(minPrice);
    if (maxPrice) where.price.lte = Number(maxPrice);
  }

  let orderBy = undefined;
  if (sortBy) {
    orderBy = {};
    orderBy[sortBy] = sortOrder === 'asc' ? 'asc' : 'desc';
  }

  try {
    const products = await prisma.product.findMany({
      where,
      orderBy,
    });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch products', details: e.message });
  }
});

// Get single product by ID (public)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// Create product (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const { name, category, brand, model, year, price, location, description, imageUrls, status } = req.body;
  try {
    const product = await prisma.product.create({
      data: { name, category, brand, model, year, price, location, description, imageUrls, status }
    });
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: 'Failed to create product', details: e.message });
  }
});

// Update product (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const product = await prisma.product.update({ where: { id }, data });
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: 'Failed to update product', details: e.message });
  }
});

// Delete product (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id } });
    res.json({ message: 'Product deleted' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete product', details: e.message });
  }
});

export default router;