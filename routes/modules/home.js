const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

router.get('/', (req, res) => {
  const categories = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']

  Record.find()
    .lean()
    .then(items => {
      let totalAmount = 0
      items.forEach(spend => totalAmount += spend.amount)
      res.render('index', { items, totalAmount, categories })
    })
    .catch(error => console.log(error))
})

module.exports = router