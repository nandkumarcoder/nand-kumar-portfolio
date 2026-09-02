const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../data/dbManager');
const { authMiddleware } = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'nand-kumar-portfolio-secret-key-2026';

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, title, bio } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const existing = await db.findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.createUser({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'blogger',
      title: title || 'Contributing Technical Blogger',
      bio: bio || 'Full-Stack Developer passionate about AI, Node.js, and Zoho.'
    });

    const token = jwt.sign(
      { id: user.id || user._id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const safeUser = {
      id: user.id || user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      title: user.title,
      avatar: user.avatar,
      bio: user.bio
    };

    res.status(201).json({ message: 'User registered successfully', token, user: safeUser });
  } catch (err) {
    res.status(500).json({ error: 'Server error registering user.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password.' });
    }

    const user = await db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.id || user._id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const safeUser = {
      id: user.id || user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      title: user.title,
      avatar: user.avatar,
      bio: user.bio
    };

    res.json({ message: 'Login successful', token, user: safeUser });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// GET /api/auth/me
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await db.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const safeUser = {
      id: user.id || user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      title: user.title,
      avatar: user.avatar,
      bio: user.bio
    };
    res.json({ user: safeUser });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching user.' });
  }
});

// GET /api/auth/users (Admin only)
router.get('/users', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required.' });
    }
    const users = await db.getAllUsers();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch registered users.' });
  }
});

module.exports = router;
