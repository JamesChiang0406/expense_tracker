const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  let { name, date, icon, merchant, amount } = req.body
  const int_reg = /^[0-9]*[1-9][0-9]*$/
  const userId = req.user._id

  if (int_reg.test(amount)) {
    return Record.create({ name, date, icon, amount, merchant, userId })
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  }
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id: id, userId })
    .lean()
    .then(spend => res.render('edit', { id, spend }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, date, icon, merchant, amount, answer } = req.body
  const userId = req.user._id
  const int_reg = /^[0-9]*[1-9][0-9]*$/

  if (int_reg.test(amount) && answer === 'edit') {
    Record.findOne({ _id: id, userId })
      .then(spend => {
        if (answer === 'edit') {
          spend.name = name
          spend.date = date
          spend.amount = amount
          spend.icon = icon
          spend.merchant = merchant
          return spend.save()
        }
      })
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  } else if (answer === '/') {
    res.redirect('/')
  } else {
    res.render('edit', { id })
  }
})

router.get('/:id/delete', (req, res) => {
  const id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id: id, userId })
    .lean()
    .then(spend => res.render('delete', { id, spend }))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const option = req.body.answer
  const id = req.params.id
  const userId = req.user._id

  Record.findOne({ _id: id, userId })
    .then(item => {
      if (option === "delete") {
        return item.remove()
      }
    })
    .then(() => { res.redirect('/') })
    .catch(error => console.log(error))
})

router.get('/:icon', (req, res) => {
  const icon = req.params.icon
  const userId = req.user._id

  Record.find({ userId })
    .lean()
    .then(spends => {
      if (icon === 'all') {
        return spends
      }
      return spends.filter(spend => spend.icon === icon)
    })
    .then(items => {
      let totalAmount = 0
      items.forEach(spend => totalAmount += spend.amount)
      res.render('index', { items, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router