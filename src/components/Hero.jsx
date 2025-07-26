import React from 'react';

export default function Hero({ title, subtitle }) {
  return (
    <header className="hero">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}
