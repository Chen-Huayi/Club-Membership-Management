const mongoose = require('mongoose');
const Schema = mongoose.Schema

const staffSchema = new Schema(
    {
        user_id: {type: String, required: true, unique: true},
        user_role: {type: String, required: true},
        firstname: {type: String, required: true},
        middle_name: {type: String, default: ''},
        lastname: {type: String, required: true},
        email: {type: String, required: true},
        phone: {type: String, required: true},
        password: {type: String, required: true},
        status: {type: Boolean, default: false},
        fail_login_count: {type: Number, default: 0}
    }
)

module.exports=staffSchema
