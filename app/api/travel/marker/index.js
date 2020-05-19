const { Router } = require('express')

const { Marker} = require('../../../models')
const {addPathImage } = require('../../manage')

const router = new Router()

router.get('/', (req, res) => {
  try {
    const markers = Marker.get()
    let markersToSend = []
    markers.forEach(element => {
      let marker = {...element}
      let properties = marker.properties
      marker.properties = {...properties}
      if(element.properties.image){
        marker.properties.image = addPathImage(marker.properties.image,"markers")
      }
      markersToSend.push(marker)

    });
    res.status(200).json(markersToSend)
  } catch (err) {
    res.status(500).json(err)
  }
})


router.get('/:markerId', (req, res) => {
  try {
    res.status(200).json(Marker.getById(req.params.markerId))
  } catch (err) {
    res.status(404).json(err)
  }
})

/*
router.post('/', (req, res) => {
  try {
    const marker = Marker.create({ ...req.body })
    res.status(201).json(marker)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:markerId', (req, res) => {
  try {
    res.status(200).json(Project.delete(req.params.markerId))
  } catch (err) {
    res.status(404).json(err)
  }
})

router.put('/:markerId', (req, res) => {
  try {
    res.status(200).json(Project.update(req.params.markerId,req.body))
  } catch (err) {
    res.status(404).json(err)
  }
})
*/
module.exports = router