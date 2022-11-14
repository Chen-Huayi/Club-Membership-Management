const express = require('express')
const router = express.Router()

const staffHandler=require('../models/StaffHandler')
const memberHandler = require("../models/MemberHandler");

// Previous router:
// http://localhost:8000/api
router.post('/staff/signup', staffHandler.signup)
router.post('/staff/login', staffHandler.login)


router.get('/staff/profile/:id', staffHandler.getStaffProfile)

module.exports=router
