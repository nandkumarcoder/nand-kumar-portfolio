import React from 'react';
import { Brain, Laptop, Settings, Terminal } from 'lucide-react';

const skillsData = [
  {
    icon: <Brain size={28} />,
    iconClass: 'ai-icon',
    title: 'AI & Data Science',
    desc: 'Designing intelligent algorithms and extracting business-critical insights from structured and unstructured data pools.',
    tags: [
      'Machine Learning',
      'Deep Learning',
      'Natural Language Processing',
      'Data Mining',
      'Pandas & NumPy',
      'Matplotlib & Seaborn',
      'Scikit-Learn',
      'TensorFlow'
    ]
  },
  {
    icon: <Laptop size={28} />,
    iconClass: 'web-icon',
    title: 'Web & Node.js Dev',
    desc: 'Constructing scalable web architectures, fully featured RESTful APIs, and fast, responsive React interfaces.',
    tags: [
      'Node.js & Express',
      'React.js',
      'JavaScript (ES6+)',
      'REST APIs',
      'SQLite / PostgreSQL',
      'Responsive Glass UI',
      'Git & GitHub',
      'MVC Architecture'
    ]
  },
  {
    icon: <Settings size={28} />,
    iconClass: 'zoho-icon',
    title: 'Zoho Ecosystem',
    desc: 'Developing low-code applications, CRM integrations, and automating complex tasks within the Zoho Cloud suite.',
    tags: [
      'Zoho Creator',
      'Zoho CRM',
      'Deluge Scripting',
      'Zoho Flow',
      'Zoho Analytics',
      'API Integrations',
      'Workflow Automations',
      'Database Customization'
    ]
  },
  {
    icon: <Terminal size={28} />,
    iconClass: 'prog-icon',
    title: 'Programming Foundations',
    desc: 'Core programming foundations, writing robust algorithms, code optimization, and working across diverse platforms.',
    tags: [
      'Python',
      'JavaScript (ES6+)',
      'SQL / Database Querying',
      'Deluge Script',
      'C / C++ Foundations',
      'Data Structures',
      'Object-Oriented Design',
      'Algorithm Optimization'
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="section-container">
      <div className="section-header">
        <span className="section-subtitle">My Stack</span>
        <h2 className="section-title">Professional Skills</h2>
        <div className="title-underline"></div>
      </div>

      <div className="skills-grid">
        {skillsData.map((cat, idx) => (
          <div key={idx} className="glass-panel skills-category-card">
            <div className={`category-icon ${cat.iconClass}`}>{cat.icon}</div>
            <h3>{cat.title}</h3>
            <p>{cat.desc}</p>
            <ul className="skills-tags">
              {cat.tags.map((t, i) => (
                <li key={i} className="skill-chip">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
