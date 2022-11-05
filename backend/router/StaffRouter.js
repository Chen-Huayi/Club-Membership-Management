const express = require('express')
const router = express.Router()

const StaffHandler=require('../models/StaffHandler')

// http://localhost:8000/api/staff
router.post('/login', StaffHandler.staffLogin)

router.post('/register', StaffHandler.staffRegister)

module.exports=router
