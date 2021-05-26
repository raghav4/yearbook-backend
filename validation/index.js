const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

class Validation {
  static login(user) {
    const schema = Joi.object({
      userId: Joi.string().length(11).label('User ID').required(),
      password: Joi.string().label('Password').required(),
    });
    return schema.validate(user);
  }

  static signup(user) {
    const schema = Joi.object({
      name: Joi.string().label('Name').required(),
      password: Joi.string().label('Password').required(),
      userId: Joi.string().length(11).label('User Id').required(),
      section: Joi.string().label('Section').required(),
      department: Joi.string().label('Department').required(),
    });
    return schema.validate(user);
  }

  static message(messageContent) {
    const schema = Joi.object({
      content: Joi.string().label('Message Content').required(),
      receiverId: Joi.objectId().label('Receiver Id').required(),
    });
    return schema.validate(messageContent);
  }

  static answer(answerContent) {
    const schema = Joi.object({
      titleId: Joi.objectId().label('titleId').required(),
      content: Joi.string().label('Answer Content').required(),
    });
    return schema.validate(answerContent);
  }

  static title(title) {
    const schema = Joi.object({
      title: Joi.string().label('Title').required(),
    });
    return schema.validate(title);
  }
}

module.exports = Validation;
