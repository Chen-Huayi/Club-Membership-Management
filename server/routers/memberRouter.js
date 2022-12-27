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
const member = require('../controllers/memberController')

// Router start with:
// http://localhost:12138/member
router.get('/active', member.getActiveMemberList)
router.get('/inactive', member.getInactiveMemberList)

router.get('/profile/:id', validator(profile_schema), member.getMemberProfile)
router.put('/profile/update', member.updateMemberInfo)

router.put('/pw/update', validator(update_pwd_schema), member.updatePassword)
router.put('/pw/reset', validator(reset_pwd_schema), member.resetPassword)  // for user forgot password or their accounts are locked by system

router.put('/deactivate', validator(update_info_schema), member.deactivateMember)
router.put('/activate', validator(update_info_schema), member.activateMember)

router.post('/email/send', validator(send_email_schema), member.sendGroupEmail)
router.get('/email/get/:id', validator(notification_schema), member.getNotification)
router.put('/email/delete', validator(delete_notification_schema), member.deleteNotification)

router.put('/card/request', validator(card_proceed_schema), member.requestReplaceCard)
router.get('/card/send', member.getSendCardList)
router.get('/card/replace', member.getReplaceCardList)
router.put('/card/deliver', validator(card_proceed_schema), member.deliverCard)

module.exports = router
