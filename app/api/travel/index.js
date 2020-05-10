const { Router } = require('express')

const MarkerRouter = require('./marker')



const router = new Router()
router.use('/marker', MarkerRouter)


module.exports = router
