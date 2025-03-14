import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface NavLinkItem {
  title: string;
  path: string;
}

const navLinks: NavLinkItem[] = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Projects", path: "/projects" },
  { title: "Contact", path: "/contact" },
  { title: "Blog", path: "/blog" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-teal-800 p-4 text-white">
      <div className="flex justify-between items-center">
        {/* ...existing logo or brand... */}
        <button className="md:hidden focus:outline-none" onClick={toggleMenu} aria-label="Toggle navigation">
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
              className={({ isActive }) =>
                isActive
                  ? 'bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 text-white px-3 py-1 rounded'
                  : 'text-white hover:bg-teal-700 text-white px-3 py-1 rounded'
              }
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
