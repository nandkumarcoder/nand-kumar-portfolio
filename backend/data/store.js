const bcrypt = require('bcryptjs');

// Pre-hashed default password 'Nand@1234'
const defaultPasswordHash = bcrypt.hashSync('Nand@1234', 10);

const store = {
  users: [
    {
      id: 'usr-1',
      name: 'Nand Kumar',
      email: 'nandkumarcoder@gmail.com',
      password: defaultPasswordHash,
      role: 'admin',
      title: 'Full-Stack Developer | AI, Data Science, Node.js & Zoho Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      bio: 'Multi-disciplinary Full-Stack Software Engineer from Kanpur, India. Passionate about AI models, React frontends, Node.js backends, and Zoho automation.',
      createdAt: new Date('2026-01-01').toISOString()
    },
    {
      id: 'usr-2',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      password: bcrypt.hashSync('user1234', 10),
      role: 'blogger',
      title: 'Full Stack Tech Writer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
      bio: 'Enthusiastic web developer writing about modern JavaScript frameworks and API design.',
      createdAt: new Date('2026-02-15').toISOString()
    }
  ],

  blogs: [
    {
      id: 'blog-1',
      title: 'Architecting Scalable Deluge Workflows in Zoho Creator',
      slug: 'architecting-scalable-deluge-workflows-zoho-creator',
      excerpt: 'Learn how to structure complex business logic in Zoho Deluge scripting without hitting API rate limits or execution timeouts.',
      content: `### Introduction to Zoho Deluge Scripting
Zoho Creator and Zoho CRM rely heavily on **Deluge** (Data Enriched Language for Universal Detailed Applications). When designing enterprise workflows, performance optimization is critical.

### Key Strategies for High-Volume Deluge Scripts:
1. **Bulk API Webhooks**: Minimize round-trip HTTP requests by batching data updates using Map structures.
2. **Custom Functions with Async Triggers**: Offload heavy computational tasks or third-party CRM syncing to async schedule triggers.
3. **Optimized Record Fetching**: Use indexed criteria searches instead of full table scans.

\`\`\`deluge
// Example Deluge Snippet for Lead Auto-Routing
leadRecord = zoho.crm.getRecordById("Leads", leadId.toLong());
if(leadRecord.get("City") == "Kanpur")
{
    updateMap = Map();
    updateMap.put("Lead_Status", "Priority Assigned");
    zoho.crm.updateRecord("Leads", leadId.toLong(), updateMap);
}
\`\`\`

### Conclusion
By structuring custom Deluge functions modularly, you achieve robust enterprise automation within the Zoho ecosystem.`,
      category: 'Zoho & Automation',
      tags: ['Zoho Creator', 'Deluge Script', 'CRM', 'Automation'],
      authorId: 'usr-1',
      authorName: 'Nand Kumar',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      readTime: '5 min read',
      likes: 24,
      publishedAt: '2026-08-20T10:00:00Z',
      comments: [
        {
          id: 'c-1',
          userName: 'Alex Johnson',
          comment: 'Awesome article! The tip on Deluge map batching saved us a ton of API credits.',
          createdAt: '2026-08-21T14:30:00Z'
        }
      ]
    },
    {
      id: 'blog-2',
      title: 'Deploying TensorFlow LSTM Models alongside Node.js Express Framework',
      slug: 'deploying-tensorflow-lstm-nodejs-express-framework',
      excerpt: 'A practical guide to wrapping deep learning time-series forecasters in asynchronous Node.js Express API endpoints.',
      content: `### Combining AI with Node.js Web Ecosystems
Machine learning models often sit isolated in Jupyter notebooks. To deliver real business value, they must be served as reliable Node.js RESTful endpoints.

### Architecture Overview
- **Model Training**: Offline training with TensorFlow/Keras saved as \`.h5\` or SavedModel format.
- **Backend API**: Node.js Express API loading model weights or calling Python subprocesses.
- **Client App**: React frontend rendering live dynamic charts.

\`\`\`javascript
// Node.js Express View sample
const express = require('express');
const router = express.Router();

router.post('/predict', async (req, res) => {
    const { history } = req.body;
    const prediction = await predictSales(history);
    res.json({ predicted_sales: prediction });
});
\`\`\`

### Lessons Learned
Always keep pre-processing functions aligned between training and inference scripts to prevent data drift!`,
      category: 'AI & Data Science',
      tags: ['TensorFlow', 'Node.js', 'Express', 'Machine Learning', 'REST API'],
      authorId: 'usr-1',
      authorName: 'Nand Kumar',
      coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      readTime: '7 min read',
      likes: 42,
      publishedAt: '2026-08-15T09:00:00Z',
      comments: []
    },
    {
      id: 'blog-3',
      title: 'Modern UI/UX Design with Glassmorphism and CSS Custom Properties',
      slug: 'modern-ui-ux-design-glassmorphism-css',
      excerpt: 'How to build visually stunning dark-mode web interfaces using frosted glass aesthetics, CSS variables, and fluid canvas animations.',
      content: `### The Rise of High-End Dark UI Aesthetics
Modern web applications prioritize visual depth, ambient glow, and fluid feedback. Glassmorphism combines semi-transparent backgrounds with backdrop blur filters.

### Key CSS Rules:
- \`backdrop-filter: blur(16px) saturate(180%)\`
- Subtle border gradients with \`rgba(255, 255, 255, 0.15)\`
- Layered shadow drop effects for elevation depth

\`\`\`css
.glass-card {
  background: rgba(18, 24, 36, 0.65);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
}
\`\`\`

Try combining glassmorphic cards with animated canvas particle networks for an ultra-premium feel!`,
      category: 'Web & Node.js Dev',
      tags: ['CSS3', 'Glassmorphism', 'Frontend', 'UI Design'],
      authorId: 'usr-2',
      authorName: 'Alex Johnson',
      coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
      readTime: '4 min read',
      likes: 19,
      publishedAt: '2026-08-28T16:20:00Z',
      comments: []
    }
  ],

  projects: [
    {
      id: 'proj-1',
      title: 'Neural Sales Forecaster',
      category: 'ai-ds',
      categoryName: 'AI & Data Science',
      description: 'An LSTM-based sales volume forecaster built to predict inventory needs using past transactional histories, resolving demand peaks with 94% accuracy.',
      tech: ['Python', 'TensorFlow', 'Pandas', 'NumPy'],
      githubUrl: 'https://github.com/nandkumarcoder',
      demoUrl: '#',
      icon: 'fa-chart-line',
      bgType: 'ai-bg'
    },
    {
      id: 'proj-2',
      title: 'OmniTask Kanban Dashboard',
      category: 'web-nodejs',
      categoryName: 'Node.js & Web',
      description: 'A full-featured team coordination application utilizing Node.js Express backend, PostgreSQL database, and asynchronous task notifications via JS fetch APIs.',
      tech: ['Node.js', 'Express', 'PostgreSQL', 'CSS Glassmorphism'],
      githubUrl: 'https://github.com/nandkumarcoder',
      demoUrl: '#',
      icon: 'fa-network-wired',
      bgType: 'django-bg'
    },
    {
      id: 'proj-3',
      title: 'Custom CRM Leads Sync System',
      category: 'zoho',
      categoryName: 'Zoho & Automation',
      description: 'A Deluge-based integration solution synchronizing external landing pages with Zoho CRM leads pipeline, triggering tailored onboarding campaigns.',
      tech: ['Zoho Creator', 'Deluge Script', 'Zoho Flows', 'REST Webhooks'],
      githubUrl: 'https://github.com/nandkumarcoder',
      demoUrl: '#',
      icon: 'fa-rotate',
      bgType: 'zoho-bg'
    },
    {
      id: 'proj-4',
      title: 'Sentiment Sentiment Analyzer',
      category: 'ai-ds',
      categoryName: 'AI & Data Science',
      description: 'NLP analyzer mapping review polarity. Generates actionable feedback dashboards to show negative/positive word clustering and entity mappings.',
      tech: ['Python', 'NLTK', 'Scikit-Learn', 'Node.js'],
      githubUrl: 'https://github.com/nandkumarcoder',
      demoUrl: '#',
      icon: 'fa-comments',
      bgType: 'nlp-bg'
    },
    {
      id: 'proj-5',
      title: 'Secure Restful API Portal',
      category: 'web-nodejs',
      categoryName: 'Node.js & Web',
      description: 'Token-secured REST APIs for file exchanges. Features auto-throttling, Express.js middleware validation, and dynamic analytics logs.',
      tech: ['Node.js', 'Express', 'SQLite', 'JWT Auth'],
      githubUrl: 'https://github.com/nandkumarcoder',
      demoUrl: '#',
      icon: 'fa-newspaper',
      bgType: 'blog-bg'
    },
    {
      id: 'proj-6',
      title: 'Vendor Management Portal',
      category: 'zoho',
      categoryName: 'Zoho & Automation',
      description: 'Low-code portal built in Zoho Creator. Permits vendors to upload logs, invoices, and trigger automatic approvals via Deluge email notifications.',
      tech: ['Zoho Creator', 'Deluge SQL', 'Zoho Analytics'],
      githubUrl: 'https://github.com/nandkumarcoder',
      demoUrl: '#',
      icon: 'fa-users-gear',
      bgType: 'client-bg'
    }
  ],

  contactMessages: [],

  chatbotKnowledge: [
    {
      keywords: ['zoho', 'deluge', 'creator', 'crm'],
      response: "Nand is an expert in the Zoho Ecosystem! He builds low-code apps on Zoho Creator, crafts complex Deluge scripts, sets up Zoho CRM integrations, and automates business workflows via Zoho Flows."
    },
    {
      keywords: ['node', 'nodejs', 'express', 'javascript', 'backend', 'web', 'api', 'rest'],
      response: "Nand specializes in Node.js and Express backend development. He builds scalable REST APIs using Node.js, designs PostgreSQL/SQLite databases, and integrates web applications with modern React frontends."
    },
    {
      keywords: ['ai', 'data science', 'machine learning', 'tensorflow', 'nlp', 'models'],
      response: "In AI & Data Science, Nand develops predictive models (like LSTM neural networks), performs data analysis with Pandas/NumPy, and builds NLP sentiment analyzers using Scikit-Learn and TensorFlow."
    },
    {
      keywords: ['location', 'where', 'kanpur', 'city', 'india'],
      response: "Nand Kumar is based in Kanpur, Uttar Pradesh, India."
    },
    {
      keywords: ['contact', 'email', 'hire', 'reach', 'github', 'linkedin'],
      response: "You can email Nand directly at nandkumarcoder@gmail.com, reach out via the Contact form on this website, or connect on LinkedIn (nand-kumar-943jf) and GitHub (@nandkumarcoder)."
    }
  ]
};

module.exports = store;
