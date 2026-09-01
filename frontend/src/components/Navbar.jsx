import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import logoImg from '../assets/logo.png';
import { Menu, X, User, LogOut, BookOpen, Sun, Moon, Monitor } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { themeMode, setThemeMode } = useContext(ThemeContext);
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img src={logoImg} alt="Nand Kumar Logo" className="logo-img" />
          <span>Nand Kumar</span>
        </Link>

        <nav className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <a href="/#about" className="nav-link">About</a>
          <a href="/#skills" className="nav-link">Skills</a>
          <a href="/#projects" className="nav-link">Projects</a>
          <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`}>
            Blog
          </Link>
          <a href="/#contact" className="nav-link">Contact</a>

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
              <Link to="/dashboard" className="nav-auth-btn">
                <BookOpen size={16} />
                <span>Dashboard ({user.name.split(' ')[0]})</span>
              </Link>
              <button
                onClick={logout}
                className="btn btn-outline"
                style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                title="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/signin" className="nav-auth-btn">
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
