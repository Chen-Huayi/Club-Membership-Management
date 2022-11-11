const express = require('express')
const router = express.Router()

const UserHandler=require('../models/UserHandler')

// http://localhost:8000/api
router.post('/signup', UserHandler.signup)
router.post('/login', UserHandler.login)

router.get('/member/list', UserHandler.getMemberList)
// router.post('/member/profile', UserHandler.getProfile)
router.get('/member/profile/:id', UserHandler.getProfile)
router.post('/member/update-single-profile', UserHandler.updateInfoByMember)
router.put('/member/update-profile', UserHandler.updateInfoByAdmin)
router.post('/member/update-pwd', UserHandler.updatePassword)
router.get('/member/delete/:id', UserHandler.removeMember)
router.get('/member/send-email', UserHandler.sendGroupEmail)

module.exports=router
