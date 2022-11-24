const express = require('express')
const router = express.Router()
const member = require("../controllers/memberController")
const staff=require('../controllers/staffController')

// Router start with:
// http://localhost:8000/api
router.post('/member/signup', member.signup)
router.post('/login-checked', member.checkLocked)
router.post('/member/login', member.login)

router.post('/staff/signup', staff.signup)
router.post('/staff/login', staff.login)

module.exports=router
