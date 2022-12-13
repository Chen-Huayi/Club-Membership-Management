const mongoose = require('mongoose');
const Schema = mongoose.Schema

const feeSchema = new Schema({
    company: {type: String, required: true},
    membership_fee: {type: Number, required: true},
})

const feeModel = mongoose.model('fees', feeSchema)

module.exports = {feeModel}
