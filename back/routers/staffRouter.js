const express = require('express')
const router = express.Router()

const staff=require('../controllers/staffController')
const fee=require('../controllers/feeController')

// Previous router:
// http://localhost:8000/api
router.post('/staff/signup', staff.signup)
router.post('/staff/login', staff.login)

router.get('/staff/active-list', staff.getActiveStaffList)
router.get('/staff/inactive-list', staff.getInactiveStaffList)
router.get('/staff/profile/:id', staff.getStaffProfile)

router.put('/staff/update-info', staff.updateStaffInfo)

router.put('/staff/deactivate', staff.deactivateStaff)
router.put('/staff/activate', staff.activateStaff)

router.put('/annual-fee', fee.updateMembershipFee)
router.get('/annual-fee', fee.getMembershipFee)

module.exports=router
