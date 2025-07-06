const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// ✅ Makale Ekle (Sadece Admin)
router.post('/', async (req, res) => {
  const { title, content, category_id, author_id } = req.body;

  if (!title || !content || !category_id || !author_id) {
    return res.status(400).json({ message: 'Tüm alanlar zorunludur' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO articles (title, content, category_id, author_id)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, content, category_id, author_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Makale ekleme hatası:', err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// ✅ Tüm Makaleleri Listele (Kullanıcılar için)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.id, a.title, a.content, a.created_at,
              c.name AS category_name, u.name AS author_name
       FROM articles a
       LEFT JOIN categories c ON a.category_id = c.id
       LEFT JOIN users u ON a.author_id = u.id
       ORDER BY a.created_at DESC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Makale listeleme hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});


router.put('/:id', async (req, res) => {
  const { title, content, category_id, author_id } = req.body;
  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE articles
       SET title = $1, content = $2, category_id = $3, author_id = $4
       WHERE id = $5
       RETURNING *`,
      [title, content, category_id, author_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Makale bulunamadı' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Makale güncelleme hatası:', err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM articles WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Makale bulunamadı' });
    }

    res.json({ message: 'Makale silindi', deleted: result.rows[0] });
  } catch (err) {
    console.error('Makale silme hatası:', err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
