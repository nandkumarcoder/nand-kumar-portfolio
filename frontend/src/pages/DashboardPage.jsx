import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { PlusCircle, Trash2, Edit3, BookOpen, UserCheck, Image, FileText } from 'lucide-react';

const DashboardPage = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
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
  }, [user]);

  const fetchBlogs = () => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        const userBlogs = data.blogs.filter(b => b.authorId === user.id || user.role === 'admin');
        setBlogs(userBlogs);
      })
      .finally(() => setLoading(false));
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
    setEditingBlogId(blog.id);
    setFormData({
      title: blog.title,
      category: blog.category,
      excerpt: blog.excerpt,
      content: blog.content,
      tags: blog.tags.join(', '),
      coverImage: blog.coverImage
    });
    setShowModal(true);
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog article?')) return;

    try {
      const res = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setBlogs(blogs.filter(b => b.id !== blogId));
      }
    } catch (err) {
      alert('Failed to delete blog.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMsg({ type: '', text: '' });

    const url = editingBlogId
      ? `/api/blogs/${editingBlogId}`
      : '/api/blogs';
    const method = editingBlogId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        setFormMsg({ type: 'success', text: data.message });
        fetchBlogs();
        setTimeout(() => {
          setShowModal(false);
          setFormMsg({ type: '', text: '' });
        }, 1200);
      } else {
        setFormMsg({ type: 'error', text: data.error || 'Failed to save blog post.' });
      }
    } catch (err) {
      setFormMsg({ type: 'error', text: 'Network error publishing post.' });
    }
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
            {user.role === 'admin' ? 'Administrator & Lead Author Portal' : 'Contributing Tech Blogger Portal'}
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

      {/* Articles Management Table / Grid */}
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '20px' }}>
        Your Published Articles ({blogs.length})
      </h2>

      {loading ? (
        <div>Loading your articles...</div>
      ) : blogs.length === 0 ? (
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
            <div key={b.id} className="glass-panel" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
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
                <button className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '0.85rem', color: 'var(--accent-rose)' }} onClick={() => handleDelete(b.id)}>
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
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
                  placeholder="e.g. Master Django REST Framework Serialization"
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
                  placeholder="Python, Django, REST API, Tutorial"
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
