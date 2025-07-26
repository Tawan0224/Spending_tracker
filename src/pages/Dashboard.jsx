import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <Hero 
        title="Dashboard Overview" 
        subtitle="View your spending summary and charts"
      />

      {/* Page-specific content goes here */}
    </>
  );
}
