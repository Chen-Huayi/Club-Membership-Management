const express = require('express')
const router = express.Router()
const validator = require('@escook/express-joi')
const {
    profile_schema,
    update_info_schema,
    update_pwd_schema,
    reset_pwd_schema,
    send_email_schema,
    notification_schema,
    delete_notification_schema,
    card_proceed_schema
} = require('../schemas/member')
const member=require('../controllers/memberController')

// Router start with:
// http://localhost:8000/member
router.get('/active-list', member.getActiveMemberList)
router.get('/inactive-list', member.getInactiveMemberList)
router.get('/profile/:id', validator(profile_schema), member.getMemberProfile)

router.put('/update-info', member.updateMemberInfo)
router.put('/update-pwd', validator(update_pwd_schema), member.updatePassword)
router.put('/reset-pwd', validator(reset_pwd_schema), member.resetPassword)  // for user forgot password or their accounts are locked by system

router.put('/deactivate', validator(update_info_schema), member.deactivateMember)
router.put('/activate', validator(update_info_schema), member.activateMember)

router.post('/send-email', validator(send_email_schema), member.sendGroupEmail)
router.get('/receive-email/:id', validator(notification_schema), member.getNotification)
router.put('/delete-email', validator(delete_notification_schema), member.deleteNotification)

router.put('/request-replace-card/', validator(card_proceed_schema), member.requestReplaceCard)
router.get('/send-card-list/', member.getSendCardList)
router.get('/replace-card-list/', member.getReplaceCardList)
router.put('/deliver-card/', validator(card_proceed_schema), member.deliverCard)

module.exports=router
