const express = require('express');
const router = express.Router();
const db = require('../data/dbManager');
const { authMiddleware } = require('../middleware/auth');

// GET /api/blogs
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    const blogs = await db.getBlogs({ category, search });
    res.json({ blogs });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs.' });
  }
});

// GET /api/blogs/:idOrSlug
router.get('/:idOrSlug', async (req, res) => {
  try {
    const blog = await db.getBlogById(req.params.idOrSlug);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }
    res.json({ blog });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog post.' });
  }
});

// POST /api/blogs (Auth required)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, excerpt, content, category, tags, coverImage, readTime } = req.body;

    if (!title || !excerpt || !content) {
      return res.status(400).json({ error: 'Title, excerpt, and content are required.' });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newBlog = await db.createBlog({
      title,
      slug,
      excerpt,
      content,
      category: category || 'General Tech',
      tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : [],
      coverImage: coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
      readTime: readTime || '5 min read',
      authorId: req.user.id,
      authorName: req.user.name,
      authorBio: req.user.bio
    });

    res.status(201).json({ message: 'Blog post published successfully', blog: newBlog });
  } catch (err) {
    res.status(500).json({ error: 'Server error publishing blog.' });
  }
});

// PUT /api/blogs/:id (Auth required)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await db.getBlogById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    if (blog.authorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized to edit this article.' });
    }

    const { title, excerpt, content, category, tags, coverImage, readTime } = req.body;
    const updateData = {
      ...(title && { title }),
      ...(excerpt && { excerpt }),
      ...(content && { content }),
      ...(category && { category }),
      ...(tags && { tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : [] }),
      ...(coverImage && { coverImage }),
      ...(readTime && { readTime })
    };

    const updatedBlog = await db.updateBlog(req.params.id, updateData);
    res.json({ message: 'Blog post updated successfully', blog: updatedBlog });
  } catch (err) {
    res.status(500).json({ error: 'Server error updating blog.' });
  }
});

// DELETE /api/blogs/:id (Auth required)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await db.getBlogById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    if (blog.authorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized to delete this article.' });
    }

    await db.deleteBlog(req.params.id);
    res.json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error deleting blog.' });
  }
});

// POST /api/blogs/:id/like
router.post('/:id/like', async (req, res) => {
  try {
    const blog = await db.likeBlog(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }
    res.json({ likes: blog.likes });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update likes.' });
  }
});

// POST /api/blogs/:id/comments
router.post('/:id/comments', async (req, res) => {
  try {
    const { userName, comment } = req.body;
    if (!userName || !comment) {
      return res.status(400).json({ error: 'Name and comment text are required.' });
    }

    const newComment = await db.addComment(req.params.id, { userName, comment });
    if (!newComment) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }
    res.status(201).json({ message: 'Comment added', comment: newComment });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment.' });
  }
});

module.exports = router;
