import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import BlogPage from './pages/BlogPage';
import BlogPostDetail from './pages/BlogPostDetail';
import SignInPage from './pages/SignInPage';
import DashboardPage from './pages/DashboardPage';

// Use basename for GitHub Pages deployment (sub-path routing)
const basename = import.meta.env.MODE === 'production' ? '/nand-kumar-portfolio' : '/';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router basename={basename}>
          <div className="app-wrapper">
            <ParticleBackground />
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:idOrSlug" element={<BlogPostDetail />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
