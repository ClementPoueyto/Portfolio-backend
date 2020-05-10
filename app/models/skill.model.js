const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Skill', {
    name: Joi.string().required(),
    description:Joi.string().allow('').required(),
    skillType:Joi.string().required(),
    pourcentage:Joi.number(),
    image:Joi.string().allow(''),
})