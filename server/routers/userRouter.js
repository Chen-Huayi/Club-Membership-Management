const express = require('express')
const router = express.Router()
const validator = require('@escook/express-joi')
const {member_signup_schema, member_login_schema, login_check_schema} = require('../schemas/member')
const {staff_signup_schema, staff_login_schema} = require('../schemas/staff')
const member = require("../controllers/memberController")
const staff = require('../controllers/staffController')

// Router start with:
// http://localhost:12138/api
router.post('/signup/member', validator(member_signup_schema), member.signup)
router.post('/signup/staff', validator(staff_signup_schema), staff.signup)

router.post('/login/checked', validator(login_check_schema), member.checkLocked)
router.post('/login/member', validator(member_login_schema), member.login)
router.post('/login/staff', validator(staff_login_schema), staff.login)

module.exports = router
