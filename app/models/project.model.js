const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Project', {
    title: Joi.string().required(),
    description:Joi.string().allow('').required(),
    date:Joi.string().required(),
    github:Joi.string().required(),
    image:Joi.string().allow(''),
    messageLink:Joi.string().allow(''),
    link:Joi.string().allow(''),
})