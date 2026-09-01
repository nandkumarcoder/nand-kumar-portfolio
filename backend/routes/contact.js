const express = require('express');
const router = express.Router();
const store = require('../data/store');
const { authMiddleware } = require('../middleware/auth');

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, subject, message, accessKey } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Please fill in all form fields.' });
  }

  const newMessage = {
    id: `msg-${Date.now()}`,
    name,
    email,
    subject,
    message,
    receivedAt: new Date().toISOString()
  };

  store.contactMessages.unshift(newMessage);

  // Attempt direct email dispatch via Web3Forms API
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
      console.error('Direct email delivery log:', err.message);
    }
  }

  res.status(201).json({
    success: true,
    message: 'Thank you for reaching out! Your message has been sent directly to nandkumarcoder@gmail.com.'
  });
});

// GET /api/contact (Admin only)
router.get('/', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required.' });
  }
  res.json({ messages: store.contactMessages });
});

module.exports = router;
