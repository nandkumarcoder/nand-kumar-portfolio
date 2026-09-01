const express = require('express');
const router = express.Router();
const store = require('../data/store');
const { authMiddleware } = require('../middleware/auth');

// GET /api/blogs
router.get('/', (req, res) => {
  let { search, category, tag } = req.query;
  let results = [...store.blogs];

  if (category && category !== 'All') {
    results = results.filter(b => b.category.toLowerCase() === category.toLowerCase());
  }

  if (tag) {
    results = results.filter(b => b.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.excerpt.toLowerCase().includes(q) ||
      b.content.toLowerCase().includes(q) ||
      b.authorName.toLowerCase().includes(q)
    );
  }

  // Sort by newest first
  results.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  res.json({ blogs: results });
});

// GET /api/blogs/:idOrSlug
router.get('/:idOrSlug', (req, res) => {
  const param = req.params.idOrSlug;
  const blog = store.blogs.find(b => b.id === param || b.slug === param);

  if (!blog) {
    return res.status(404).json({ error: 'Blog post not found.' });
  }

  const author = store.users.find(u => u.id === blog.authorId);

  res.json({
    blog: {
      ...blog,
      authorBio: author ? author.bio : 'Contributing Tech Blogger',
      authorAvatar: author ? author.avatar : ''
    }
  });
});

// POST /api/blogs (Protected)
router.post('/', authMiddleware, (req, res) => {
  const { title, excerpt, content, category, tags, coverImage } = req.body;

  if (!title || !content || !excerpt) {
    return res.status(400).json({ error: 'Title, excerpt, and content are required fields.' });
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

  const words = content.split(/\s+/).length;
  const readTimeMinutes = Math.max(1, Math.ceil(words / 150));

  const user = store.users.find(u => u.id === req.user.id);

  const newBlog = {
    id: `blog-${Date.now()}`,
    title,
    slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
    excerpt,
    content,
    category: category || 'General Tech',
    tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : ['Tech']),
    authorId: req.user.id,
    authorName: user ? user.name : req.user.name,
    coverImage: coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    readTime: `${readTimeMinutes} min read`,
    likes: 0,
    publishedAt: new Date().toISOString(),
    comments: []
  };

  store.blogs.unshift(newBlog);

  res.status(201).json({
    message: 'Blog post published successfully!',
    blog: newBlog
  });
});

// PUT /api/blogs/:id (Protected)
router.put('/:id', authMiddleware, (req, res) => {
  const blogIndex = store.blogs.findIndex(b => b.id === req.params.id);
  if (blogIndex === -1) {
    return res.status(404).json({ error: 'Blog post not found.' });
  }

  const blog = store.blogs[blogIndex];

  if (blog.authorId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'You are not authorized to edit this post.' });
  }

  const { title, excerpt, content, category, tags, coverImage } = req.body;

  if (title) blog.title = title;
  if (excerpt) blog.excerpt = excerpt;
  if (content) {
    blog.content = content;
    const words = content.split(/\s+/).length;
    blog.readTime = `${Math.max(1, Math.ceil(words / 150))} min read`;
  }
  if (category) blog.category = category;
  if (tags) blog.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim());
  if (coverImage) blog.coverImage = coverImage;

  store.blogs[blogIndex] = blog;

  res.json({
    message: 'Blog post updated successfully!',
    blog
  });
});

// DELETE /api/blogs/:id (Protected)
router.delete('/:id', authMiddleware, (req, res) => {
  const blogIndex = store.blogs.findIndex(b => b.id === req.params.id);
  if (blogIndex === -1) {
    return res.status(404).json({ error: 'Blog post not found.' });
  }

  const blog = store.blogs[blogIndex];

  if (blog.authorId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'You are not authorized to delete this post.' });
  }

  store.blogs.splice(blogIndex, 1);

  res.json({ message: 'Blog post deleted successfully.' });
});

// POST /api/blogs/:id/comments
router.post('/:id/comments', (req, res) => {
  const { userName, comment } = req.body;
  if (!comment || !userName) {
    return res.status(400).json({ error: 'Name and comment text are required.' });
  }

  const blog = store.blogs.find(b => b.id === req.params.id);
  if (!blog) {
    return res.status(404).json({ error: 'Blog post not found.' });
  }

  const newComment = {
    id: `c-${Date.now()}`,
    userName,
    comment,
    createdAt: new Date().toISOString()
  };

  blog.comments.push(newComment);

  res.status(201).json({
    message: 'Comment added',
    comment: newComment
  });
});

// POST /api/blogs/:id/like
router.post('/:id/like', (req, res) => {
  const blog = store.blogs.find(b => b.id === req.params.id);
  if (!blog) {
    return res.status(404).json({ error: 'Blog post not found.' });
  }

  blog.likes += 1;
  res.json({ likes: blog.likes });
});

module.exports = router;
