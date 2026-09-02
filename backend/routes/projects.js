const express = require('express');
const router = express.Router();
const db = require('../data/dbManager');

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const projects = await db.getProjects(category);
    res.json({ projects });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects.' });
  }
});

module.exports = router;
