require('../db/mongo_server')
const mongoose = require('mongoose')
// const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const memberSchema = require('../schema/member')
const memberModel = mongoose.model('members', memberSchema)


const getUserById =async (member_id)=>{
    let member=null
    try {
        member=await memberModel.findOne({member_id})
    } catch (err){
        throw Error(err)
    }
    return member
}

const updateByObjId = (id, update, msg, res) => {
    memberModel.findByIdAndUpdate(id, update, (err)=>{
        if (err){
            return res.handleMessage(err)
        } else{
            console.log(msg)
        }
    })
}

const updateInfo = (member_id, update, operationMsg, res)=>{
    getUserById(member_id)
        .then(member=>{
            if (!member){
                return res.handleMessage('User does not exist!')
            }
            updateByObjId(member._id, {$set: update}, `${operationMsg} successfully!`, res)
            res.handleMessage(`${operationMsg} successfully!`, 0)
        })
        .catch(err => {
            throw Error(err)
        })
}

const getMemberList = async (membershipStatus, res)=>{
    const members = await memberModel.find({
        membership_status: membershipStatus
    })
    res.send({
        member_list: members
    })
}

const formatDateString = (date)=>{
    return date.getFullYear() +'/'+ (date.getMonth()+1).toString().padStart(2, '0')+'/'+ date.getDate().toString().padStart(2, '0')
}

const getLastMonday = (date) => {
    date.setDate(date.getDate()-7-date.getDay()+1)
    return formatDateString(date)
}


/*---------------for public (member without login)-------------------*/
exports.signup = (req, res)=>{
    const {pay_now, amount, agreement, ...userInfo} = req.body  // delete agreement, and get payment condition
    const member_id=userInfo.member_id

    memberModel.count({member_id}, (err, result)=>{
        if (err){
            return res.handleMessage(err)
        }
        if (result>0){  // Already exist this member id
            return res.handleMessage('Member ID is occupied!')
        } else {
            memberModel.create(userInfo, (err)=>{
                if (err){
                    return res.handleMessage(err)
                }
                // insert to the database successfully
                console.log(`Insert [${userInfo.user_role}: ${member_id}] successfully!`)

                res.send({
                    status: 0,
                    message: 'Register successfully!',
                    member_id,
                    pay_now,
                    amount
                })
            })
        }

    })
}

exports.checkLocked = (req, res)=>{
    getUserById(req.body.member_id)
        .then(member => {
            if (!member){
                return res.handleMessage('Wrong Member ID!')
            }
            res.send({
                status: 0,
                account_locked: member.account_locked
            })
        })
        .catch(err=>{
            throw Error(err)
        })
}

exports.login = (req, res)=>{
    const userInfo=req.body
    const member_id=userInfo.member_id
    const password=userInfo.password

    getUserById(member_id)
        .then(member => {
            if (!member){
                return res.handleMessage('Wrong Member ID!')
            }

            if (member.fail_login_count>=4){
                updateByObjId(member._id, {$set: {account_locked: true}}, `Your account [${member_id}] is locked`, res)
                // return res.handleMessage(`Your account [${member_id}] is locked!`)
            }

            if (member.password!==password){  // TODO password 加密
                updateByObjId(member._id, {$inc: {fail_login_count: 1}}, `[${member_id}] failure login count +1`, res)
                return res.handleMessage('Wrong Password!')
            }

            updateByObjId(member._id, {fail_login_count: 0}, `Club member [${member_id}] login successfully!`, res)
            const userObj = {...member._doc, password:''}
            const {fail_login_count, __v, ...rest} = userObj
            const {firstname, lastname, user_role, membership_status, expire_date}=rest

            // TODO user_role加密

            const tokenStr=jwt.sign(
                rest,
                config.jwtSecretKey,
                {expiresIn: config.expiresIn}
            )

            res.send({
                status: 0,
                token: 'Bearer '+tokenStr,
                member_id,
                firstname,
                lastname,
                user_role,
                membership_status,
                expire_date
            })
        })
        .catch(err => {
            throw Error(err)
        })
}


/*------------ for only after member login into account------------*/
// Get user information
exports.getActiveMemberList = (req, res)=>{
    getMemberList(true, res)
}

exports.getInactiveMemberList = (req, res)=>{
    getMemberList(false, res)
}

exports.getMemberProfile = (req, res)=>{
    const member_id=req.params.id

    getUserById(member_id)
        .then(member=>{
            if (!member){
                return res.handleMessage('User does not exist!')
            }
            const {
                member_id, firstname, middle_name, lastname, gender, birthday_year, birthday_month,
                birthday_date, address_line1, address_line2, address_line3, address_city, address_country,
                address_postalcode, email, phone, registered_date, effective_date, expire_date, membership_status
            } = member

            res.send({
                member_id, firstname, middle_name, lastname, gender, birthday_year, birthday_month,
                birthday_date, address_line1, address_line2, address_line3, address_city, address_country,
                address_postalcode, email, phone, registered_date, effective_date, expire_date, membership_status
            })
        })
        .catch(err => {
            throw Error(err)
        })
}


