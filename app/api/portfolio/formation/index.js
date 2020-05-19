const { Router } = require('express')
const {addPathImage } = require('../../manage')

const { Formation } = require('../../../models')

const router = new Router()

router.get('/', (req, res) => {
  try {
    const formations = Formation.get()
    let formationsToSend = []
    formations.forEach(element => {
      let formation = {...element}
      formation.image = addPathImage(formation.image,"formation")
      formationsToSend.push(formation)
    });
    res.status(200).json(formationsToSend)
  } catch (err) {
    res.status(500).json(err)
  }
})


router.get('/:formationId', (req, res) => {
  try {
    res.status(200).json(Formation.getById(req.params.formationId))
  } catch (err) {
    res.status(404).json(err)
  }
})

/*
router.post('/', (req, res) => {
  try {
    const formation = Formation.create({ ...req.body })
    res.status(201).json(formation)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:formationId', (req, res) => {
  try {
    res.status(200).json(Formation.delete(req.params.formationId))
  } catch (err) {
    res.status(404).json(err)
  }
})

router.put('/:formationId', (req, res) => {
  try {
    res.status(200).json(Formation.update(req.params.formationId,req.body))
  } catch (err) {
    res.status(404).json(err)
  }
})
*/

module.exports = router