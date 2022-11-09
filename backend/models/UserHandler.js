require('../db/mongo_server')
const mongoose = require('mongoose');
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const userSchema = require('../schema/user')
const userModel = mongoose.model('users', userSchema)


const getUserById=async (user_id)=>{
    let user=null
    try {
        user=await userModel.findOne({user_id})
    } catch (err){
        throw Error(err)
    }
    return user
}

const updateByObjId = (res, id, update, msg) => {
    userModel.findByIdAndUpdate(id, update, (err)=>{
        if (err){
            return res.handleMessage(err)
        } else{
            console.log(msg)
        }
    })
}


exports.signup=(req, res)=>{
    const {agreement, ...rest} = req.body  // delete agreement
    const userInfo={...rest, birthday: new Date(req.body.birthday).toLocaleDateString()}  // format birthday date

    userModel.count({user_id: userInfo.user_id}, (err, result)=>{
        if (err){
            return res.handleMessage(err)
        }
        if (result>0){  // Already exist this user id
            return res.handleMessage('User ID is occupied!')
        } else {
            userModel.create({...userInfo}, (err)=>{
                if (err){
                    return res.handleMessage(err)
                }
                // insert to the database successfully
                console.log(`Insert [${userInfo.user_role}: ${userInfo.user_id}] successfully!`)
                res.handleMessage('Register successfully!', 0)
            })
        }
    })

}

exports.login=(req, res)=>{
    const userInfo=req.body
    const user_id=userInfo.user_id
    const password=userInfo.password

    getUserById(user_id)
        .then(user => {
            if (!user)
                return res.handleMessage('Wrong User ID!')

            if (user.password!==password){
                updateByObjId(res, user._id, {$inc: {fail_login_count: 1}}, `[${user_id}] Failure login count +1`)
                return res.handleMessage('Wrong Password!')
            }

            updateByObjId(res, user._id, {fail_login_count: 0}, `[${user_id}] login successfully!`)
            const userObj = {...user._doc, password:''}
            const {fail_login_count, __v, ...rest} = userObj
            const {firstname, lastname, user_role, membership_status}=rest

            const tokenStr=jwt.sign(
                rest,
                config.jwtSecretKey,
                {expiresIn: config.expiresIn}
            )

            res.send({
                status: 0,
                token: 'Bearer '+tokenStr,
                user_id,
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


exports.getMemberList = (req, res)=>{
    const members =  userModel.find({user_role: 'Club Member'})

    res.send({
        member_list: members
    })
}

exports.getProfile= (req, res)=>{
    const user_id=req.body.user_id

    getUserById(user_id)
        .then(user=>{
            if (!user){
                return res.handleMessage('User does not exist!')
            }
            const {firstname, middle_name, lastname, gender, address_line1, address_line2,
                address_line3, address_city, address_country, address_postalcode, email, phone}=user

            res.send({
                firstname, middle_name, lastname, gender, address_line1, address_line2,
                address_line3, address_city, address_country, address_postalcode, email, phone
            })
        })
        .catch(err => {
            throw Error(err)
        })
}

exports.updateUserProfile = (req, res)=>{
    const user_id=req.body.user_id
    const data=req.body
    const userInfo={...data, birthday: new Date(req.body.birthday).toLocaleDateString()}

    getUserById(user_id)
        .then(user=>{
            if (!user){
                return res.handleMessage('User does not exist!')
            }
            updateByObjId(res, user._id, {$set: {...userInfo}}, 'Profile Updated!')
            res.handleMessage('Profile Updated!', 0)
        })
        .catch(err => {
            throw Error(err)
        })
}

exports.updatePassword = (req, res)=>{
    const user_id=req.body.user_id
    const oldPassword=req.body.oldPassword
    const newPassword=req.body.newPassword

    getUserById(user_id)
        .then(user=>{
            if (!user){
                return res.handleMessage('User does not exist!')
            }
            if (oldPassword!==user.password){
                return res.handleMessage('The old password is wrong!')
            }
            if (oldPassword===newPassword){
                return res.handleMessage('The old password and new password are same!')
            }
            updateByObjId(res, user._id, {$set: {password: newPassword}}, 'Password changed!')
            res.handleMessage('Password changed!', 0)
        })
        .catch(err => {
            throw Error(err)
        })
}

exports.updateInfo=(req, res)=>{
    res.send('ok')
}

exports.removeMember=(req, res)=>{
    res.send('ok')
}

exports.sendGroupEmail=(req, res)=>{
    res.send('ok')
}


