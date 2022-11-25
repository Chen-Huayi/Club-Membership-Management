const Joi = require("joi")

const validString=Joi.string().min(1).max(30).required()
// 0-9, a-z, A-Z, min:3, max: 20
const member_id= Joi.string().alphanum().min(3).max(20).required()
// 6-20 characters without whitespace
const password=Joi.string().pattern(/^[\S]{6,20}$/).required()
// Email format with .com or .net ending
const email= Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
const phone= Joi.string().min(10).max(15).required()
const gender= Joi.string().required()



exports.profile_schema = {
    params: {
        id: member_id,
    }
}

exports.member_login_schema={
    body: {
        member_id,
        password,
    }
}

exports.login_check_schema={
    body: {
        member_id,
    }
}

exports.member_signup_schema={
    body: {
        firstname: validString,
        lastname: validString,
        email,
        member_id,
        password,
        confirm: Joi.ref('password'),
        address_line1: validString,
        address_city: validString,
        address_country: validString,
        address_postalcode: validString,
        phone,
        birthday_year: Joi.number().required(),
        birthday_month: Joi.string().required(),
        birthday_date: Joi.number().required(),
        gender,
        amount: Joi.number(),
    }
}

exports.update_info_schema={
    body: {
        member_id,
    }
}

exports.update_pwd_schema={
    body: {
        member_id,
        oldPassword: password,
        newPassword: Joi.not(Joi.ref('oldPassword')).concat(password),
        confirmPassword: Joi.ref('newPassword'),
    }
}

exports.reset_pwd_schema={
    body: {
        member_id,
        password,
        confirm: Joi.ref('password'),
    }
}

exports.send_email_schema={
    body: {
        title: Joi.string().min(1).max(100).required(),
        content: Joi.string().min(1).max(1000).required(),
    }
}

exports.notification_schema = {
    params: {
        id: member_id,
    }
}

exports.delete_notification_schema = {
    body: {
        member_id,
        notificationContent: Joi.string().required()
    }
}

exports.card_proceed_schema = {
    body: {
        member_id,
    }
}



