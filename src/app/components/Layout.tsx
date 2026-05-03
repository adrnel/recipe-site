import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(212,237,218,0.9),_transparent_32%),linear-gradient(180deg,_#fffdf8_0%,_#fffaf2_50%,_#f8f5ef_100%)] text-stone-950">
    <Header />
    <div className="relative z-10">{children}</div>
    <Footer />
  </div>
);

export default Layout;
