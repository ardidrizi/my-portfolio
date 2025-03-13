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
    <nav className="bg-gray-800 p-4 text-white">
      <div className="flex justify-between items-center">
        {/* ...existing logo or brand... */}
        <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
          <span className="block h-1 w-6 bg-white mb-1"></span>
          <span className="block h-1 w-6 bg-white mb-1"></span>
          <span className="block h-1 w-6 bg-white"></span>
        </button>
      </div>
      <ul className={`mt-4 ${isOpen ? "block" : "hidden"} md:flex space-x-4`}>
        {navLinks.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.path}
              className={({ isActive }) => isActive ? 'underline text-gray-300' : 'hover:underline'}
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
