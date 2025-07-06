// src/pages/AddArticle.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

function AddArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Admin değilse yönlendir
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/login');
    }

    // Kategori listesini al
    API.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Kategoriler alınamadı:', err));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post('/articles', {
        title,
        content,
        category_id: categoryId,
        author_id: 1 // şimdilik sabit
      });

      navigate('/admin'); // başarılıysa admin paneline dön
    } catch (err) {
      alert('Makale eklenemedi!');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <h3 className="mb-4">➕ Yeni Makale Ekle</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Başlık</label>
          <input type="text" className="form-control" required
            value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Kategori</label>
          <select className="form-select" required
            value={categoryId} onChange={e => setCategoryId(e.target.value)}>
            <option value="">Kategori Seçin</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">İçerik</label>
          <textarea className="form-control" rows="6" required
            value={content} onChange={e => setContent(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-success w-100">Makale Ekle</button>
      </form>
    </div>
  );
}

export default AddArticle;
