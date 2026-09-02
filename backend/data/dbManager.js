const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const initialStore = require('./store');

const dbPath = path.join(__dirname, 'database.json');

// Ensure database.json exists with seed data
function loadLocalDB() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(initialStore, null, 2), 'utf8');
    return initialStore;
  }
  try {
    const raw = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return initialStore;
  }
}

function saveLocalDB(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving local database:', err);
  }
}

const db = {
  // Users
  async findUserByEmail(email) {
    if (mongoose.connection.readyState === 1) {
      const User = require('../models/User');
      return await User.findOne({ email: email.toLowerCase() });
    }
    const data = loadLocalDB();
    return data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  async findUserById(id) {
    if (mongoose.connection.readyState === 1) {
      const User = require('../models/User');
      return await User.findById(id);
    }
    const data = loadLocalDB();
    return data.users.find(u => u.id === id);
  },

  async createUser(userData) {
    if (mongoose.connection.readyState === 1) {
      const User = require('../models/User');
      const user = new User(userData);
      return await user.save();
    }
    const data = loadLocalDB();
    const newUser = { id: `usr-${Date.now()}`, ...userData, createdAt: new Date().toISOString() };
    data.users.push(newUser);
    saveLocalDB(data);
    return newUser;
  },

  // Blogs
  async getBlogs({ category, search } = {}) {
    if (mongoose.connection.readyState === 1) {
      const Blog = require('../models/Blog');
      let query = {};
      if (category && category !== 'All') query.category = category;
      if (search) query.$or = [{ title: new RegExp(search, 'i') }, { tags: new RegExp(search, 'i') }];
      return await Blog.find(query).sort({ publishedAt: -1 });
    }
    const data = loadLocalDB();
    let blogs = [...data.blogs];
    if (category && category !== 'All') blogs = blogs.filter(b => b.category === category);
    if (search) {
      const q = search.toLowerCase();
      blogs = blogs.filter(b => b.title.toLowerCase().includes(q) || b.tags.some(t => t.toLowerCase().includes(q)));
    }
    return blogs;
  },

  async getBlogById(idOrSlug) {
    if (mongoose.connection.readyState === 1) {
      const Blog = require('../models/Blog');
      return (await Blog.findOne({ slug: idOrSlug })) || (mongoose.isValidObjectId(idOrSlug) ? await Blog.findById(idOrSlug) : null);
    }
    const data = loadLocalDB();
    return data.blogs.find(b => b.id === idOrSlug || b.slug === idOrSlug);
  },

  async createBlog(blogData) {
    if (mongoose.connection.readyState === 1) {
      const Blog = require('../models/Blog');
      const blog = new Blog(blogData);
      return await blog.save();
    }
    const data = loadLocalDB();
    const newBlog = { id: `blog-${Date.now()}`, ...blogData, likes: 0, comments: [], publishedAt: new Date().toISOString() };
    data.blogs.unshift(newBlog);
    saveLocalDB(data);
    return newBlog;
  },

  async updateBlog(id, updateData) {
    if (mongoose.connection.readyState === 1) {
      const Blog = require('../models/Blog');
      return await Blog.findByIdAndUpdate(id, updateData, { new: true });
    }
    const data = loadLocalDB();
    const idx = data.blogs.findIndex(b => b.id === id || b.slug === id);
    if (idx === -1) return null;
    data.blogs[idx] = { ...data.blogs[idx], ...updateData };
    saveLocalDB(data);
    return data.blogs[idx];
  },

  async deleteBlog(id) {
    if (mongoose.connection.readyState === 1) {
      const Blog = require('../models/Blog');
      return await Blog.findByIdAndDelete(id);
    }
    const data = loadLocalDB();
    const initialLen = data.blogs.length;
    data.blogs = data.blogs.filter(b => b.id !== id && b.slug !== id);
    saveLocalDB(data);
    return data.blogs.length < initialLen;
  },

  async likeBlog(id) {
    if (mongoose.connection.readyState === 1) {
      const Blog = require('../models/Blog');
      return await Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
    }
    const data = loadLocalDB();
    const blog = data.blogs.find(b => b.id === id || b.slug === id);
    if (blog) {
      blog.likes = (blog.likes || 0) + 1;
      saveLocalDB(data);
    }
    return blog;
  },

  async addComment(id, commentData) {
    if (mongoose.connection.readyState === 1) {
      const Blog = require('../models/Blog');
      return await Blog.findByIdAndUpdate(
        id,
        { $push: { comments: commentData } },
        { new: true }
      );
    }
    const data = loadLocalDB();
    const blog = data.blogs.find(b => b.id === id || b.slug === id);
    if (blog) {
      const newComment = { id: `c-${Date.now()}`, ...commentData, createdAt: new Date().toISOString() };
      blog.comments = blog.comments || [];
      blog.comments.push(newComment);
      saveLocalDB(data);
      return newComment;
    }
    return null;
  },

  // Contact Messages
  async saveContactMessage(msgData) {
    if (mongoose.connection.readyState === 1) {
      const Contact = require('../models/Contact');
      const msg = new Contact(msgData);
      return await msg.save();
    }
    const data = loadLocalDB();
    const newMsg = { id: `msg-${Date.now()}`, ...msgData, receivedAt: new Date().toISOString() };
    data.contactMessages = data.contactMessages || [];
    data.contactMessages.unshift(newMsg);
    saveLocalDB(data);
    return newMsg;
  },

  async getContactMessages() {
    if (mongoose.connection.readyState === 1) {
      const Contact = require('../models/Contact');
      return await Contact.find().sort({ receivedAt: -1 });
    }
    const data = loadLocalDB();
    return data.contactMessages || [];
  },

  // Projects
  async getProjects(category) {
    const data = loadLocalDB();
    let projects = data.projects || [];
    if (category && category !== 'all') {
      projects = projects.filter(p => p.category === category);
    }
    return projects;
  }
};

module.exports = db;
