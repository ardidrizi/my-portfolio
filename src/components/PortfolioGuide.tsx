import React, { useState, useEffect, useRef } from 'react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface Contact {
  email: string;
  phone?: string;
  social?: Record<string, string>;
}

interface Experience {
  years: number;
  field: string;
  recentRole: string;
}

interface Skill {
  name: string;
  level?: number;
}

interface Project {
  title: string;
  description: string;
}

interface PortfolioData {
  projects: Project[];
  skills: Skill[];
  contact: Contact;
  experience: Experience;
}

interface PortfolioGuideProps {
  portfolioData: PortfolioData;
}

const PortfolioGuide: React.FC<PortfolioGuideProps> = ({ portfolioData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: 'Hi there! I can help you explore this portfolio. What would you like to know?' }
  ]);
  const [input, setInput] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sample responses based on keywords
  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('project') || lowerQuery.includes('work')) {
      return `I've worked on ${portfolioData.projects.length} major projects. Would you like to hear about my latest one, "${portfolioData.projects[0].title}"?`;
    } else if (lowerQuery.includes('skill') || lowerQuery.includes('technology')) {
      const randomSkills = portfolioData.skills
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(skill => skill.name)
        .join(', ');
      return `I specialize in various technologies including ${randomSkills}. What specific skill would you like to know more about?`;
    } else if (lowerQuery.includes('contact') || lowerQuery.includes('hire')) {
      return `You can reach out to me at ${portfolioData.contact.email} or check out my social profiles linked in the contact section.`;
    } else if (lowerQuery.includes('experience') || lowerQuery.includes('background')) {
      return `I have ${portfolioData.experience.years} years of experience in ${portfolioData.experience.field}. My most recent role was as a ${portfolioData.experience.recentRole}.`;
    } else {
      return "I'm not sure I understand. Would you like to know about my projects, skills, experience, or how to contact me?";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: input }]);

    // Simulate AI thinking
    setTimeout(() => {
      const response = generateResponse(input);
      setMessages(prev => [...prev, { sender: 'ai', text: response }]);
    }, 1000);

    setInput('');
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`portfolio-guide ${isOpen ? 'open' : 'closed'}`}>
      <button
        className="guide-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close portfolio guide" : "Open portfolio guide"}
      >
        {isOpen ? '✕' : '?'}
      </button>

      {isOpen && (
        <div className="guide-container">
          <div className="guide-header">
            <h3>Portfolio Guide</h3>
            <p>Ask me anything about the portfolio!</p>
          </div>

          <div className="guide-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                <div className="message-content">{msg.text}</div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="guide-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question here..."
              aria-label="Ask a question"
            />
            <button type="submit" aria-label="Send message">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PortfolioGuide;
