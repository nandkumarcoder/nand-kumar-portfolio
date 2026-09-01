const express = require('express');
const router = express.Router();
const store = require('../data/store');

// POST /api/chatbot
router.post('/', (req, res) => {
  const { question } = req.body;
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid question string.' });
  }

  const qLower = question.toLowerCase();

  // Search knowledge base
  let bestMatch = null;
  let maxScore = 0;

  for (const kb of store.chatbotKnowledge) {
    let score = 0;
    for (const kw of kb.keywords) {
      if (qLower.includes(kw)) {
        score += 1;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = kb.response;
    }
  }

  if (bestMatch && maxScore > 0) {
    return res.json({ answer: bestMatch });
  }

  // Fallback assistant response
  res.json({
    answer: `Thanks for your question! Nand Kumar specializes in AI & Data Science (LSTM, NLP, TensorFlow), Django Web Development (REST APIs, PostgreSQL), and Zoho Ecosystem Automation (Creator, CRM, Deluge Scripting). You can leave a direct message in the Contact section or email nandkumarcoder@gmail.com!`
  });
});

module.exports = router;
