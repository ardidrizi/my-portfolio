import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Blog() {
  return (
    <main>
      <Header />
      <section>
        <h2>Blog</h2>
        {/* ...blog posts content... */}
      </section>
      <Footer />
    </main>
  );
}

export default Blog;
