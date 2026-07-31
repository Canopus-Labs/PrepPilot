import React from 'react';
import Navbar from './Navbar'; // Or however it is imported at the top

export default function MainLayout({ children }) {
  return (
    <>
      {/* 1. Add the Skip Link right here at the very top */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-blue-600 text-white px-4 py-2 rounded-md font-medium shadow-lg transition-all"
      >
        Skip to main content
      </a>

      {/* This renders your header section */}
      <Navbar />

      {/* 2. Locate the wrapper container that holds the page content (like a div or main tag) */}
      {/* Add id="main-content" and tabIndex={-1} to it */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
    </>
  );
}