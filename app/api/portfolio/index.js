const { Router } = require('express')

const ProfileRouter = require('./profile')
const ProjectRouter = require('./project')
const FormationRouter = require('./formation')
const SkillRouter = require('./skill')


const router = new Router()
router.use('/profile', ProfileRouter)
router.use('/project', ProjectRouter)
router.use('/formation', FormationRouter)
router.use('/skill', SkillRouter)

module.exports = router
