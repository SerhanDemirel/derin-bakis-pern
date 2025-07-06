// src/App.js
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AddArticle from './pages/AddArticle';
import EditArticle from './pages/EditArticle';

function App() {
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
    <Router>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home theme={theme} />} />
        <Route path="/articles/:id" element={<ArticleDetail theme={theme} />} />
        <Route path="/login" element={<Login theme={theme} />} />
        <Route path="/admin" element={<AdminDashboard theme={theme} />} />
        <Route path="/admin/add" element={<AddArticle theme={theme} />} />
        <Route path="/admin/edit/:id" element={<EditArticle theme={theme} />} />
      </Routes>
    </Router>
  );
}

export default App;
