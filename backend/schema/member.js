const mongoose = require('mongoose');
const Schema = mongoose.Schema

const memberSchema = new Schema(
    {
        member_id: {type: String, required: true},
        firstname: {type: String, required: true},
        middle_name: {type: String, default: ''},
        lastname: {type: String, required: true},
        gender: {type: String, required: true},
        birthday: {type: String, required: true},
        address_line1: {type: String, required: true},
        address_line2: {type: String, default: ''},
        address_line3: {type: String, default: ''},
        address_city: {type: String, required: true},
        address_country: {type: String, required: true},
        address_postalcode: {type: String, required: true},
        email: {type: String, required: true},
        phone: {type: String, required: true},
        registered_date: {type: String, default: new Date().toLocaleDateString(), required: true},  // The date the user is registered
        effective_date: {type: String, required: true},  // The membership becomes effective for the current or last period
        expire_date: {type: String, required: true},  // The membership expires after this date
        membership_status: Boolean  // Active/Inactive
    }
)

module.exports=memberSchema
