import React from 'react';
import { Link } from 'react-router-dom';
import { motion, MotionProps } from 'framer-motion';
import Header from '../components/Header'; // Adjust the path as needed

const MotionSection = motion.section as React.FC<React.HTMLAttributes<HTMLElement> & MotionProps>;

function Home() {
  return (
    <main>
      <Header />
      <MotionSection
        className="hero-section p-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content flex flex-col items-center justify-center h-screen">
          <h2 className="text-5xl font-bold">Welcome to My Portfolio!</h2>
          <p className="mt-4 text-xl">I'm Ardian Idrizi, a Fullstack Developer</p>
          <div className="mt-8">
            <Link to="/projects" className="primary-button px-6 py-3 rounded-lg font-semibold transition-colors">
              Explore Projects
            </Link>
          </div>
        </div>
      </MotionSection>
      <MotionSection
        className="py-12 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-3xl font-bold mb-6">Featured Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        </div>
      </MotionSection>
    </main>
  );
}

export default Home;
