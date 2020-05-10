const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Marker', {
    type: Joi.string().required(),
    geometry: Joi.object().pattern(Joi.string(), Joi.array()).required(),
    properties:Joi.any(),
    
})