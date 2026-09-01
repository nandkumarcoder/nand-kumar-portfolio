import React from 'react';
import { MapPin, Mail, Code, Cpu, Database, Server } from 'lucide-react';
import { GithubIcon } from './Icons';

const About = () => {
  return (
    <section id="about" className="section-container">
      <div className="section-header">
        <span className="section-subtitle">Who I Am</span>
        <h2 className="section-title">About Me</h2>
        <div className="title-underline"></div>
      </div>

      <div className="about-grid">
        <div className="about-info">
          <h3>Bridging intelligence with web ecosystems</h3>
          <p>
            Based in the industrial hub of <strong>Kanpur, Uttar Pradesh</strong>, I am a passionate software engineer dedicated to writing clean, performant code. I enjoy translating complex business logic and raw data sets into modern digital solutions.
          </p>
          <p>
            My approach combines mathematical algorithms, data analysis frameworks, robust backend structures like <strong>Node.js &amp; Express</strong>, and rapid custom automation via the <strong>Zoho Suite</strong> (CRM, Creator, Deluge). This allows me to cover everything from neural network design to complete business process automation.
          </p>

          <div className="quick-facts">
            <div className="fact-card">
              <span className="fact-number">AI &amp; DS</span>
              <span className="fact-label">Models &amp; Insights</span>
            </div>
            <div className="fact-card">
              <span className="fact-number">Node.js</span>
              <span className="fact-label">Backend Architecture</span>
            </div>
            <div className="fact-card">
              <span className="fact-number">Zoho</span>
              <span className="fact-label">Creator &amp; Deluge</span>
            </div>
          </div>
        </div>

        <div className="glass-panel metrics-panel">
          <h4>Quick Information</h4>
          <ul className="info-list">
            <li className="info-item">
              <span className="info-key">
                <MapPin size={18} color="var(--accent-cyan)" /> Location:
              </span>
              <span className="info-val">Kanpur, UP, India</span>
            </li>
            <li className="info-item">
              <span className="info-key">
                <Mail size={18} color="var(--accent-purple)" /> Email:
              </span>
              <span className="info-val">
                <a href="mailto:nandkumarcoder@gmail.com">nandkumarcoder@gmail.com</a>
              </span>
            </li>
            <li className="info-item">
              <span className="info-key">
                <GithubIcon size={18} color="var(--accent-emerald)" /> GitHub:
              </span>
              <span className="info-val">
                <a href="https://github.com/nandkumarcoder" target="_blank" rel="noopener noreferrer">
                  nandkumarcoder
                </a>
              </span>
            </li>
            <li className="info-item">
              <span className="info-key">
                <Code size={18} color="var(--accent-rose)" /> Primary Stack:
              </span>
              <span className="info-val">Node.js, Express, Zoho, React</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
