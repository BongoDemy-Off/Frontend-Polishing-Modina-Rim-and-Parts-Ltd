import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import BackToTop from '../components/BackToTop';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-modina-bg text-modina-text selection:bg-modina-red/20 selection:text-modina-heading">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
      <BackToTop />
    </div>
  );
}
