const Record = require('../Record')
const expenseList = require('./expenseList.json')
const db = require('../../config/mongoose')

db.once('open', () => {

  expenseList.forEach(item => {
    Record.create(item)
  })
  console.log('done!')
})