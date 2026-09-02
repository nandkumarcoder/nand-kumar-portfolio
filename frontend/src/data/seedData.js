export const seedBlogs = [
  {
    id: 'post-1',
    title: 'Architecting Scalable Microservices with Node.js & Express',
    slug: 'architecting-scalable-microservices-nodejs-express',
    category: 'Web & Node.js Dev',
    readTime: '6 min read',
    publishedAt: '2026-02-15T10:00:00.000Z',
    likes: 42,
    authorName: 'Nand Kumar',
    authorBio: 'Full-Stack Software Engineer specializing in Node.js backends, AI models, and Zoho automation.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Deep dive into event-driven architecture, clustering, Redis caching, and building robust RESTful APIs in Node.js.',
    content: `Building scalable backend systems requires careful architectural choices. In this article, we explore how Node.js excels at asynchronous I/O and how to maximize its concurrency model.

### Key Architectural Pillars:
1. **Event-Driven Architecture**: Leveraging Node's libuv event loop for non-blocking operations.
2. **Clustering & Worker Threads**: Utilizing multi-core CPUs for CPU-bound tasks.
3. **Caching Layer**: Integrating Redis to reduce database read latency by up to 80%.
4. **Resilient Middleware**: Designing robust error-handling and request throttling pipelines in Express.`,
    tags: ['Node.js', 'Express', 'Microservices', 'Backend', 'JavaScript'],
    comments: [
      { id: 'c1', userName: 'DevRaj', comment: 'Great insights on event-loop optimization!', createdAt: '2026-02-16T12:00:00.000Z' }
    ]
  },
  {
    id: 'post-2',
    title: 'Automating Enterprise Business Pipelines with Zoho Deluge',
    slug: 'automating-enterprise-business-pipelines-zoho-deluge',
    category: 'Zoho & Automation',
    readTime: '5 min read',
    publishedAt: '2026-02-10T14:30:00.000Z',
    likes: 38,
    authorName: 'Nand Kumar',
    authorBio: 'Full-Stack Software Engineer specializing in Node.js backends, AI models, and Zoho automation.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Mastering Deluge scripting for custom CRM workflows, webhook listeners, Creator portals, and external API sync.',
    content: `Zoho Deluge is a domain-specific scripting language designed to automate complex logic across Zoho Creator, CRM, Books, and Desk.

### Essential Automation Workflows:
- **Lead Qualification Hooks**: Automatically scoring incoming prospects and assigning reps.
- **Bi-directional Webhooks**: Syncing order updates with third-party ERPs and Node.js microservices.
- **Custom Functions in Deluge**: Writing clean, reusable business logic modules.`,
    tags: ['Zoho', 'Deluge', 'CRM', 'Automation', 'Integration'],
    comments: []
  },
  {
    id: 'post-3',
    title: 'Deploying Deep Learning LSTM Models for Time-Series Forecasting',
    slug: 'deploying-deep-learning-lstm-models-time-series-forecasting',
    category: 'AI & Data Science',
    readTime: '8 min read',
    publishedAt: '2026-01-28T09:15:00.000Z',
    likes: 56,
    authorName: 'Nand Kumar',
    authorBio: 'Full-Stack Software Engineer specializing in Node.js backends, AI models, and Zoho automation.',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    excerpt: 'A practical guide to training LSTM neural networks with TensorFlow for accurate demand forecasting and inventory optimization.',
    content: `Time-series predictions demand memory of sequential dependencies. Long Short-Term Memory (LSTM) recurrent networks solve the vanishing gradient problem in standard RNNs.

### Pipeline Breakdown:
1. **Data Preprocessing**: Min-Max feature scaling and sliding window sequence formulation.
2. **Model Architecture**: Stacking LSTM layers with Dropout regularisation.
3. **Evaluation Metrics**: Tracking RMSE and MAPE across test validation sets.`,
    tags: ['AI', 'Data Science', 'TensorFlow', 'Python', 'LSTM'],
    comments: []
  }
];

export const fallbackAdminUser = {
  id: 'usr-1',
  name: 'Nand Kumar',
  email: 'nandkumarcoder@gmail.com',
  role: 'admin',
  title: 'Full-Stack Developer | AI, Data Science, Node.js & Zoho Specialist',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
};
