import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import logoImg from '../assets/logo.png';
import { Menu, X, User, LogOut, BookOpen, Sun, Moon, Monitor } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { themeMode, setThemeMode } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleScrollTo = (sectionId) => {
    setMobileOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={() => setMobileOpen(false)}>
          <img src={logoImg} alt="Nand Kumar Logo" className="logo-img" />
          <span>Nand Kumar</span>
        </Link>

        <nav className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <button className="nav-link" onClick={() => handleScrollTo('about')}>
            About
          </button>
          <button className="nav-link" onClick={() => handleScrollTo('skills')}>
            Skills
          </button>
          <button className="nav-link" onClick={() => handleScrollTo('projects')}>
            Projects
          </button>
          <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
            Blog
          </Link>
          <button className="nav-link" onClick={() => handleScrollTo('contact')}>
            Contact
          </button>

          {/* Theme Switcher */}
          <div className="theme-switcher" title="Theme Mode: Light, Dark, System">
            <button
              className={`theme-btn ${themeMode === 'light' ? 'active' : ''}`}
              onClick={() => setThemeMode('light')}
              title="Light Mode"
            >
              <Sun size={15} />
            </button>
            <button
              className={`theme-btn ${themeMode === 'dark' ? 'active' : ''}`}
              onClick={() => setThemeMode('dark')}
              title="Dark Mode"
            >
              <Moon size={15} />
            </button>
            <button
              className={`theme-btn ${themeMode === 'system' ? 'active' : ''}`}
              onClick={() => setThemeMode('system')}
              title="System Preference Mode"
            >
              <Monitor size={15} />
            </button>
          </div>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link to="/dashboard" className="nav-auth-btn" onClick={() => setMobileOpen(false)}>
                <BookOpen size={16} />
                <span>Dashboard ({user.name.split(' ')[0]})</span>
              </Link>
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                className="btn btn-outline"
                style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                title="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/signin" className="nav-auth-btn" onClick={() => setMobileOpen(false)}>
              <User size={16} />
              <span>Blogger Sign In</span>
            </Link>
          )}
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
