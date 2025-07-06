const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// ✅ GET: Tüm kategorileri getir
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error('Kategori verisi alınamadı:', err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

// ✅ POST: Yeni kategori ekle
router.post('/', async (req, res) => {
  const { name, slug } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING *',
      [name, slug]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Kategori ekleme hatası:', err);
    res.status(500).json({ error: 'Veritabanı hatası' });
  }
});

module.exports = router;
