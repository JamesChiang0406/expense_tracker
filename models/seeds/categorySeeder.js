const Category = require('../category')
const expenseCategory = require('./category.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  const promises = []

  expenseCategory.forEach(item => {
    promises.push(
      Category.create(item)
    )
  })
  Promise.all(promises).then(() => db.close())
  console.log('done!')
})