const Category = require('../category')
const expenseCategory = require('./category.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  expenseCategory.forEach(item => {
    Category.create(item)
  })
  console.log('done!')
})