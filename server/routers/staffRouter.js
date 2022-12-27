const express = require('express')
const router = express.Router()
const validator = require('@escook/express-joi')
const {profile_schema, update_info_schema, switch_status_schema} = require('../schemas/staff')
const staff = require('../controllers/staffController')

// Router start with:
// http://localhost:12138/staff
router.get('/active', staff.getActiveStaffList)
router.get('/inactive', staff.getInactiveStaffList)
router.get('/profile/:id', validator(profile_schema), staff.getStaffProfile)

router.put('/profile/update', validator(update_info_schema), staff.updateStaffInfo)

router.put('/deactivate', validator(switch_status_schema), staff.deactivateStaff)
router.put('/activate', validator(switch_status_schema), staff.activateStaff)

module.exports = router
