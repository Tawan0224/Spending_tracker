import { Link, useLocation } from 'react-router-dom';
import logo  from '../assets/Logo.png';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="branding">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="brand-text">TRACKLY Spending Tracker</h1>
      </div>
      <ul className="nav-links">
        <li>
          <Link className={location.pathname === '/' ? 'active' : ''} to="/">Dashboard</Link>
        </li>
        <li>
          <Link className={location.pathname === '/journal' ? 'active' : ''} to="/journal">Journal</Link>
        </li>
      </ul>
    </nav>
  );
}
