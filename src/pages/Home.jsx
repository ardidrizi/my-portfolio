import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Home() {
  return (
    <main>
      <Header />
      <section className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white p-8">
        <div className="hero-content flex flex-col items-center justify-center h-screen">
          <h2 className="text-5xl font-bold">Welcome to My Portfolio!</h2>
          <p className="mt-4 text-xl">I`am Ardian Idrizi a Fullstack Developer</p>
          <div className="mt-8">
            <Link to="/projects" className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
              Explore Projects
            </Link>
          </div>
        </div>
      </section>
      <section className="py-12 px-4">
        <h3 className="text-3xl font-bold mb-6">Featured Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        </div>
      </section>
    </main>
  );
}

export default Home;
