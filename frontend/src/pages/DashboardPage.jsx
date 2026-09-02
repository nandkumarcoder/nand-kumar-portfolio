import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { PlusCircle, Trash2, Edit3, BookOpen, Users, Mail, Clock } from 'lucide-react';
import API_BASE_URL from '../config/api';
import { seedBlogs } from '../data/seedData';

const safeJsonParse = async (res) => {
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
};

const DashboardPage = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('articles'); // 'articles' | 'users'
  const [blogs, setBlogs] = useState(seedBlogs);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'AI & Data Science',
    excerpt: '',
    content: '',
    tags: '',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
  });
  const [formMsg, setFormMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    fetchBlogs();
    if (user.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  const fetchBlogs = () => {
    fetch(`${API_BASE_URL}/api/blogs`)
      .then(safeJsonParse)
      .then(data => {
        if (data && data.blogs) {
          const userBlogs = data.blogs.filter(b => b.authorId === user.id || user.role === 'admin');
          setBlogs(userBlogs);
        }
      })
      .catch(() => {});
  };

  const fetchUsers = () => {
    fetch(`${API_BASE_URL}/api/auth/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(safeJsonParse)
      .then(data => {
        if (data && data.users) {
          setRegisteredUsers(data.users);
        }
      })
      .catch(() => {});
  };

  const handleOpenCreate = () => {
    setEditingBlogId(null);
    setFormData({
      title: '',
      category: 'AI & Data Science',
      excerpt: '',
      content: '',
      tags: '',
      coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (blog) => {
    setEditingBlogId(blog.id || blog._id);
    setFormData({
      title: blog.title,
      category: blog.category,
      excerpt: blog.excerpt,
      content: blog.content,
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || '',
      coverImage: blog.coverImage
    });
    setShowModal(true);
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog article?')) return;
    setBlogs(prev => prev.filter(b => (b.id !== blogId && b._id !== blogId)));

    try {
      await fetch(`${API_BASE_URL}/api/blogs/${blogId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMsg({ type: '', text: '' });

    const tagArray = typeof formData.tags === 'string'
      ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      : formData.tags;

    if (editingBlogId) {
      setBlogs(prev => prev.map(b => (b.id === editingBlogId || b._id === editingBlogId) ? { ...b, ...formData, tags: tagArray } : b));
    } else {
      const newBlog = {
        id: `post-${Date.now()}`,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        ...formData,
        tags: tagArray,
        authorId: user.id || user._id,
        authorName: user.name,
        publishedAt: new Date().toISOString(),
        likes: 0,
        readTime: '4 min read',
        comments: []
      };
      setBlogs(prev => [newBlog, ...prev]);
    }

    setFormMsg({ type: 'success', text: 'Article saved successfully in database!' });

    // Sync to backend MongoDB
    const url = editingBlogId
      ? `${API_BASE_URL}/api/blogs/${editingBlogId}`
      : `${API_BASE_URL}/api/blogs`;
    const method = editingBlogId ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
    } catch {}

    setTimeout(() => {
      setShowModal(false);
      setFormMsg({ type: '', text: '' });
    }, 1000);
  };

  if (!user) return null;

  return (
    <div className="section-container" style={{ paddingTop: '130px' }}>
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <span className="section-subtitle">Creator Workspace</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem' }}>
            Welcome, {user.name} 👋
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            {user.role === 'admin' ? '👑 Administrator Portal (MongoDB Atlas Connected)' : '✍️ Contributing Tech Blogger Portal'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-primary" onClick={handleOpenCreate}>
            <PlusCircle size={18} /> Publish New Article
          </button>
          <button className="btn btn-outline" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>

      {/* Tabs (Articles vs Registered Users) */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button
          className={`filter-btn ${activeTab === 'articles' ? 'active' : ''}`}
          onClick={() => setActiveTab('articles')}
        >
          <BookOpen size={16} style={{ display: 'inline', marginRight: '6px' }} />
          Articles ({blogs.length})
        </button>

        {user.role === 'admin' && (
          <button
            className={`filter-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => { setActiveTab('users'); fetchUsers(); }}
          >
            <Users size={16} style={{ display: 'inline', marginRight: '6px' }} />
            Registered Users ({registeredUsers.length || 'Cloud DB'})
          </button>
        )}
      </div>

      {activeTab === 'articles' ? (
        /* Articles Management */
        blogs.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '60px' }}>
            <BookOpen size={48} color="var(--text-dim)" style={{ marginBottom: '16px' }} />
            <h3>No articles published yet</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px', marginBottom: '20px' }}>
              Click the button below to write your first technical article!
            </p>
            <button className="btn btn-primary" onClick={handleOpenCreate}>
              <PlusCircle size={18} /> Create Article
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {blogs.map(b => (
              <div key={b.id || b._id} className="glass-panel" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img src={b.coverImage} alt={b.title} style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div>
                    <span className="project-cat" style={{ fontSize: '0.75rem' }}>{b.category}</span>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>{b.title}</h4>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                      {b.readTime} • Published {new Date(b.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '0.85rem' }} onClick={() => handleOpenEdit(b)}>
                    <Edit3 size={14} /> Edit
                  </button>
                  <button className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '0.85rem', color: 'var(--accent-rose)' }} onClick={() => handleDelete(b.id || b._id)}>
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Registered Users Table */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '16px' }}>
              All Registered Accounts in MongoDB Atlas
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Whenever any visitor or developer creates an account on your website, their profile is automatically saved here in your MongoDB Atlas database.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {registeredUsers.map((u, idx) => (
                <div key={u._id || u.id || idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '16px 20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      {u.name ? u.name[0] : 'U'}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600' }}>{u.name} <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '999px', background: u.role === 'admin' ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)', color: u.role === 'admin' ? '#000' : 'var(--text-main)', fontWeight: 'bold', marginLeft: '6px' }}>{u.role}</span></div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Mail size={12} /> {u.email}
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textAlign: 'right' }}>
                    <div>{u.title}</div>
                    <div><Clock size={12} style={{ display: 'inline', marginRight: '4px' }} /> Registered: {new Date(u.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto', padding: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '20px' }}>
              {editingBlogId ? 'Edit Article' : 'Publish New Technical Article'}
            </h2>

            {formMsg.text && (
              <div className={`form-status ${formMsg.type}`} style={{ marginBottom: '20px' }}>
                {formMsg.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Article Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Master Node.js Microservices Architecture"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  className="form-input"
                  style={{ background: '#111827' }}
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="AI & Data Science">AI &amp; Data Science</option>
                  <option value="Web & Node.js Dev">Web &amp; Node.js Dev</option>
                  <option value="Zoho & Automation">Zoho &amp; Automation</option>
                  <option value="General Tech">General Tech</option>
                </select>
              </div>

              <div className="form-group">
                <label>Cover Image URL</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.coverImage}
                  onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Short Excerpt (Summary)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Brief 1-2 sentence overview..."
                  value={formData.excerpt}
                  onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Article Content (Markdown supported)</label>
                <textarea
                  className="form-textarea"
                  rows="8"
                  placeholder="Write your article body here..."
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Tags (Comma separated)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Node.js, Express, Microservices, Tutorial"
                  value={formData.tags}
                  onChange={e => setFormData({ ...formData, tags: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingBlogId ? 'Update Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
