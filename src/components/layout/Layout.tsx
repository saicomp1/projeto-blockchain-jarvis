import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

/**
 * Layout - Main layout wrapper
 * Structure: Header + Content + Footer
 */

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Header />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
