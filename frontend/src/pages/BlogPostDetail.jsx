import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, ThumbsUp, MessageSquare, Send, Calendar } from 'lucide-react';
import API_BASE_URL from '../config/api';

const BlogPostDetail = () => {
  const { idOrSlug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [commentForm, setCommentForm] = useState({ userName: '', comment: '' });
  const [commentStatus, setCommentStatus] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/blogs/${idOrSlug}`)
      .then(res => res.json())
      .then(data => {
        if (data.blog) {
          setBlog(data.blog);
          setLikes(data.blog.likes);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [idOrSlug]);

  const handleLike = () => {
    if (!blog) return;
    fetch(`${API_BASE_URL}/api/blogs/${blog.id}/like`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.likes !== undefined) setLikes(data.likes);
      });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentForm.userName || !commentForm.comment) return;

    fetch(`${API_BASE_URL}/api/blogs/${blog.id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentForm)
    })
      .then(res => res.json())
      .then(data => {
        if (data.comment) {
          setBlog(prev => ({
            ...prev,
            comments: [...(prev.comments || []), data.comment]
          }));
          setCommentForm({ userName: '', comment: '' });
          setCommentStatus('Comment added successfully!');
          setTimeout(() => setCommentStatus(''), 3000);
        }
      });
  };

  if (loading) {
    return (
      <div className="section-container" style={{ textAlign: 'center', paddingTop: '160px' }}>
        Loading article details...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="section-container" style={{ textAlign: 'center', paddingTop: '160px' }}>
        <h2>Blog post not found</h2>
        <Link to="/blog" className="btn btn-primary" style={{ marginTop: '20px' }}>
          <ArrowLeft size={16} /> Back to Blog List
        </Link>
      </div>
    );
  }

  return (
    <div className="section-container" style={{ paddingTop: '130px', maxWidth: '840px' }}>
      <Link to="/blog" className="btn btn-outline" style={{ marginBottom: '24px', padding: '8px 16px', fontSize: '0.85rem' }}>
        <ArrowLeft size={16} /> Back to Articles
      </Link>

      <div className="glass-panel" style={{ padding: '40px' }}>
        <span className="project-cat" style={{ fontSize: '0.85rem' }}>{blog.category}</span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', margin: '12px 0 20px', lineHeight: '1.2' }}>
          {blog.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={16} /> {new Date(blog.publishedAt).toLocaleDateString()}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={16} /> {blog.readTime}
          </span>
          <button
            onClick={handleLike}
            className="btn btn-outline"
            style={{ padding: '4px 14px', fontSize: '0.85rem', cursor: 'pointer' }}
          >
            <ThumbsUp size={14} /> {likes} Likes
          </button>
        </div>

        <img
          src={blog.coverImage}
          alt={blog.title}
          style={{ width: '100%', height: '360px', objectFit: 'cover', borderRadius: '16px', marginBottom: '32px' }}
        />

        {/* Blog Content Rendering */}
        <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-main)', whiteSpace: 'pre-line' }}>
          {blog.content}
        </div>

        {/* Tags */}
        <div style={{ marginTop: '40px', borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '12px' }}>TAGS</h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {blog.tags.map((t, idx) => (
              <span key={idx} className="skill-chip">#{t}</span>
            ))}
          </div>
        </div>

        {/* Author Bio Box */}
        <div style={{ marginTop: '40px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '24px', borderRadius: '16px', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 'bold' }}>
            {blog.authorName[0]}
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>Written by {blog.authorName}</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {blog.authorBio || 'Software engineer specializing in AI, Django web backends, and Zoho Creator automation.'}
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <div style={{ marginTop: '50px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MessageSquare size={20} /> Comments ({blog.comments ? blog.comments.length : 0})
          </h3>

          <form onSubmit={handleCommentSubmit} style={{ marginBottom: '32px' }}>
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Name"
                value={commentForm.userName}
                onChange={e => setCommentForm({ ...commentForm, userName: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Comment</label>
              <textarea
                className="form-textarea"
                rows="3"
                placeholder="Share your thoughts on this article..."
                value={commentForm.comment}
                onChange={e => setCommentForm({ ...commentForm, comment: e.target.value })}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Post Comment <Send size={16} />
            </button>
            {commentStatus && <span style={{ marginLeft: '12px', color: 'var(--accent-emerald)', fontSize: '0.9rem' }}>{commentStatus}</span>}
          </form>

          {blog.comments && blog.comments.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {blog.comments.map(c => (
                <div key={c.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', padding: '16px 20px', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{c.userName}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{c.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
