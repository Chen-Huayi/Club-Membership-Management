const {Joi, validString, user_id, password, email, phone, requiredString}=require('./user')


exports.staff_login_schema={
    body: {
        staff_id: user_id,
        password,
    }
}

exports.staff_signup_schema={
    body: {
        firstname: validString,
        lastname: validString,
        email,
        phone,
        staff_id: user_id,
        password,
        confirm: Joi.ref('password'),
        user_role: requiredString,
    }
}

exports.profile_schema = {
    params: {
        id: user_id,
    }
}

exports.update_info_schema={
    body: {
        firstname: validString,
        lastname: validString,
        staff_id: user_id,
        email,
        phone,
        user_role: requiredString,
    }
}

exports.switch_status_schema={
    body: {
        staff_id: user_id,
    }
}
