const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Expense = require('./models/expense')
const Category = require('./models/category')
const mongoose = require('mongoose')
const category = require('./models/category')
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
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Expense.find()
    .lean()
    .then(items => {
      let totalAmount = 0
      items.forEach(spend => totalAmount += spend.amount)
      res.render('index', { items, totalAmount })
    })
    .catch(error => console.log(error))
})

app.get('/new', (req, res) => {
  res.render('new')
})

app.post('/new', (req, res) => {
  let data = req.body

  Category.find()
    .lean()
    .then(type => {
      return type.find(item => item.name === data.category).icon
    })
    .then(type => {
      data.icon = type
      return Expense.create(data)
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/:id/edit', (req, res) => {
  const id = req.params.id
  res.render('edit', { id })
})

app.post('/:id/edit', (req, res) => {
  const id = req.params.id
  const data = Object.assign(req.body)

  Category.find()
    .then(type => {
      return type.find(item => item.name === data.category).icon
    })
    .then(type => {
      data.icon = type
      return Expense.findById(id)
        .then(spend => {
          spend.name = data.name
          spend.category = data.category
          spend.date = data.date
          spend.category = data.category
          spend.amount = data.amount
          spend.icon = data.icon
          return spend.save()
        })
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

app.listen(port, () => {
  console.log(`Express is listening on https://localhost:${port}`)
})