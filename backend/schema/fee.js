const mongoose = require('mongoose');
const Schema = mongoose.Schema

const membershipFeeSchema = new Schema({
    company: {type: String, required: true},
    membership_fee: {type: Number, required: true},
})

module.exports=membershipFeeSchema
