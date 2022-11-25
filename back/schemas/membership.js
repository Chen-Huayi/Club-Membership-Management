const Joi = require("joi")
// 0-9, a-z, A-Z, min:3, max: 20
const id = Joi.string().alphanum().min(3).max(20).required()
// time range requires: "YYYY-MM-DD YYYY-MM-DD" which has 21 characters
const range = Joi.string().min(21).max(21).required()

exports.membership_schema={
    body: {
        member_id: id,
        approved_by: id,
    }
}

exports.time_range_schema={
    params: {
        range,
    }
}



