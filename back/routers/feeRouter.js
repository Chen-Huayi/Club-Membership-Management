const express = require('express')
const router = express.Router()
const fee = require("../controllers/feeController")

// Previous router:
// http://localhost:8000/api
router.put('/annual-fee', fee.updateMembershipFee)
router.get('/annual-fee', fee.getMembershipFee)

module.exports=router
