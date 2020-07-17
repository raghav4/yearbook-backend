const Joi = require('@hapi/joi');

module.exports = (user) => {
  const schema = Joi.object({
    name : Joi.string().min(4).max(30).label('Name').required(),
    email : Joi.string().email().label('Email').required(),
    password : Joi.string().min(7).label('Password').required(),
    department : Joi.string().min(2).max(3).label('Department').required(),
    section : Joi.string().length(1).label('Section'),
  });
  return schema.validate(user);
};
