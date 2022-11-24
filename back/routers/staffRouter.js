const express = require('express')
const router = express.Router()
const staff=require('../controllers/staffController')

// Router start with:
// http://localhost:8000/staff
router.get('/active-list', staff.getActiveStaffList)
router.get('/inactive-list', staff.getInactiveStaffList)
router.get('/profile/:id', staff.getStaffProfile)

router.put('/update-info', staff.updateStaffInfo)

router.put('/deactivate', staff.deactivateStaff)
router.put('/activate', staff.activateStaff)

module.exports=router
