import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Projects", path: "/projects" },
  { title: "Contact", path: "/contact" },
  { title: "Blog", path: "/blog" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav >
      <div >
        {/* ...existing logo or brand... */}
        <button  onClick={toggleMenu}>
          <span ></span>
          <span ></span>
          <span ></span>
        </button>
      </div>
      <ul >
        {navLinks.map((link, index) => (
          <li key={index} >
            <NavLink
              to={link.path}
              className={({ isActive }) => isActive ? 'active-link' : ''}
            >
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
