const Joi = require("joi")

const validString=Joi.string().min(1).max(30).required()
// 0-9, a-z, A-Z, min:3, max: 20
const staff_id= Joi.string().alphanum().min(3).max(20).required()
// 6-20 characters without whitespace
const password=Joi.string().pattern(/^[\S]{6,20}$/).required()
// Email format with .com or .net ending
const email= Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
const phone= Joi.string().min(10).max(15).required()


exports.staff_login_schema={
    body: {
        staff_id,
        password,
    }
}

exports.staff_signup_schema={
    body: {
        firstname: validString,
        lastname: validString,
        email,
        phone,
        staff_id,
        password,
        confirm: Joi.ref('password'),
        user_role: Joi.string().required(),
    }
}

exports.profile_schema = {
    params: {
        id: staff_id,
    }
}

exports.update_info_schema={
    body: {
        firstname: validString,
        lastname: validString,
        staff_id,
        email,
        phone,
        user_role: Joi.string().required(),
    }
}

exports.switch_status_schema={
    body: {
        staff_id,
    }
}

