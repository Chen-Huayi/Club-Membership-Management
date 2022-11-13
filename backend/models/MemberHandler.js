require('../db/mongo_server')
const mongoose = require('mongoose');
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const memberSchema = require('../schema/member')
const memberModel = mongoose.model('members', memberSchema)


const getUserById=async (member_id)=>{
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

const updateInfo=(member_id, update, operation, res)=>{
    getUserById(member_id)
        .then(member=>{
            if (!member){
                return res.handleMessage('User does not exist!')
            }
            updateByObjId(member._id, {$set: update}, `${operation} successfully!`, res)
            res.handleMessage(`${operation} successfully!`, 0)
        })
        .catch(err => {
            throw Error(err)
        })
}

const getMemberList=async (membershipStatus, res)=>{
    const members = await memberModel.find({
        membership_status: membershipStatus
    })
    res.send({
        member_list: members
    })
}



/*---------------for public (member without login)-------------------*/
exports.signup=(req, res)=>{
    const {agreement, ...userInfo} = req.body  // delete agreement

    memberModel.count({member_id: userInfo.member_id}, (err, result)=>{
        if (err){
            return res.handleMessage(err)
        }
        if (result>0){  // Already exist this member id
            return res.handleMessage('User ID is occupied!')
        } else {
            memberModel.create({...userInfo}, (err)=>{
                if (err){
                    return res.handleMessage(err)
                }
                // insert to the database successfully
                console.log(`Insert [${userInfo.user_role}: ${userInfo.member_id}] successfully!`)
                res.handleMessage('Register successfully!', 0)
            })
        }
    })
}

exports.login=(req, res)=>{
    const userInfo=req.body
    const member_id=userInfo.member_id
    const password=userInfo.password

    getUserById(member_id)
        .then(member => {
            if (!member)
                return res.handleMessage('Wrong Member ID!')

            // TODO password 加密
            if (member.password!==password){
                updateByObjId(member._id, {$inc: {fail_login_count: 1}}, `[${member_id}] Failure login count +1`, res)
                return res.handleMessage('Wrong Password!')
            }

            updateByObjId(member._id, {fail_login_count: 0}, `[${member_id}] login successfully!`, res)
            const userObj = {...member._doc, password:''}
            const {fail_login_count, __v, ...rest} = userObj
            const {firstname, lastname, user_role, membership_status}=rest

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
                membership_status
            })
        })
        .catch(err => {
            throw Error(err)
        })
}


/*------------ for only after member login into account------------*/
exports.getActiveMemberList = (req, res)=>{
    getMemberList(true, res)
}

exports.getInActiveMemberList = (req, res)=>{
    getMemberList(false, res)
}

exports.getProfile= (req, res)=>{
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

exports.updateMemberInfo=(req, res)=>{
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

exports.deactivateMember= (req, res)=>{
    updateInfo(
        req.params.id,
        {membership_status: false},
        'Deactivate member',
        res
    )
}

exports.activateMember= (req, res)=>{
    updateInfo(
        req.params.id,
        {membership_status: true},
        'Activate member',
        res
    )
}



exports.sendGroupEmail=(req, res)=>{
    res.send('ok')
}