// Update attributes
exports.updateMemberInfo = (req, res)=>{
    updateInfo(
        req.body.member_id,
        req.body,
        'Update',
        res
    )
}

exports.updatePassword = (req, res)=>{
    const member_id=req.body.member_id
    const oldPassword=req.body.oldPassword
    const newPassword=req.body.newPassword

    getUserById(member_id)
        .then(member=>{
            if (!member){
                return res.handleMessage('User does not exist!')
            }
            if (oldPassword!==member.password){
                return res.handleMessage('The old password is wrong!')
            }
            if (oldPassword===newPassword){
                return res.handleMessage('The old password and new password are same!')
            }
            updateByObjId(member._id, {$set: {password: newPassword}}, 'Password changed!', res)
            res.handleMessage('Password changed!', 0)
        })
        .catch(err => {
            throw Error(err)
        })
}

exports.resetPassword = (req, res)=>{
    updateInfo(
        req.body.member_id,
        {password: req.body.password, account_locked: false, fail_login_count: 0},
        'Password reset',
        res
    )
}


// Switch membership status of members
exports.deactivateMember = (req, res)=>{
    updateInfo(
        req.body.member_id,
        {membership_status: false, expire_date: formatDateString(new Date())},
        'Deactivate member',
        res
    )
}

exports.activateMember = async (req, res)=>{
    const member=await getUserById(req.body.member_id)

    if (!member){
        return res.handleMessage('Wrong Member ID!')
    }

    let newExpireDate
    let effectiveDate
    let recentRenewalDate=new Date()  // To be today
    const prevExpireDate=new Date(member.expire_date)

    if (prevExpireDate>new Date()){  // member.expire_date is not expire today(失效日期还没到)
        // expire_date: previous expire date +1 year
        newExpireDate = prevExpireDate
        newExpireDate.setFullYear(newExpireDate.getFullYear()+1)
        // effectIve_date no change
        effectiveDate=new Date(member.effective_date)
    }else {  // membership is expire
        // expire_date: today + 1 year
        newExpireDate = new Date()
        newExpireDate.setFullYear(newExpireDate.getFullYear()+1)
        // effectIve_date: today
        effectiveDate=new Date()
    }

    const expire_date = formatDateString(newExpireDate)
    const effective_date = formatDateString(effectiveDate)
    const recent_renewal_date = formatDateString(recentRenewalDate)

    updateInfo(
        req.body.member_id,
        {
            membership_status: true,
            expire_date,
            effective_date,
            recent_renewal_date,
        },
        (member.recent_renewal_date==='Never renew') ?
            'Activate membership' : 'Renew membership',  // Activate for new member, Renew for existing member
        res
    )
}


// Emails/Notifications send, receive, and delete operations
exports.sendGroupEmail = (req, res)=>{
    memberModel.updateMany(
        {membership_status: true},
        {$push: {"notifications": {"title": req.body.title, "content": req.body.content}}},
        (err)=>{
            if (err) console.log(err)
            res.handleMessage('Email already sent', 0)
        })
}

exports.getNotification = (req, res)=>{
    getUserById(req.params.id)
        .then(member => {
            if (!member){
                return res.handleMessage('Wrong Member ID!')
            }
            res.send({
                notifications: member.notifications
            })
        })
        .catch(err=>{
            throw Error(err)
        })
}

exports.deleteNotification = (req, res)=>{
    memberModel.updateOne(
        {member_id: req.body.member_id},
        {$pull: {"notifications": {"content": req.body.notificationContent}}},
        (err)=>{
            if (err) {
                console.log(err)
            }
            res.handleMessage('This notification delete', 0)
        })
}


exports.requestReplaceCard = (req, res)=>{
    // res.send()
    updateInfo(
        req.body.member_id,
        {has_card: false},
        'Request new membership card',
        res
    )
}

exports.getSendCardList = async (req, res) =>{
    const members = await memberModel.find({
        has_card: false,
        membership_status: true,
        effective_date: {$gte: getLastMonday(new Date())}
    })

    if (!members){
        res.handleMessage('Fail to get send card member list.')
    }else {
        res.send({
            member_list: members
        })
    }
}

exports.getReplaceCardList = async (req, res) =>{
    const members = await memberModel.find({
        has_card: false,
        membership_status: true,
        effective_date: {$lt: getLastMonday(new Date())}
    })

    if (!members){
        res.handleMessage('Fail to get send card member list.')
    }else {
        res.send({
            member_list: members
        })
    }
}

exports.deliverCard = (req, res) =>{
    updateInfo(
        req.body.member_id,
        {has_card: true},
        'Membership card will deliver soon',
        res
    )
}

