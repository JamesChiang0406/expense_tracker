const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

router.get('/', (req, res) => {
  let totalAmount = 0
  const userId = req.user._id

  Record.find({ userId })
    .lean()
    .then(items => {
      items.forEach(spend => totalAmount += spend.amount)
      res.render('index', { items, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router