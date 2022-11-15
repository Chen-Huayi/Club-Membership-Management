const express = require('express')
const router = express.Router()

const staffHandler=require('../models/StaffHandler')
const feeHandler=require('../models/FeeHandler')

// Previous router:
// http://localhost:8000/api
router.post('/staff/signup', staffHandler.signup)
router.post('/staff/login', staffHandler.login)

router.get('/staff/active-list', staffHandler.getActiveStaffList)
router.get('/staff/inactive-list', staffHandler.getInactiveStaffList)
router.get('/staff/profile/:id', staffHandler.getStaffProfile)

router.put('/staff/update-info', staffHandler.updateStaffInfo)

router.put('/staff/deactivate', staffHandler.deactivateStaff)
router.put('/staff/activate', staffHandler.activateStaff)

router.put('/annual-fee', feeHandler.updateMembershipFee)
router.get('/annual-fee', feeHandler.getMembershipFee)

module.exports=router
