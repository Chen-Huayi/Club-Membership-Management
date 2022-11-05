const express = require('express')
const router = express.Router()

const UserHandler=require('../models/UserHandler')

// http://localhost:8000/api
router.post('/signup', UserHandler.signup)

router.post('/login', UserHandler.login)


module.exports=router
