import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logoImg from '../assets/logo.png';
import { LogIn, UserPlus, Eye, EyeOff, AlertCircle } from 'lucide-react';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const SignInPage = () => {
  const { login, register, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');

  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (val && !emailRegex.test(val)) {
      setEmailError('Please enter a valid email address (e.g. name@example.com)');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

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

  return (
    <div className="section-container" style={{ paddingTop: '140px', maxWidth: '520px' }}>
      <div className="glass-panel" style={{ padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <img
            src={logoImg}
            alt="Nand Kumar Logo"
            className="logo-img"
            style={{ width: '64px', height: '64px', margin: '0 auto 16px', borderRadius: '50%', objectFit: 'cover' }}
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
            type="button"
            className={`btn ${!isRegister ? 'btn-primary' : ''}`}
            style={{ flex: 1, padding: '8px', fontSize: '0.85rem', borderRadius: 'var(--radius-full)', background: !isRegister ? '' : 'none', color: !isRegister ? '#fff' : 'var(--text-muted)' }}
            onClick={() => { setIsRegister(false); setError(''); setEmailError(''); }}
          >
            <LogIn size={16} /> Sign In
          </button>
          <button
            type="button"
            className={`btn ${isRegister ? 'btn-primary' : ''}`}
            style={{ flex: 1, padding: '8px', fontSize: '0.85rem', borderRadius: 'var(--radius-full)', background: isRegister ? '' : 'none', color: isRegister ? '#fff' : 'var(--text-muted)' }}
            onClick={() => { setIsRegister(true); setError(''); setEmailError(''); }}
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
              className={`form-input ${emailError ? 'input-error' : ''}`}
              placeholder="name@example.com"
              value={email}
              onChange={handleEmailChange}
              required
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              title="Please enter a valid email address (e.g. name@example.com)"
            />
            {emailError && (
              <div style={{ color: 'var(--accent-rose)', fontSize: '0.8rem', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AlertCircle size={14} /> {emailError}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                style={{ paddingRight: '48px', width: '100%' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  color: showPassword ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px',
                  borderRadius: '50%',
                  transition: 'color 0.2s ease'
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
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
      </div>
    </div>
  );
};

export default SignInPage;
