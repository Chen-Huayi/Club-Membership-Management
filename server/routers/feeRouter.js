const express = require('express')
const router = express.Router()
const validator = require('@escook/express-joi')
const {update_fee_schema} = require('../schemas/fee')
const fee = require("../controllers/feeController")

// Router start with:
// http://localhost:12138/fee
router.put('/change', validator(update_fee_schema), fee.updateMembershipFee)
router.get('/get', fee.getMembershipFee)

module.exports = router
