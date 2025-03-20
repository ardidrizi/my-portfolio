import React from 'react';
import GitHubProjects from '../components/GitHubProjects';
import { motion } from 'framer-motion';

function Projects() {
  // Replace 'arddbre1' with your actual GitHub username
  const gitHubUsername = 'ardidrizi';

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-4xl font-bold mb-8 text-center">My Projects</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <GitHubProjects username={gitHubUsername} limit={9} />
      </motion.div>
    </div>
  );
}

export default Projects;
