const express = require('express')
const router = express.Router()

const MemberHandler=require('../models/MemberHandler')

// Previous router: http://localhost:8000/api
router.post('/signup', MemberHandler.signup)
router.post('/login', MemberHandler.login)

router.get('/member/active-list', MemberHandler.getActiveMemberList)
router.get('/member/inactive-list', MemberHandler.getInActiveMemberList)

router.get('/member/profile/:id', MemberHandler.getProfile)
router.put('/member/update-info', MemberHandler.updateMemberInfo)
router.put('/member/update-pwd', MemberHandler.updatePassword)

router.get('/member/deactivate/:id', MemberHandler.deactivateMember)
router.get('/member/activate/:id', MemberHandler.activateMember)



//TODO
router.get('/member/send-email', MemberHandler.sendGroupEmail)

module.exports=router
