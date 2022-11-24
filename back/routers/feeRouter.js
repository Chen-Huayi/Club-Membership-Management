const express = require('express')
const router = express.Router()
const fee = require("../controllers/feeController")

// Router start with:
// http://localhost:8000/fee
router.put('/annual-fee', fee.updateMembershipFee)
router.get('/annual-fee', fee.getMembershipFee)

module.exports=router
