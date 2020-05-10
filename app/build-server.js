const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api')
const cool = require('cool-ascii-faces')


module.exports = (cb) => {
  const app = express()
  app.disable('x-powered-by')
  app.use(cors())
  app.use(bodyParser.json({limit:'50mb'}))
  app.use(morgan('[:date[iso]] :method :url :status :response-time ms - :res[content-length]'))
  app.use('/api', api)
  app.use('/uploads',express.static('uploads'))
  app.get('/cool', (req, res) => res.send(cool()))
  app.get('/times', (req, res) => res.send(showTimes()))
  

  app.use('*', (req, res) => res.status(404).end())
  const server = app.listen(process.env.PORT || 5000, () => cb && cb(server))
}

showTimes = () => {
  let result = ''
  const times = process.env.TIMES || 5
  for (i = 0; i < times; i++) {
    result += i + ' '
  }
  return result;
}