import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './NotFound.css';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="error-icon">
            <i className="fa-solid fa-exclamation-triangle"></i>
          </div>
          
          <h1 className="error-code">404</h1>
          <h2 className="error-title">Page Not Found</h2>
          <p className="error-description">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          
          <div className="error-actions">
            <Link to="/" className="btn-primary">
              <i className="fa-solid fa-home"></i>
              Go to Dashboard
            </Link>
            <Link to="/journal" className="btn-secondary">
              <i className="fa-solid fa-plus"></i>
              Add Expense
            </Link>
          </div>
        
        </div>
        

      </div>
    </>
  );
}