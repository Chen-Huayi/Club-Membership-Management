const express = require('express')
const router = express.Router()
const membership = require("../controllers/membershipController");

// Router start with:
// http://localhost:8000/api
router.post('/membership/activate-record', membership.membershipActivateRecord)
router.post('/membership/deactivate-record', membership.membershipDeactivateRecord)
router.get('/membership/record', membership.getMembershipAudit)

router.get('/member/registered/:range', membership.getNewRegisteredList)
router.get('/member/expired/:range', membership.getExpiredList)
router.get('/member/renewed/:range', membership.getRenewedList)

module.exports=router
