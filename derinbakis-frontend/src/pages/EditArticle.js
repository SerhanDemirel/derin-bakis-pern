// src/pages/EditArticle.js
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/api';

function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/login');
    }

    // Kategorileri getir
    API.get('/categories').then(res => setCategories(res.data));

    // Düzenlenecek makaleyi getir
    API.get('/articles')
      .then(res => {
        const found = res.data.find(a => a.id.toString() === id);
        if (found) {
          setTitle(found.title);
          setContent(found.content);
          setCategoryId(found.category_id); // dikkat!
        } else {
          alert('Makale bulunamadı');
          navigate('/admin');
        }
      });
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/articles/${id}`, {
        title,
        content,
        category_id: categoryId,
        author_id: 1 // sabit admin ID
      });
      navigate('/admin');
    } catch (err) {
      alert('Güncelleme başarısız!');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <h3 className="mb-4">📝 Makaleyi Düzenle</h3>
      <form onSubmit={handleUpdate}>
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

        <button type="submit" className="btn btn-primary w-100">Güncelle</button>
      </form>
    </div>
  );
}

export default EditArticle;
