const express = require('express');
const router = express.Router();
const store = require('../data/store');

// GET /api/projects
router.get('/', (req, res) => {
  const { category } = req.query;
  let projects = [...store.projects];

  if (category && category !== 'all') {
    projects = projects.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  res.json({ projects });
});

module.exports = router;
