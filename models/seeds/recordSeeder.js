const Expense = require('../expense')
const expenseList = require('./expenseList.json')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense_tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  expenseList.forEach(item => {
    Expense.create(item)
  })
  console.log('done!')
})