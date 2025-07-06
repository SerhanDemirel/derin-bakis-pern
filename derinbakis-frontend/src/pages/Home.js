// src/pages/Home.js
import { useEffect, useState } from 'react';
import API from '../api/api';

function Home() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);

  useEffect(() => {
    API.get('/articles').then(res => setArticles(res.data));
    API.get('/categories').then(res => setCategories(res.data));
  }, []);

  const filtered = selectedCat
    ? articles.filter(a => a.category_name === selectedCat)
    : articles;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold text-center">🧭 DERİNBAKIŞ Makaleleri</h2>

      {/* Kategori Butonları */}
      <div className="d-flex flex-wrap justify-content-center mb-4 gap-2">
        <button className={`btn btn-sm ${!selectedCat ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setSelectedCat(null)}>
          Tümü
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`btn btn-sm ${selectedCat === cat.name ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSelectedCat(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Makaleler */}
      <div className="row">
        {filtered.map(article => (
          <div className="col-md-4 mb-4" key={article.id}>
            <div className="card shadow-sm h-100 border-0 rounded-4">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{article.title}</h5>
                <p className="text-muted small mb-2">Kategori: {article.category_name}</p>
                <p className="card-text flex-grow-1">{article.content.substring(0, 100)}...</p>
                <a href={`/articles/${article.id}`} className="btn btn-outline-primary btn-sm mt-auto">Devamını Oku</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
