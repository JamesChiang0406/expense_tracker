const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  let data = req.body
  const int_reg = /^[0-9]*[1-9][0-9]*$/

  if (int_reg.test(data.amount)) {
    return Record.create(data)
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  }
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(spend => res.render('edit', { id, spend }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const data = req.body
  const int_reg = /^[0-9]*[1-9][0-9]*$/

  if (int_reg.test(data.amount) && data.answer === 'edit') {
    Record.findById(id)
      .then(spend => {
        if (data.answer === 'edit') {
          spend.name = data.name
          spend.date = data.date
          spend.amount = data.amount
          spend.icon = data.icon
          return spend.save()
        }
      })
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  } else if (data.answer === '/') {
    res.redirect('/')
  } else {
    res.render('edit', { id })
  }
})

router.get('/:id/delete', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(spend => res.render('delete', { id, spend }))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const option = req.body.answer
  const id = req.params.id
  Record.findById(id)
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

  Record.find()
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