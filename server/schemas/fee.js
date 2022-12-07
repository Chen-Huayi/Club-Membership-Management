const Joi = require("joi")

exports.update_fee_schema = {
    body: {
        membership_fee: Joi.number().integer().min(1).max(9999).required()
    }
}
