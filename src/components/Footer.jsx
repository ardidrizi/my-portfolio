import React from 'react';

function Footer() {
  return (
    <footer>
      <p>© {new Date().getFullYear()} My Portfolio.</p>
      <ul className="social-links">
        <li>
          <a href="https://github.com/username" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
