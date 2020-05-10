const { Router } = require('express')

const { Project } = require('../../../models')
const {addPathImage } = require('../../manage')

const router = new Router()

router.get('/', (req, res) => {
  try {
    const projects = Project.get()
    let projectsToSend = []
    projects.forEach(element => {
      let project = {...element}
      project.image = addPathImage(project.image,"project")
      projectsToSend.push(project)
    });
    res.status(200).json(projectsToSend)
  } catch (err) {
    res.status(500).json(err)
  }
})


router.get('/:projectId', (req, res) => {
  try {
    res.status(200).json(Project.getById(req.params.projectId))
  } catch (err) {
    res.status(404).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const project = Project.create({ ...req.body })
    res.status(201).json(project)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:projectId', (req, res) => {
  try {
    res.status(200).json(Project.delete(req.params.projectId))
  } catch (err) {
    res.status(404).json(err)
  }
})

router.put('/:projectId', (req, res) => {
  try {
    res.status(200).json(Project.update(req.params.projectId,req.body))
  } catch (err) {
    res.status(404).json(err)
  }
})

module.exports = router