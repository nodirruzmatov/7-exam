import Joi from 'joi'

export const LoginValidation = Joi.object().keys({
  name: Joi.string().required(),
  password: Joi.string().required()
})

export const newCoursValidation = Joi.object().keys({
  coursName: Joi.string().required(),
  desc: Joi.string().required(),
  price: Joi.string().required(),
})

export const newTeachValidation = Joi.object().keys({
  name: Joi.string().required(),
  password: Joi.string().required(),
  cours: Joi.string().required(),
  phoneNumber: Joi.string().required()
})

export const newGroupValidation = Joi.object().keys({
  groupName: Joi.string().required(),
  courseId: Joi.string().required(),
  teacher: Joi.string().required(),
  day: Joi.string().required(),
  time: Joi.string().required()
})

export const newStudValodation = Joi.object().keys({
  name: Joi.string().required(),
  password: Joi.string().required(),
  groupId: Joi.string().required(),
  phoneNumber: Joi.string().required()
})

export const newHomeworkValidation = Joi.object().keys({
  desc: Joi.string().required(),
  groupId: Joi.string().required(),

})