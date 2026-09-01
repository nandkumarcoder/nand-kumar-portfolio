import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logoImg from '../assets/logo.png';
import { LogIn, UserPlus, Shield, Sparkles } from 'lucide-react';

const SignInPage = () => {
  const { login, register, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    navigate('/dashboard');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (isRegister) {
        await register({ name, email, password, title, bio });
      } else {
        await login(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed. Check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoFill = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="section-container" style={{ paddingTop: '140px', maxWidth: '520px' }}>
      <div className="glass-panel" style={{ padding: '40px' }}>
        <div style={{ textCenter: 'center', textAlign: 'center', marginBottom: '28px' }}>
          <img
            src={logoImg}
            alt="Nand Kumar Logo"
            className="logo-img"
            style={{ width: '64px', height: '64px', margin: '0 auto 16px' }}
          />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem' }}>
            {isRegister ? 'Blogger Registration' : 'Blogger Sign In'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
            Sign in to publish tech blogs, write tutorials, and manage your articles.
          </p>
        </div>

        {/* Tab Toggle */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-full)', padding: '4px', marginBottom: '24px' }}>
          <button
            className={`btn ${!isRegister ? 'btn-primary' : ''}`}
            style={{ flex: 1, padding: '8px', fontSize: '0.85rem', borderRadius: 'var(--radius-full)', background: !isRegister ? '' : 'none', color: !isRegister ? '#fff' : 'var(--text-muted)' }}
            onClick={() => setIsRegister(false)}
          >
            <LogIn size={16} /> Sign In
          </button>
          <button
            className={`btn ${isRegister ? 'btn-primary' : ''}`}
            style={{ flex: 1, padding: '8px', fontSize: '0.85rem', borderRadius: 'var(--radius-full)', background: isRegister ? '' : 'none', color: isRegister ? '#fff' : 'var(--text-muted)' }}
            onClick={() => setIsRegister(true)}
          >
            <UserPlus size={16} /> Register
          </button>
        </div>

        {error && <div className="form-status error" style={{ marginBottom: '20px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Nand Kumar"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {isRegister && (
            <>
              <div className="form-group">
                <label>Job Title / Headline</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. AI & Web Developer"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Short Bio</label>
                <textarea
                  className="form-textarea"
                  rows="2"
                  placeholder="Tell readers about your technical expertise..."
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                ></textarea>
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? 'Authenticating...' : isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        {/* Demo Credentials Helper Box */}
        <div style={{ marginTop: '30px', borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: '600', marginBottom: '10px' }}>
            <Shield size={16} /> Quick Demo Login Credentials:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => handleDemoFill('nandkumarcoder@gmail.com', 'Nand@1234')}
              className="btn btn-outline"
              style={{ fontSize: '0.8rem', padding: '6px 12px', justifySelf: 'flex-start', textAlign: 'left' }}
            >
              👑 Admin (Nand): nandkumarcoder@gmail.com / Nand@1234
            </button>
            <button
              onClick={() => handleDemoFill('alex@example.com', 'user1234')}
              className="btn btn-outline"
              style={{ fontSize: '0.8rem', padding: '6px 12px', textAlign: 'left' }}
            >
              ✍️ Blogger (Alex): alex@example.com / user1234
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
