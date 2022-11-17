const express = require('express')
const router = express.Router()

const member=require('../models/memberModel')
const membership=require('../models/membershipModel')

// Previous router:
// http://localhost:8000/api
router.post('/member/signup', member.signup)
router.post('/login-checked', member.checkLocked)
router.post('/member/login', member.login)

router.get('/member/active-list', member.getActiveMemberList)
router.get('/member/inactive-list', member.getInactiveMemberList)
router.get('/member/profile/:id', member.getMemberProfile)

router.put('/member/update-info', member.updateMemberInfo)
router.put('/member/update-pwd', member.updatePassword)
router.put('/member/reset-pwd', member.resetPassword)  // for user forgot password or their accounts are locked by system

router.put('/member/deactivate', member.deactivateMember)
router.put('/member/activate', member.activateMember)

router.post('/membership/activate-record', membership.membershipActivateRecord)
router.post('/membership/deactivate-record', membership.membershipDeactivateRecord)
router.get('/membership/record', membership.getMembershipAudit)

router.post('/member/send-email', member.sendGroupEmail)
router.get('/member/receive-email/:id', member.getNotification)
router.put('/member/delete-email', member.deleteNotification)

router.put('/member/request-replace-card/', member.requestReplaceCard)
router.get('/member/send-card-list/', member.getSendCardList)
router.get('/member/replace-card-list/', member.getReplaceCardList)
router.put('/member/deliver-card/', member.deliverCard)

router.get('/member/registered/:range', membership.getNewRegisteredList)
router.get('/member/expired/:range', membership.getExpiredList)
router.get('/member/renewed/:range', membership.getRenewedList)

module.exports=router
