const mongoose = require('mongoose');
const Schema = mongoose.Schema

const day=new Date()
const today = day.getFullYear() +'/'+ (day.getMonth()+1).toString().padStart(2, '0')+'/'+ day.getDate().toString().padStart(2, '0')

const memberSchema = new Schema({
    member_id: {type: String, unique: true, required: true},
    user_role: {type: String, default: 'Club Member', required: true},
    firstname: {type: String, required: true},
    middle_name: {type: String, default: ''},
    lastname: {type: String, required: true},
    gender: {type: String, required: true},
    birthday_year: {type: String, required: true},
    birthday_month: {type: String, required: true},
    birthday_date: {type: String, required: true},
    address_line1: {type: String, required: true},
    address_line2: {type: String, default: ''},
    address_line3: {type: String, default: ''},
    address_city: {type: String, required: true},
    address_country: {type: String, required: true},
    address_postalcode: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    fail_login_count: {type: Number, default: 0},
    registered_date: {type: String, default: today, required: true},  // The date the user is registered
    effective_date: {type: String, default: 'Never Effected', required: true},  // The membership becomes effective for the current or last period
    expire_date: {type: String, default: today, required: true},  // The membership expires after this date
    membership_status: {type: Boolean, default: false, required: true},  // true for Active; false for Inactive
    recent_renewal_date: {type: String, default: 'Never renew', required: true},
    account_locked: {type: Boolean, default: false, required: true},
    notifications: [],
    has_card: {type: Boolean, default: false, required: true},
})


const membershipSchema = new Schema({
    member_id: {type: String, required: true},
    effective_date: {type: String, required: true},  // The membership becomes effective for the current or last period
    expire_date: {type: String, required: true},  // The membership expires after this date
    // payment_type: {type: String, required: true},  // PayPal, Credit Card, Manual
    payment_date: {type: String, required: true},  // The date the membership payment is made (online), or confirmed (by staff)
    approved_by: {type: String, required: true}  // If processed by a staff, the user id of the staff. If processed by system, then record “System”
})

const memberModel = mongoose.model('members', memberSchema)
const membershipModel = mongoose.model('memberships', membershipSchema)


module.exports = {memberModel, membershipModel}

