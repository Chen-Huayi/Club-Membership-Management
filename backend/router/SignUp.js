const express = require('express')
const router = express.Router()

const signupHandler=require('../models/SignUpMember')

// http://localhost:8000/api/signup
router.post('/', signupHandler.addMember)


module.exports=router
