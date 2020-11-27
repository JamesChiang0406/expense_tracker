const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/Record')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  let data = req.body

  Category.find()
    .lean()
    .then(type => {
      return type.find(item => item.name === data.category).icon
    })
    .then(type => {
      if (data.answer === 'add') {
        data.icon = type
        return Record.create(data)
      }
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

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
  const data = Object.assign(req.body)

  Category.find()
    .then(type => {
      return type.find(item => item.name === data.category).icon
    })
    .then(type => {
      if (data.answer === 'add') {
        data.icon = type
        return Record.findById(id)
          .then(spend => {
            spend.name = data.name
            spend.category = data.category
            spend.date = data.date
            spend.category = data.category
            spend.amount = data.amount
            spend.icon = data.icon
            return spend.save()
          })
      }
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
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

router.get('/:position', (req, res) => {
  const position = req.params.position
  Record.find()
    .lean()
    .then(spends => {
      return spends.filter(spend => spend.category === position)
    })
    .then(items => {
      let totalAmount = 0
      items.forEach(spend => totalAmount += spend.amount)
      const categories = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
      res.render('index', { items, totalAmount, categories })
    })
    .catch(error => console.log(error))
})

module.exports = router