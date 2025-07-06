// src/pages/ArticleDetail.js
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/api';

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    API.get(`/articles`)
      .then(res => {
        const found = res.data.find(a => a.id.toString() === id);
        setArticle(found);
      })
      .catch(err => console.error('Makale alınamadı:', err));
  }, [id]);

  if (!article) return <div className="container mt-5">Yükleniyor...</div>;

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-outline-secondary mb-4">← Geri Dön</Link>
      <div className="card shadow-sm p-4 rounded-4">
        <h1 className="fw-bold">{article.title}</h1>
        <p className="text-muted">Kategori: {article.category_name} | Yazar: {article.author_name}</p>
        <hr />
        <div className="fs-5 lh-lg">{article.content}</div>
      </div>
    </div>
  );
}

export default ArticleDetail;
