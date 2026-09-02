const express = require('express');
const router = express.Router();
const db = require('../data/dbManager');
const { authMiddleware } = require('../middleware/auth');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message, accessKey } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Please fill in all form fields.' });
    }

    const newMessage = await db.saveContactMessage({
      name,
      email,
      subject,
      message
    });

    // Optional webhook email dispatch
    const key = accessKey || process.env.WEB3FORMS_ACCESS_KEY || '';
    if (key) {
      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: key,
            name,
            email,
            subject: `[Portfolio Inquiry] ${subject}`,
            message: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
            replyto: email
          })
        });
      } catch (err) {
        console.error('Email dispatch notice:', err.message);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been stored in the database and dispatched to Nand Kumar.'
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record contact inquiry.' });
  }
});

// GET /api/contact (Admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required.' });
    }
    const messages = await db.getContactMessages();
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

module.exports = router;
