import React, { useState, useEffect } from 'react';
import { ExternalLink, TrendingUp, Network, RefreshCw, MessageSquare, Newspaper, Users } from 'lucide-react';
import { GithubIcon } from './Icons';
import API_BASE_URL from '../config/api';

const initialProjects = [
  {
    id: 'proj-1',
    title: 'Neural Sales Forecaster',
    category: 'ai-ds',
    categoryName: 'AI & Data Science',
    description: 'An LSTM-based sales volume forecaster built to predict inventory needs using past transactional histories, resolving demand peaks with 94% accuracy.',
    tech: ['Python', 'TensorFlow', 'Pandas', 'NumPy'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    githubUrl: 'https://github.com/nandkumarcoder',
    demoUrl: 'https://github.com/nandkumarcoder/nand-kumar-portfolio',
    icon: <TrendingUp size={16} />
  },
  {
    id: 'proj-2',
    title: 'OmniTask Kanban Dashboard',
    category: 'web-nodejs',
    categoryName: 'Node.js & Web',
    description: 'A full-featured team coordination application utilizing Node.js Express backend, PostgreSQL database, and asynchronous task notifications.',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'CSS Glassmorphism'],
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800',
    githubUrl: 'https://github.com/nandkumarcoder',
    demoUrl: 'https://github.com/nandkumarcoder/nand-kumar-portfolio',
    icon: <Network size={16} />
  },
  {
    id: 'proj-3',
    title: 'Custom CRM Leads Sync System',
    category: 'zoho',
    categoryName: 'Zoho & Automation',
    description: 'A Deluge-based integration solution synchronizing external landing pages with Zoho CRM leads pipeline, triggering tailored onboarding campaigns.',
    tech: ['Zoho Creator', 'Deluge Script', 'Zoho Flows', 'REST Webhooks'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    githubUrl: 'https://github.com/nandkumarcoder',
    demoUrl: 'https://github.com/nandkumarcoder/nand-kumar-portfolio',
    icon: <RefreshCw size={16} />
  },
  {
    id: 'proj-4',
    title: 'Sentiment Sentiment Analyzer',
    category: 'ai-ds',
    categoryName: 'AI & Data Science',
    description: 'NLP analyzer mapping review polarity. Generates actionable feedback dashboards to show negative/positive word clustering and entity mappings.',
    tech: ['Python', 'NLTK', 'Scikit-Learn', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    githubUrl: 'https://github.com/nandkumarcoder',
    demoUrl: 'https://github.com/nandkumarcoder/nand-kumar-portfolio',
    icon: <MessageSquare size={16} />
  },
  {
    id: 'proj-5',
    title: 'Secure Restful API Portal',
    category: 'web-nodejs',
    categoryName: 'Node.js & Web',
    description: 'Token-secured REST APIs for file exchanges. Features auto-throttling, Express.js middleware validation, and dynamic analytics logs.',
    tech: ['Node.js', 'Express', 'SQLite', 'JWT Auth'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    githubUrl: 'https://github.com/nandkumarcoder',
    demoUrl: 'https://github.com/nandkumarcoder/nand-kumar-portfolio',
    icon: <Newspaper size={16} />
  },
  {
    id: 'proj-6',
    title: 'Vendor Management Portal',
    category: 'zoho',
    categoryName: 'Zoho & Automation',
    description: 'Low-code portal built in Zoho Creator. Permits vendors to upload logs, invoices, and trigger automatic approvals via Deluge email notifications.',
    tech: ['Zoho Creator', 'Deluge SQL', 'Zoho Analytics'],
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    githubUrl: 'https://github.com/nandkumarcoder',
    demoUrl: 'https://github.com/nandkumarcoder/nand-kumar-portfolio',
    icon: <Users size={16} />
  }
];

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState(initialProjects);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects?category=${filter}`)
      .then(res => res.json())
      .then(data => {
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects.map((p, idx) => ({
            ...p,
            image: p.image || initialProjects[idx % initialProjects.length]?.image,
            icon: initialProjects[idx % initialProjects.length]?.icon || <TrendingUp size={16} />
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
            {/* Project Cover Image */}
            <div className="project-thumb-wrapper" style={{ position: 'relative', overflow: 'hidden', height: '210px', borderRadius: '16px 16px 0 0' }}>
              <img
                src={p.image}
                alt={p.title}
                className="project-img"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800';
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(7, 9, 19, 0.9) 0%, rgba(7, 9, 19, 0.2) 60%, transparent 100%)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(7, 9, 19, 0.75)',
                  backdropFilter: 'blur(8px)',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  border: '1px solid var(--border-glass)',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: 'var(--accent-cyan)'
                }}
              >
                {p.icon}
                <span>{p.categoryName}</span>
              </div>
            </div>

            <div className="project-body" style={{ padding: '24px' }}>
              <h3 className="project-title" style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{p.title}</h3>
              <p className="project-desc" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '16px' }}>{p.description}</p>

              <div className="project-tech" style={{ marginBottom: '20px' }}>
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
                <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="proj-link">
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
