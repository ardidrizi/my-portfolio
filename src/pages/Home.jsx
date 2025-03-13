import React from 'react';
import Header from '../components/Header';

function Home() {
  return (
    <main>
      <Header />
      <section className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-8">
        <div className="hero-content flex flex-col items-center justify-center h-screen">
          <h2 className="text-5xl font-bold">Welcome to My Portfolio!</h2>
          <p className="mt-4 text-xl">Discover my projects, skills, and experiences.</p>
          {/* ...additional hero elements... */}
        </div>
      </section>
      {/* ...additional page content... */}
    </main>
  );
}

export default Home;
