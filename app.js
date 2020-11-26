const express = require('express')
const exphbs = require('express-handlebars')
const Expense = require('./models/expense')
const Category = require('./models/category')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense_tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')
})

const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  Expense.find()
    .lean()
    .then(item => {
      Category.find()
        .lean()
        .then(type => {

        })
    })
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is listening on https://localhost:${port}`)
})