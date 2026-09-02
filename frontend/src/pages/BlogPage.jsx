import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, ThumbsUp, PlusCircle, BookOpen } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import API_BASE_URL from '../config/api';
import { seedBlogs } from '../data/seedData';

const categories = ['All', 'AI & Data Science', 'Web & Node.js Dev', 'Zoho & Automation', 'General Tech'];

const safeJsonParse = async (res) => {
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
};

const BlogPage = () => {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState(seedBlogs);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  useEffect(() => {
    fetchBlogs();
  }, [selectedCat]);

  const fetchBlogs = (queryStr = search) => {
    setLoading(true);
    let url = `${API_BASE_URL}/api/blogs?category=${encodeURIComponent(selectedCat)}`;
    if (queryStr) {
      url += `&search=${encodeURIComponent(queryStr)}`;
    }

    fetch(url)
      .then(safeJsonParse)
      .then(data => {
        if (data && data.blogs && data.blogs.length > 0) {
          setBlogs(data.blogs);
        } else {
          // Filter seedBlogs locally as fallback
          let filtered = seedBlogs;
          if (selectedCat !== 'All') {
            filtered = filtered.filter(b => b.category === selectedCat);
          }
          if (queryStr) {
            const q = queryStr.toLowerCase();
            filtered = filtered.filter(b => b.title.toLowerCase().includes(q) || b.tags.some(t => t.toLowerCase().includes(q)));
          }
          setBlogs(filtered);
        }
      })
      .catch(() => {
        let filtered = seedBlogs;
        if (selectedCat !== 'All') {
          filtered = filtered.filter(b => b.category === selectedCat);
        }
        if (queryStr) {
          const q = queryStr.toLowerCase();
          filtered = filtered.filter(b => b.title.toLowerCase().includes(q) || b.tags.some(t => t.toLowerCase().includes(q)));
        }
        setBlogs(filtered);
      })
      .finally(() => setLoading(false));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchBlogs(search);
  };

  return (
    <div className="section-container blog-stream-container">
      <div className="blog-header">
        <span className="section-subtitle">Insights &amp; Tutorials</span>
        <h1 className="section-title">Tech Articles &amp; Blog</h1>
        <div className="title-underline"></div>
        <p style={{ color: 'var(--text-muted)', marginTop: '16px' }}>
          Deep dives into AI models, Node.js REST API design, and Zoho Deluge scripting workflows.
        </p>

        {user && (
          <div style={{ marginTop: '20px' }}>
            <Link to="/dashboard" className="btn btn-primary">
              <PlusCircle size={18} /> Create New Blog Post
            </Link>
          </div>
        )}
      </div>

      {/* Search & Category Filter Bar */}
      <form onSubmit={handleSearchSubmit} className="blog-search-bar">
        <input
          type="text"
          className="form-input"
          placeholder="Search articles by title, topic, or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" style={{ padding: '0 20px' }}>
          <Search size={18} />
        </button>
      </form>

      <div className="project-filters" style={{ marginBottom: '40px' }}>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`filter-btn ${selectedCat === cat ? 'active' : ''}`}
            onClick={() => setSelectedCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
          Loading articles...
        </div>
      ) : blogs.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '60px' }}>
          <h3>No articles found</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
            Try clearing your search terms or picking another category.
          </p>
        </div>
      ) : (
        <div className="blog-grid">
          {blogs.map((b) => (
            <div key={b.id} className="glass-panel blog-card">
              <img src={b.coverImage} alt={b.title} className="blog-cover-img" />
              <div className="blog-card-content">
                <div className="blog-meta">
                  <span className="project-cat">{b.category}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {b.readTime}
                  </span>
                </div>

                <Link to={`/blog/${b.slug || b.id}`} className="blog-card-title">
                  {b.title}
                </Link>

                <p className="blog-card-excerpt">{b.excerpt}</p>

                <div className="blog-author">
                  <div className="author-avatar" style={{ background: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {b.authorName ? b.authorName[0] : 'N'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="author-name">{b.authorName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      {new Date(b.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <ThumbsUp size={14} /> {b.likes}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
