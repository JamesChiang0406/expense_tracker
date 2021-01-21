const Record = require('../Record')
const expenseList = require('./expenseList.json')
const db = require('../../config/mongoose')
const User = require('../User')
const bcrypt = require('bcryptjs')

const test1 = {
  name: 'user1',
  email: 'test@example.com',
  password: '12345678'
}

db.once('open', () => {

  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(test1.password, salt))
    .then(hash => User.create({
      name: test1.name,
      email: test1.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      expenseList.forEach(item => {
        Record.create({
          name: item.name,
          date: item.date,
          amount: item.amount,
          icon: item.icon,
          merchant: item.merchant,
          userId
        })
      })
    })
  console.log('done!')
})