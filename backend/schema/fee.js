const mongoose = require('mongoose');
const Schema = mongoose.Schema

const membershipFeeSchema = new Schema({
    membership_fee: {type: Number, required: true},
})

module.exports=membershipFeeSchema
