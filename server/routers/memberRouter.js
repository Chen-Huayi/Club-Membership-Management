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
router.put('/active', validator(update_info_schema), member.activateMember)

router.get('/inactive', member.getInactiveMemberList)
router.put('/inactive', validator(update_info_schema), member.deactivateMember)

router.get('/profiles/:id', validator(profile_schema), member.getMemberProfile)
router.put('/profiles', member.updateMemberInfo)

router.patch('/password', validator(update_pwd_schema), member.updatePassword)
router.put('/password', validator(reset_pwd_schema), member.resetPassword)  // for user forgot password or their accounts are locked by system

router.post('/emails', validator(send_email_schema), member.sendGroupEmail)
router.get('/emails/:id', validator(notification_schema), member.getNotification)
router.put('/emails', validator(delete_notification_schema), member.deleteNotification)

router.put('/cards', validator(card_proceed_schema), member.requestReplaceCard)
router.patch('/cards', validator(card_proceed_schema), member.deliverCard)
router.get('/cards/send', member.getSendCardList)
router.get('/cards/replace', member.getReplaceCardList)

module.exports = router
