import React, { createContext, useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';
import { fallbackAdminUser } from '../data/seedData';

export const AuthContext = createContext();

const API_BASE = `${API_BASE_URL}/api`;

const safeJsonParse = async (res) => {
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return null;
  }
  try {
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && !user) {
      fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(safeJsonParse)
        .then(data => {
          if (data && data.user) {
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await safeJsonParse(res);

      if (data && res.ok) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
      }
    } catch (err) {
      console.warn('Backend server unreachable, trying client fallback...');
    }

    // Client-side fallback authentication if backend is offline or sleeping on free tier
    if (email === 'nandkumarcoder@gmail.com' && password === 'Nand@1234') {
      const fallbackData = { token: 'mock-admin-token-nand', user: fallbackAdminUser };
      setToken(fallbackData.token);
      setUser(fallbackData.user);
      localStorage.setItem('token', fallbackData.token);
      localStorage.setItem('user', JSON.stringify(fallbackData.user));
      return fallbackData;
    } else if (email === 'alex@example.com' && password === 'user1234') {
      const fallbackUser = { id: 'usr-2', name: 'Alex Rivera', email: 'alex@example.com', role: 'user', title: 'Full-Stack Enthusiast' };
      const fallbackData = { token: 'mock-user-token', user: fallbackUser };
      setToken(fallbackData.token);
      setUser(fallbackData.user);
      localStorage.setItem('token', fallbackData.token);
      localStorage.setItem('user', JSON.stringify(fallbackData.user));
      return fallbackData;
    }

    throw new Error('Invalid email or password.');
  };

  const register = async (userData) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await safeJsonParse(res);
      if (data && res.ok) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
      }
    } catch (err) {
      console.warn('Backend server unreachable, registering in client session...');
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: 'user',
      title: userData.title || 'Contributing Blogger'
    };
    setToken(`mock-token-${Date.now()}`);
    setUser(newUser);
    localStorage.setItem('token', `mock-token-${Date.now()}`);
    localStorage.setItem('user', JSON.stringify(newUser));
    return { token: `mock-token-${Date.now()}`, user: newUser };
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
