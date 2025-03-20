import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ThemeController from './ThemeController';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeController />
      </div>
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
