const express = require('express')
const router = express.Router()

const MemberHandler=require('../models/MemberHandler')

// http://localhost:8000/api/member
router.get('/list', MemberHandler.viewMemberList)

router.get('/profile', MemberHandler.displayProfile)

router.post('/updateprofile', MemberHandler.updateUserProfile)

router.post('/updatepwd', MemberHandler.updatePassword)

// router.put('/update/:id', MemberHandler.updateInfo)
router.patch('/update/:id', MemberHandler.updateInfo)

router.get('/delete/:id', MemberHandler.removeMember)

router.get('/send-email', MemberHandler.sendGroupEmail)



module.exports=router
