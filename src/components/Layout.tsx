import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ThemeController from './ThemeController';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isScrollablePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-4 right-4 z-10">
        <ThemeController />
      </div>
      {/* {!isScrollablePage && <Header />} */}
      <main className="flex-grow">
        {children}
      </main>
      {!isScrollablePage && <Footer />}
    </div>
  );
};

export default Layout;
