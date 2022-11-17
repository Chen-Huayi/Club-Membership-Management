const express = require('express')
const router = express.Router()

const memberHandler=require('../models/MemberHandler')
const membershipModel=require('../models/membershipModel')

// Previous router:
// http://localhost:8000/api
router.post('/member/signup', memberHandler.signup)
router.post('/login-checked', memberHandler.checkLocked)
router.post('/member/login', memberHandler.login)

router.get('/member/active-list', memberHandler.getActiveMemberList)
router.get('/member/inactive-list', memberHandler.getInactiveMemberList)
router.get('/member/profile/:id', memberHandler.getMemberProfile)

router.put('/member/update-info', memberHandler.updateMemberInfo)
router.put('/member/update-pwd', memberHandler.updatePassword)
router.put('/member/reset-pwd', memberHandler.resetPassword)  // for user forgot password or their accounts are locked by system

router.put('/member/deactivate', memberHandler.deactivateMember)
router.put('/member/activate', memberHandler.activateMember)
router.post('/membership/activate-record', membershipModel.membershipActivateRecord)
router.post('/membership/deactivate-record', membershipModel.membershipDeactivateRecord)
router.get('/membership/record', membershipModel.getMembershipAudit)

router.post('/member/send-email', memberHandler.sendGroupEmail)
router.get('/member/receive-email/:id', memberHandler.getNotification)
router.put('/member/delete-email', memberHandler.deleteNotification)

router.put('/member/request-replace-card/', memberHandler.requestReplaceCard)
router.get('/member/send-card-list/', memberHandler.getSendCardList)
router.get('/member/replace-card-list/', memberHandler.getReplaceCardList)
router.put('/member/deliver-card/', memberHandler.deliverCard)

module.exports=router
