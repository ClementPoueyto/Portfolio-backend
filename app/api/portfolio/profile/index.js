const { Router } = require('express')
const manageAllErrors = require('../../../utils/routes/error-management')
const { Profile } = require('../../../models')
const {addPathImage } = require('../../manage')

const router = new Router()

router.get('/', (req, res) => {
    try {
    let profile = {...Profile.get()}
    profile.image = addPathImage(profile.image,"profile")
      res.status(200).json(profile)
    } catch (err) {
      res.status(500).json(err)
    }
  })



router.post('/', (req, res) => {
  try {
    const profile = Profile.create({ ...req.body })
    res.status(201).json(profile)
  } catch (err) {
   manageAllErrors(err)
  }
})

router.delete('/', (req, res) => {
  try {
    res.status(200).json(Profile.delete(req.params))
  } catch (err) {
    res.status(404).json(err)
  }
})

router.put('/', (req, res) => {
  try {
    res.status(200).json(Profile.update(req.params,req.body))
  } catch (err) {
    res.status(404).json(err)
  }
})

module.exports = router