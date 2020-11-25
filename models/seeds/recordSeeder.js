const Expense = require('../expense')
const expenseList = require('./expenseList.json')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense_item', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  for (let i = 0; i < expenseList.length; i++) {
    Expense.create({
      name: expenseList[i].name,
      date: expenseList[i].date,
      amount: expenseList[i].amount
    })
  }
})