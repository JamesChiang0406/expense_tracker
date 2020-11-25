const Category = require('../category')
const expenseCategory = require('./category.json')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/expense_category', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  for (let i = 0; i < expenseCategory.length; i++) {
    Category.create({
      name: expenseCategory[i].name,
      icon: expenseCategory[i].icon
    })
  }
}
)