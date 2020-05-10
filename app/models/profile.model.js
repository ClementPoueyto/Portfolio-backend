const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Profile', {
    firstName: Joi.string().required(),
    lastName:Joi.string().required(),
    status:Joi.string().required(),
    description:Joi.string().required(),
    birthDate:Joi.string().allow('').required(),
    image:Joi.string().allow(''),
    
})