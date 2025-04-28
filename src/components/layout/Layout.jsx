import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  return (
    <motion.div 
      className="min-h-screen py-lg px-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container">
        <Navbar />
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </div>
    </motion.div>
  );
};

export default Layout; 