import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

export default function Journal() {
  return (
    <>
      <Navbar />
      <Hero 
        title="Spending Journal" 
        subtitle="Record your daily expenses here"
      />

      {/* Form and journal table here */}
    </>
  );
}
