const Category = require('../category')
const expenseCategory = require('./category.json')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/expense_tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  const promises = []

  expenseCategory.forEach(item => {
    promises.push(
      Category.create(item)
    )
  })
  Promise.all(promises).then(() => db.close())
})