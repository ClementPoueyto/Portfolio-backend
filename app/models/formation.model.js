const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Formation', {
    title: Joi.string().required(),
    description:Joi.string().required(),
    place:Joi.string().required(),
    period:Joi.string().required(),
    image:Joi.string().allow(''),
    link:Joi.string().allow(''),
})