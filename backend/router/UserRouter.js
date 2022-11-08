const express = require('express')
const router = express.Router()

const UserHandler=require('../models/UserHandler')

// http://localhost:8000/api
router.post('/signup', UserHandler.signup)
router.post('/login', UserHandler.login)

// http://localhost:8000/api/member
router.get('/member/list', UserHandler.getMemberList)
router.get('/member/profile', UserHandler.getProfile)
router.post('/member/updateprofile', UserHandler.updateUserProfile)
router.post('/member/updatepwd', UserHandler.updatePassword)
router.put('/member/update/:id', UserHandler.updateInfo)  // router.patch('/member/update/:id', UserHandler.updateInfo)
router.get('/member/delete/:id', UserHandler.removeMember)
router.get('/member/send-email', UserHandler.sendGroupEmail)

module.exports=router
