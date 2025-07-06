// src/pages/AdminDashboard.js
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';

function AdminDashboard() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/login');
    } else {
      fetchArticles();
    }
  }, [navigate]);

  const fetchArticles = () => {
    API.get('/articles')
      .then(res => setArticles(res.data))
      .catch(err => console.error('Makale listesi alınamadı:', err));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu makaleyi silmek istediğinize emin misiniz?')) {
      try {
        await API.delete(`/articles/${id}`);
        fetchArticles(); // silince listeyi güncelle
      } catch (err) {
        alert('Silme işlemi başarısız!');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>👩‍💻 Admin Panel</h2>
        <Link to="/admin/add" className="btn btn-success">➕ Yeni Makale</Link>
      </div>

      {articles.length === 0 ? (
        <div className="alert alert-info">Henüz hiç makale yok.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle shadow-sm">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Başlık</th>
                <th>Kategori</th>
                <th>Yazar</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a, i) => (
                <tr key={a.id}>
                  <td>{i + 1}</td>
                  <td>{a.title}</td>
                  <td>{a.category_name}</td>
                  <td>{a.author_name}</td>
                  <td>
                    <Link to={`/admin/edit/${a.id}`} className="btn btn-primary btn-sm me-2">
                      Düzenle
                    </Link>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(a.id)}>
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
