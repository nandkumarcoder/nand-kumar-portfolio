import React, { useState, useEffect } from 'react';
import { ExternalLink, TrendingUp, Network, RefreshCw, MessageSquare, Newspaper, Users } from 'lucide-react';
import { GithubIcon } from './Icons';

const initialProjects = [
  {
    id: 'proj-1',
    title: 'Neural Sales Forecaster',
    category: 'ai-ds',
    categoryName: 'AI & Data Science',
    description: 'An LSTM-based sales volume forecaster built to predict inventory needs using past transactional histories, resolving demand peaks with 94% accuracy.',
    tech: ['Python', 'TensorFlow', 'Pandas', 'NumPy'],
    githubUrl: 'https://github.com/nandkumarcoder',
    demoUrl: '#',
    bgType: 'ai-bg',
    icon: <TrendingUp />
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
    bgType: 'django-bg',
    icon: <Network />
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
    bgType: 'zoho-bg',
    icon: <RefreshCw />
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
    bgType: 'nlp-bg',
    icon: <MessageSquare />
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
    bgType: 'blog-bg',
    icon: <Newspaper />
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
    bgType: 'client-bg',
    icon: <Users />
  }
];

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState(initialProjects);

  useEffect(() => {
    fetch(`/api/projects?category=${filter}`)
      .then(res => res.json())
      .then(data => {
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects.map((p, idx) => ({
            ...p,
            icon: initialProjects[idx % initialProjects.length]?.icon || <TrendingUp />
          })));
        }
      })
      .catch(() => {});
  }, [filter]);

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="section-container">
      <div className="section-header">
        <span className="section-subtitle">My Work</span>
        <h2 className="section-title">Featured Projects</h2>
        <div className="title-underline"></div>
      </div>

      <div className="project-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'ai-ds' ? 'active' : ''}`}
          onClick={() => setFilter('ai-ds')}
        >
          AI &amp; Data Science
        </button>
        <button
          className={`filter-btn ${filter === 'web-nodejs' ? 'active' : ''}`}
          onClick={() => setFilter('web-nodejs')}
        >
          Node.js &amp; Web
        </button>
        <button
          className={`filter-btn ${filter === 'zoho' ? 'active' : ''}`}
          onClick={() => setFilter('zoho')}
        >
          Zoho &amp; Automation
        </button>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((p) => (
          <div key={p.id} className="glass-panel project-card">
            <div className={`project-thumb ${p.bgType || 'ai-bg'}`}>
              {p.icon}
            </div>
            <div className="project-body">
              <span className="project-cat">{p.categoryName}</span>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.description}</p>

              <div className="project-tech">
                {p.tech.map((t, idx) => (
                  <span key={idx} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>

              <div className="project-links">
                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="proj-link">
                  <GithubIcon size={16} /> Code
                </a>
                <a href={p.demoUrl} className="proj-link">
                  <ExternalLink size={16} /> Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
