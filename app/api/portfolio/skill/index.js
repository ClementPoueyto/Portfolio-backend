const { Router } = require('express')
const {addPathImage } = require('../../manage')

const { Skill } = require('../../../models')

const router = new Router()

router.get('/', (req, res) => {
    try {
      const skills = Skill.get()
      let skillsToSend = []
      skills.forEach(element => {
        let skill = {...element}
        skill.image = addPathImage(skill.image,"skill")
        skillsToSend.push(skill)
      });
      res.status(200).json(skillsToSend)
    } catch (err) {
      res.status(500).json(err)
    }
  })

router.get('/:skillId', (req, res) => {
  try {
    res.status(200).json(Skill.getById(req.params.skillId))
  } catch (err) {
    res.status(404).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const skill = Skill.create({ ...req.body })
    res.status(201).json(skill)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:skillId', (req, res) => {
  try {
    res.status(200).json(Skill.delete(req.params.skillId))
  } catch (err) {
    res.status(404).json(err)
  }
})

router.put('/:skillId', (req, res) => {
  try {
    res.status(200).json(Skill.update(req.params.skillId,req.body))
  } catch (err) {
    res.status(404).json(err)
  }
})

module.exports = router