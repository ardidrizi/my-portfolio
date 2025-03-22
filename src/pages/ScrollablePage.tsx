import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GitHubProjects from '../components/GitHubProjects';
import SkillsGalaxy from '../components/SkillsGalaxy';
import JourneyTimeline from '../components/JourneyTimeline';
import { Link } from 'react-router-dom';

// Sample data for skills
const skills = [
  { name: "React", level: 9, description: "Building modern UIs with React ecosystem" },
  { name: "TypeScript", level: 8, description: "Type-safe JavaScript development" },
  { name: "Node.js", level: 8, description: "Server-side JavaScript development" },
  { name: "CSS/SCSS", level: 8, description: "Styling and animations" },
  { name: "GraphQL", level: 7, description: "Modern API query language" },
  { name: "Next.js", level: 7, description: "React framework for production" },
  { name: "Docker", level: 6, description: "Containerization and deployment" },
  { name: "AWS", level: 6, description: "Cloud infrastructure" },
  { name: "MongoDB", level: 7, description: "NoSQL database" },
  { name: "PostgreSQL", level: 7, description: "Relational database" },
];

// Sample data for timeline
const milestones = [
  {
    year: 2023,
    title: "Senior Full Stack Developer",
    description: "Leading development of enterprise applications",
    technologies: ["React", "Node.js", "AWS", "TypeScript"]
  },
  {
    year: 2021,
    title: "Full Stack Developer",
    description: "Building scalable web applications",
    technologies: ["React", "GraphQL", "MongoDB", "Docker"]
  },
  {
    year: 2019,
    title: "Frontend Developer",
    description: "Creating responsive user interfaces",
    technologies: ["JavaScript", "CSS", "HTML", "React"]
  },
  {
    year: 2017,
    title: "Web Developer Intern",
    description: "Learning web development fundamentals",
    technologies: ["HTML", "CSS", "JavaScript", "PHP"]
  }
];

const ScrollablePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    home: false,
    about: false,
    skills: false,
    projects: false,
    experience: false,
    contact: false
  });

  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null)
  };

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs[sectionId as keyof typeof sectionRefs].current;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // Check which section is currently in view
      Object.entries(sectionRefs).forEach(([sectionId, ref]) => {
        if (!ref.current) return;

        const offsetTop = ref.current.offsetTop;
        const height = ref.current.offsetHeight;

        // Check if section is in viewport
        const isVisible =
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + height;

        setVisibleSections(prev => ({
          ...prev,
          [sectionId]: isVisible
        }));

        if (isVisible) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="scrollable-portfolio">
      {/* Navigation Indicators */}
      <nav className="section-indicators">
        <ul>
          {Object.keys(sectionRefs).map((section) => (
            <li key={section}>
              <button
                className={activeSection === section ? 'active' : ''}
                onClick={() => scrollToSection(section)}
                aria-label={`Scroll to ${section} section`}
              >
                <span className="indicator-label">{section}</span>
                <span className="indicator-dot"></span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <section
        ref={sectionRefs.home}
        className={`portfolio-section hero-section ${visibleSections.home ? 'visible' : ''}`}
        id="home"
      >
        <div className="section-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: visibleSections.home ? 1 : 0, y: visibleSections.home ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            {...{ className: "hero-content" }}
          >
            <h1>Ardian Idrizi</h1>
            <h2>Full Stack Developer</h2>
            <p className="hero-tagline">Building beautiful & functional web experiences</p>
            <div className="hero-cta">
              <button
                className="primary-button"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </button>
              <button
                className="secondary-button"
                onClick={() => scrollToSection('projects')}
              >
                View My Work
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={sectionRefs.about}
        className={`portfolio-section about-section ${visibleSections.about ? 'visible' : ''}`}
        id="about"
      >
        <div className="section-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: visibleSections.about ? 1 : 0, y: visibleSections.about ? 0 : 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">About Me</h2>
            <div className="about-grid">
              <div className="about-text">
                <p>
                  I'm a passionate full stack developer with expertise in modern web technologies.
                  My journey in software development started over 6 years ago, and I've been
                  building impactful digital solutions ever since.
                </p>
                <p>
                  My approach combines technical excellence with creative problem-solving.
                  I specialize in building responsive, accessible, and performant web applications
                  that deliver exceptional user experiences.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to
                  open source, or enjoying outdoor activities to recharge my creative batteries.
                </p>
              </div>
              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-number">6+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Happy Clients</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        ref={sectionRefs.skills}
        className={`portfolio-section skills-section ${visibleSections.skills ? 'visible' : ''}`}
        id="skills"
      >
        <div className="section-content">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: visibleSections.skills ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Skills & Expertise</h2>
            <div className="skills-container" style={{ height: '70vh' }}>
              <SkillsGalaxy skills={skills} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={sectionRefs.projects}
        className={`portfolio-section projects-section ${visibleSections.projects ? 'visible' : ''}`}
        id="projects"
      >
        <div className="section-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: visibleSections.projects ? 1 : 0, y: visibleSections.projects ? 0 : 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">My Projects</h2>
            <GitHubProjects username="ardidrizi" limit={6} />
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        ref={sectionRefs.experience}
        className={`portfolio-section experience-section ${visibleSections.experience ? 'visible' : ''}`}
        id="experience"
      >
        <div className="section-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: visibleSections.experience ? 1 : 0, y: visibleSections.experience ? 0 : 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">My Journey</h2>
            <JourneyTimeline milestones={milestones} />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={sectionRefs.contact}
        className={`portfolio-section contact-section ${visibleSections.contact ? 'visible' : ''}`}
        id="contact"
      >
        <div className="section-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: visibleSections.contact ? 1 : 0, y: visibleSections.contact ? 0 : 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Get In Touch</h2>
            <div className="contact-container">
              <div className="contact-info">
                <h3>Let's Connect</h3>
                <p>I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.</p>
                <div className="contact-methods">
                  <div className="contact-method">
                    <span className="contact-icon">📧</span>
                    <span className="contact-detail">email@example.com</span>
                  </div>
                  <div className="contact-method">
                    <span className="contact-icon">📱</span>
                    <span className="contact-detail">+123 456 7890</span>
                  </div>
                  <div className="contact-method">
                    <span className="contact-icon">📍</span>
                    <span className="contact-detail">City, Country</span>
                  </div>
                </div>
                <div className="social-links">
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
              </div>
              <div className="contact-form">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows={5} required></textarea>
                  </div>
                  <button type="submit" className="submit-button">Send Message</button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ScrollablePage;
