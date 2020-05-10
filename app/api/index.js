const { Router } = require('express')
const PortoflioRouter = require('./portfolio')
const TravelRouter = require('./travel')



const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/resume', PortoflioRouter)
router.use('/travel', TravelRouter)

module.exports = router
