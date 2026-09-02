import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, BookOpen } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';

const roles = [
  'Full-Stack Developer',
  'AI Developer',
  'Data Scientist',
  'Node.js Developer',
  'Zoho Ecosystem Specialist'
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentRole) {
      typingSpeed = 2000; // Pause at full word
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      typingSpeed = 300;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && displayText !== currentRole) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
      } else if (isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
      } else {
        setIsDeleting(true);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <div className="hero-avatar-wrapper">
          <img src={logoImg} alt="Nand Kumar" className="hero-avatar-img" />
        </div>
        <div>
          <span className="hero-tagline">Welcome to my universe</span>
        </div>
        <h1 className="hero-title">
          Hi, I'm <span className="highlight-name">Nand Kumar</span>
        </h1>

        <div className="typing-container">
          <span>I am a</span>
          <span className="typing-text">{displayText}</span>
          <span className="typing-cursor">&nbsp;</span>
        </div>

        <p className="hero-description">
          A multi-disciplinary <strong>Full-Stack Software Engineer</strong> from Kanpur, India. I build intelligent solutions using{' '}
          <strong style={{ color: 'var(--accent-cyan)' }}>Artificial Intelligence</strong> &amp;{' '}
          <strong style={{ color: 'var(--accent-purple)' }}>Data Science</strong>, design scalable backends with{' '}
          <strong style={{ color: 'var(--accent-emerald)' }}>Node.js &amp; Express</strong>, and automate complex business workflows in the{' '}
          <strong style={{ color: 'var(--accent-rose)' }}>Zoho Ecosystem</strong>.
        </p>

        <div className="hero-actions">
          <button type="button" onClick={() => scrollTo('projects')} className="btn btn-primary">
            View Projects <ArrowRight size={18} />
          </button>
          <Link to="/blog" className="btn btn-outline">
            <BookOpen size={18} /> Explore Blog
          </Link>
          <button type="button" onClick={() => scrollTo('contact')} className="btn btn-outline">
            Let's Connect
          </button>
        </div>

        <div className="hero-socials">
          <a href="https://github.com/nandkumarcoder" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
            <GithubIcon size={22} />
          </a>
          <a href="mailto:nandkumarcoder@gmail.com" className="social-link" title="Email">
            <Mail size={22} />
          </a>
          <a href="https://www.linkedin.com/in/nand-kumar-943jf/" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
            <LinkedinIcon size={22} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
