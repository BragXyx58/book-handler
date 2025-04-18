const express = require('express')
const Book = require('../models/Book')
const router = express.Router()

router.post('/', async (req, res) => {
  const { title, author, available } = req.body
  if (!title || !author) {
    return res.status(400).json({ error: 'title и author обязательны' })
  }
  try {
    const book = await Book.create({ title, author, available })
    res.status(201).json(book)
  } catch {
    res.status(500).json({ error: 'Ошибка при создании книги' })
  }
})

router.get('/', async (req, res) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch {
    res.status(500).json({ error: 'Ошибка при получении списка книг' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) return res.status(404).json({ error: 'Книга не найдена' })
    res.json(book)
  } catch {
    res.status(400).json({ error: 'Некорректный ID' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!book) return res.status(404).json({ error: 'Книга не найдена' })
    res.json(book)
  } catch {
    res.status(400).json({ error: 'Ошибка при обновлении книги' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)
    if (!book) return res.status(404).json({ error: 'Книга не найдена' })
    res.status(204).end()
  } catch {
    res.status(400).json({ error: 'Некорректный ID' })
  }
})

module.exports = router