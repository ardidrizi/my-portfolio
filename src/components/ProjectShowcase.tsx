import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string | number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  category: string;
  technologies: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
}

interface ProjectShowcaseProps {
  projects: Project[];
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const showcaseRef = useRef<HTMLDivElement>(null);

  // Get unique categories from projects
  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];

  // Filter projects based on selected category
  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  // Handle project selection
  const handleProjectClick = (project: Project) => {
    setActiveProject(activeProject?.id === project.id ? null : project);
  };

  // Project card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    }),
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } }
  };

  // Detail view animation variants
  const detailVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="project-showcase" ref={showcaseRef}>
      <div className="filter-controls">
        {categories.map(category => (
          <button
            key={category}
            className={filter === category ? 'active' : ''}
            onClick={() => setFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        <AnimatePresence>
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              className={`project-card ${activeProject?.id === project.id ? 'active' : ''}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layoutId={`project-${project.id}`}
              onClick={() => handleProjectClick(project)}
            >
              <div className="project-image">
                <img src={project.thumbnail} alt={project.title} />
                <div className="project-overlay">
                  <h3>{project.title}</h3>
                  <p>{project.shortDescription}</p>
                </div>
              </div>

              <AnimatePresence>
                {activeProject?.id === project.id && (
                  <motion.div
                    className="project-details"
                    variants={detailVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="tech-stack">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-badge">{tech}</span>
                      ))}
                    </div>

                    <p className="project-description">{project.fullDescription}</p>

                    <div className="project-links">
                      {project.liveDemoUrl && (
                        <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          GitHub Repo
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectShowcase;
