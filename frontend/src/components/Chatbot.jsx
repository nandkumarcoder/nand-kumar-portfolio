import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import API_BASE_URL from '../config/api';

const presetChips = [
  'Tell me about Zoho',
  'What Node.js skills do you have?',
  'Show AI and Data Science skills',
  'Where are you located?',
  'How can I contact you?'
];

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi! I'm Nand's interactive portfolio assistant. Ask me anything about my skills, projects, or how to contact me!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (open) scrollToBottom();
  }, [messages, open]);

  const handleSend = async (queryText) => {
    const q = queryText || input;
    if (!q.trim()) return;

    const userMsg = { sender: 'user', text: q };
    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q })
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: data.answer || "Nand is an expert in AI, Node.js backends, and Zoho Deluge scripting!" }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: "Nand specializes in AI & Data Science, Node.js Web Development, and Zoho Creator & CRM integrations. Contact him at nandkumarcoder@gmail.com!" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-widget">
      <button
        className="chatbot-toggle-btn"
        onClick={() => setOpen(!open)}
        aria-label="Toggle Portfolio Assistant"
      >
        {open ? <X /> : <MessageSquare />}
      </button>

      {open && (
        <div className="glass-panel chatbot-window">
          <div className="chat-header">
            <div className="bot-info">
              <div className="bot-avatar">NK</div>
              <div>
                <div className="bot-title">Nand's Portfolio Bot</div>
                <div className="bot-status">● Active Assistant</div>
              </div>
            </div>
            <button className="close-chat-btn" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="chat-body">
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-bubble ${m.sender}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="chat-bubble bot">Thinking...</div>}

            <div className="chip-group">
              {presetChips.map((chip, idx) => (
                <button
                  key={idx}
                  className="chat-chip-btn"
                  onClick={() => handleSend(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
            <div ref={chatEndRef} />
          </div>

          <form
            className="chat-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              className="chat-input"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="chat-send-btn" disabled={loading}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
