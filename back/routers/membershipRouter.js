const express = require('express')
const router = express.Router()
const membership = require("../controllers/membershipController");

// Router start with:
// http://localhost:8000/membership
router.post('/activate-record', membership.membershipActivateRecord)
router.post('/deactivate-record', membership.membershipDeactivateRecord)
router.get('/record', membership.getMembershipAudit)

router.get('/registered/:range', membership.getNewRegisteredList)
router.get('/expired/:range', membership.getExpiredList)
router.get('/renewed/:range', membership.getRenewedList)

module.exports=router
