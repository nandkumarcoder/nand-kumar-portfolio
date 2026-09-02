const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');
const Blog = require('../models/Blog');
const Contact = require('../models/Contact');
const initialStore = require('../data/store');

async function seedAtlas() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ MONGODB_URI not found in backend/.env file!');
    console.log('👉 Please add: MONGODB_URI=mongodb+srv://... in backend/.env');
    process.exit(1);
  }

  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB Atlas!');

    // Read local database
    const dbPath = path.join(__dirname, '..', 'data', 'database.json');
    let localData = initialStore;
    if (fs.existsSync(dbPath)) {
      try {
        localData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      } catch (e) {
        localData = initialStore;
      }
    }

    // 1. Seed Users
    console.log('🔄 Migrating Users to Atlas...');
    await User.deleteMany({});
    for (const u of localData.users || []) {
      await User.create({
        name: u.name,
        email: u.email,
        password: u.password,
        role: u.role || 'blogger',
        title: u.title,
        avatar: u.avatar,
        bio: u.bio,
        createdAt: u.createdAt || new Date()
      });
    }
    console.log(`✅ Seeded ${localData.users?.length || 0} users into Atlas.`);

    // 2. Seed Blogs
    console.log('🔄 Migrating Blogs to Atlas...');
    await Blog.deleteMany({});
    for (const b of localData.blogs || []) {
      await Blog.create({
        title: b.title,
        slug: b.slug,
        excerpt: b.excerpt,
        content: b.content,
        category: b.category,
        tags: b.tags,
        coverImage: b.coverImage,
        readTime: b.readTime,
        likes: b.likes || 0,
        authorId: b.authorId || 'usr-1',
        authorName: b.authorName || 'Nand Kumar',
        authorBio: b.authorBio,
        comments: b.comments || [],
        publishedAt: b.publishedAt || new Date()
      });
    }
    console.log(`✅ Seeded ${localData.blogs?.length || 0} blogs into Atlas.`);

    // 3. Seed Contact Messages
    if (localData.contactMessages && localData.contactMessages.length > 0) {
      console.log('🔄 Migrating Contact Messages to Atlas...');
      await Contact.deleteMany({});
      for (const m of localData.contactMessages) {
        await Contact.create({
          name: m.name,
          email: m.email,
          subject: m.subject,
          message: m.message,
          receivedAt: m.receivedAt || new Date()
        });
      }
      console.log(`✅ Seeded ${localData.contactMessages.length} contact messages.`);
    }

    console.log('🎉 ALL DATA SUCCESSFULLY MIGRATED TO MONGODB ATLAS!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration Error:', err.message);
    process.exit(1);
  }
}

seedAtlas();
