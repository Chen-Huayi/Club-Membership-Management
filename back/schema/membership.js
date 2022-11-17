// const mongoose = require('mongoose');
// const Schema = mongoose.Schema
//
// const membershipRenewalSchema = new Schema(
//     {
//         effective_date: {type: String, required: true},  // The membership becomes effective for the current or last period
//         expire_date: {type: String, required: true},  // The membership expires after this date
//         payment_type: {type: String, required: true},  // PayPal, Credit Card, Manual
//         payment_date: {type: String, default: new Date().toLocaleDateString(), required: true},  // The date the membership payment is made (online), or confirmed (by staff)
//         approved_by: {type: String, required: true}  // If processed by a staff, the user id of the staff. If processed by system, then record “System”
//     }
// )
//
// module.exports=membershipRenewalSchema
