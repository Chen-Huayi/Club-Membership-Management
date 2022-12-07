const Joi = require("joi")

// Required string length between 1 and 30, including name, address
const validString=Joi.string().min(1).max(30).required()
// 0-9, a-z, A-Z, min:3, max: 20
const user_id= Joi.string().alphanum().min(3).max(20).required()
// 6-20 characters without whitespace
const password=Joi.string().pattern(/^[\S]{6,20}$/).required()
// Email format with .com or .net ending
const email= Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
// The length of phone number is between 10 and 15
const phone= Joi.string().min(10).max(15).required()
// Time range requires: "YYYY-MM-DD YYYY-MM-DD" which has 21 characters
const range = Joi.string().min(21).max(21).required()
// Only must be a string, including user_role, gender, notification,
const requiredString = Joi.string().required()
// Only must be a number, including birthday_year, birthday_date
const requiredNumber = Joi.number().required()

module.exports={Joi, validString, user_id, password, email, phone, range, requiredString, requiredNumber}
