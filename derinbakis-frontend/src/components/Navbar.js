// src/components/Navbar.js
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
    document.body.className = saved + '-mode';
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.body.className = next + '-mode';
    localStorage.setItem('theme', next);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'bg-dark text-white' : 'bg-white'} shadow-sm px-4`}>
      <div className="container-fluid">
        <Link className={`navbar-brand fw-bold ${theme === 'dark' ? 'text-light' : 'text-primary'}`} to="/">
          🌐 DERİNBAKIŞ
        </Link>
        <div className="d-flex align-items-center gap-2">
          <button onClick={toggleTheme} className="btn btn-sm btn-outline-secondary">
            {theme === 'dark' ? '☀️ Açık' : '🌙 Karanlık'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
