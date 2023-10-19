import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">AHAsolar Technologies Ltd.</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/registration" className="nav-link">Registration</Link>
            </li>
            <li className="nav-item">
              <Link to="/datasheet" className="nav-link">Data Sheet</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
