import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="branding">
        <img src="src/assets/Logo.png" alt="Logo" className="logo" />
        <h1 className="brand-text">TRACKLY Spending Tracker</h1>
    </div>
      <ul className="nav-links">
        <li>
          <Link className={location.pathname === '/' ? 'active' : ''} to="/"><i className="fa-solid fa-chart-line"></i> Dashboard</Link>
        </li>
        <li>
          <Link className={location.pathname === '/journal' ? 'active' : ''} to="/journal"><i className="fa-solid fa-plus"></i> Journal</Link>
        </li>
      </ul>
    </nav>
  );
}
