import React from 'react';
import logoImg from '../assets/logo.png';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const Footer = () => {
  return (
    <footer className="portfolio-footer">
      <div className="footer-content">
        <img src={logoImg} alt="Nand Kumar Logo" className="logo-img" style={{ width: '48px', height: '48px' }} />
        <p className="footer-credit">
          &copy; {new Date().getFullYear()} Nand Kumar. All rights reserved. Crafted from Kanpur, Uttar Pradesh, India.
        </p>
        <div className="hero-socials">
          <a href="https://github.com/nandkumarcoder" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
            <GithubIcon size={20} />
          </a>
          <a href="mailto:nandkumarcoder@gmail.com" className="social-link" title="Email">
            <Mail size={20} />
          </a>
          <a href="https://www.linkedin.com/in/nand-kumar-943jf/" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
            <LinkedinIcon size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
