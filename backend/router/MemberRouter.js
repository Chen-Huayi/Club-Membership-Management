const express = require('express')
const router = express.Router()

const MemberHandler=require('../models/MemberHandler')

// http://localhost:8000/api/member
router.get('/list', MemberHandler.viewMemberList)

// router.put('/update/:id', MemberHandler.updateInfo)
router.patch('/update/:id', MemberHandler.updateInfo)

router.get('/delete/:id', MemberHandler.removeMember)

router.get('/send-email', MemberHandler.sendGroupEmail)

router.get('/profile', MemberHandler.displayProfile)


module.exports=router
