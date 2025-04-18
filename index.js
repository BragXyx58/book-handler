const express = require('express')
const mongoose = require('mongoose')
const bookRoutes = require('./routes/books')

const app = express()
app.use(express.json())

mongoose.connect('mongodb+srv://admin:admin@bd1.wxwphls.mongodb.net/?retryWrites=true&w=majority&appName=bd1')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err))

app.use('/books', bookRoutes)

app.listen(3000, () => console.log('Server running on port 3000'))
