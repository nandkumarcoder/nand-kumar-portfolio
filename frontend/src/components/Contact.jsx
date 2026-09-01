import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [submitting, setSubmitting] = useState(false);

  // Web3Forms Key (User can insert their key or process via backend)
  const WEB3FORMS_KEY = 'a8f89e47-e62a-4670-9ee7-76b3b55a9b9a'; // Web3Forms direct key placeholder

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', msg: '' });

    try {
      // 1. Send to Backend API
      const backendRes = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, accessKey: WEB3FORMS_KEY })
      });

      // 2. Direct Web3Forms submission to inbox nandkumarcoder@gmail.com
      const web3Res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          subject: `[Portfolio Contact] ${formData.subject}`,
          message: formData.message,
          replyto: formData.email
        })
      });

      if (backendRes.ok || web3Res.ok) {
        setStatus({
          type: 'success',
          msg: '🎉 Thank you! Your message has been sent directly to nandkumarcoder@gmail.com inbox.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', msg: 'Failed to deliver message. Please try clicking the direct email link below.' });
      }
    } catch (err) {
      // Fallback direct email client trigger
      window.location.href = `mailto:nandkumarcoder@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
      setStatus({
        type: 'success',
        msg: 'Opened your mail client to send email directly to nandkumarcoder@gmail.com!'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const directMailtoUrl = `mailto:nandkumarcoder@gmail.com?subject=Portfolio%20Inquiry`;

  return (
    <section id="contact" className="section-container">
      <div className="section-header">
        <span className="section-subtitle">Reach Out</span>
        <h2 className="section-title">Contact Me</h2>
        <div className="title-underline"></div>
      </div>

      <div className="contact-grid">
        <div className="glass-panel contact-info-card">
          <h3>Let's build something epic</h3>
          <p>
            I'm always open to discussing new opportunities, workflow automations, AI modeling, or full-stack web development challenges. Drop me a line!
          </p>

          <div className="contact-details">
            <div className="contact-detail-item">
              <div className="contact-icon">
                <Mail />
              </div>
              <div className="contact-text">
                <label>Direct Inbox Email</label>
                <a href={directMailtoUrl} style={{ color: 'var(--accent-cyan)' }}>
                  nandkumarcoder@gmail.com <ExternalLink size={14} style={{ display: 'inline', marginLeft: '4px' }} />
                </a>
              </div>
            </div>

            <div className="contact-detail-item">
              <div className="contact-icon">
                <MapPin />
              </div>
              <div className="contact-text">
                <label>Based in</label>
                <span>Kanpur, Uttar Pradesh, India</span>
              </div>
            </div>

            <div className="contact-detail-item">
              <div className="contact-icon">
                <GithubIcon />
              </div>
              <div className="contact-text">
                <label>GitHub</label>
                <a href="https://github.com/nandkumarcoder" target="_blank" rel="noopener noreferrer">
                  github.com/nandkumarcoder
                </a>
              </div>
            </div>

            <div className="contact-detail-item">
              <div className="contact-icon">
                <LinkedinIcon />
              </div>
              <div className="contact-text">
                <label>LinkedIn</label>
                <a href="https://www.linkedin.com/in/nand-kumar-943jf/" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/nand-kumar-943jf
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '40px' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-input"
                placeholder="Project Inquiry / Job Opportunity"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                rows="5"
                placeholder="Hey Nand, let's talk about a Full-Stack / Zoho project..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
              <span>{submitting ? 'Sending to Inbox...' : 'Send Message to Inbox'}</span> <Send size={16} />
            </button>

            {status.msg && (
              <div className={`form-status ${status.type}`}>
                {status.msg}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
