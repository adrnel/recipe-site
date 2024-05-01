import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <Header />
      {children}
    <Footer />
  </div>
);

export default Layout;
