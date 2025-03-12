import React from 'react';
import Header from '../components/Header';

function Home() {
  return (
    <main>
      <Header />
      <section className="hero">
        <div className="hero-content">
          <h2>Welcome to My Portfolio!</h2>
          <p>Discover my projects, skills, and experiences.</p>
          {/* ...additional hero elements... */}
        </div>
      </section>
      {/* ...additional page content... */}
    </main>
  );
}

export default Home;
