const {Joi, validString, user_id, password, email, phone, requiredString, requiredNumber}=require('./user')


exports.profile_schema = {
    params: {
        id: user_id,
    }
}

exports.member_login_schema={
    body: {
        member_id: user_id,
        password,
    }
}

exports.login_check_schema={
    body: {
        member_id: user_id,
    }
}

exports.member_signup_schema={
    body: {
        firstname: validString,
        lastname: validString,
        email,
        member_id: user_id,
        password,
        confirm: Joi.ref('password'),
        address_line1: validString,
        address_city: validString,
        address_country: validString,
        address_postalcode: validString,
        phone,
        birthday_year: requiredNumber,
        birthday_month: requiredString,
        birthday_date: requiredNumber,
        gender: requiredString,
        amount: requiredNumber,
    }
}

exports.update_info_schema={
    body: {
        member_id: user_id,
    }
}

exports.update_pwd_schema={
    body: {
        member_id: user_id,
        oldPassword: password,
        newPassword: Joi.not(Joi.ref('oldPassword')).concat(password),  // new password must be different from old password
        confirmPassword: Joi.ref('newPassword'),
    }
}

exports.reset_pwd_schema={
    body: {
        member_id: user_id,
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
        id: user_id,
    }
}

exports.delete_notification_schema = {
    body: {
        member_id: user_id,
        notificationContent: requiredString,
    }
}

exports.card_proceed_schema = {
    body: {
        member_id: user_id,
    }
}
