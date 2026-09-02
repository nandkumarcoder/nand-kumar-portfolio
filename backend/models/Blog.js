const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, default: 'General Tech' },
  tags: [{ type: String }],
  coverImage: { type: String, default: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800' },
  readTime: { type: String, default: '5 min read' },
  likes: { type: Number, default: 0 },
  authorId: { type: String, required: true },
  authorName: { type: String, required: true },
  authorBio: { type: String },
  comments: [commentSchema],
  publishedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
