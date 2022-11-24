const express = require('express')
const router = express.Router()
const member=require('../controllers/memberController')

// Router start with:
// http://localhost:8000/member
router.get('/active-list', member.getActiveMemberList)
router.get('/inactive-list', member.getInactiveMemberList)
router.get('/profile/:id', member.getMemberProfile)

router.put('/update-info', member.updateMemberInfo)
router.put('/update-pwd', member.updatePassword)
router.put('/reset-pwd', member.resetPassword)  // for user forgot password or their accounts are locked by system

router.put('/deactivate', member.deactivateMember)
router.put('/activate', member.activateMember)

router.post('/send-email', member.sendGroupEmail)
router.get('/receive-email/:id', member.getNotification)
router.put('/delete-email', member.deleteNotification)

router.put('/request-replace-card/', member.requestReplaceCard)
router.get('/send-card-list/', member.getSendCardList)
router.get('/replace-card-list/', member.getReplaceCardList)
router.put('/deliver-card/', member.deliverCard)

module.exports=router
