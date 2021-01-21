const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

router.get('/:month', (req, res) => {
  const month = req.params.month
  const userId = req.user._id

  Record.find({ userId })
    .lean()
    .then(spends => {
      if (month === 'all') {
        return spends
      }

      let items = []
      spends.forEach(spend => {
        const spendMonth = spend.date[5] + spend.date[6]
        if (spendMonth === month) items.push(spend)
      })
      return items
    })
    .then(items => {
      let totalAmount = 0
      items.forEach(spend => totalAmount += spend.amount)
      res.render('index', { items, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router