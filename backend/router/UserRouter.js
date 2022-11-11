const express = require('express')
const router = express.Router()

const UserHandler=require('../models/UserHandler')

// Previous router: http://localhost:8000/api
router.post('/signup', UserHandler.signup)
router.post('/login', UserHandler.login)
router.get('/member/list', UserHandler.getMemberList)
router.get('/member/profile/:id', UserHandler.getProfile)
router.put('/member/update-info-by-member', UserHandler.updateInfoByMember)
router.put('/member/update-info-by-admin', UserHandler.updateInfoByAdmin)
router.put('/member/update-pwd', UserHandler.updatePassword)
router.get('/member/delete/:id', UserHandler.removeMember)
// TODO
router.get('/member/send-email', UserHandler.sendGroupEmail)

module.exports=router
