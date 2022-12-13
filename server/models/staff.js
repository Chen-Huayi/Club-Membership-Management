const mongoose = require('mongoose');
const Schema = mongoose.Schema


const staffSchema = new Schema({
    staff_id: {type: String, unique: true, required: true},
    user_role: {type: String, required: true},
    firstname: {type: String, required: true},
    middle_name: {type: String, default: ''},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    membership_status: {type: Boolean, default: false, required: true},  // true for Active; false for Inactive
})

const staffModel = mongoose.model('staffs', staffSchema)

module.exports = {staffModel}
