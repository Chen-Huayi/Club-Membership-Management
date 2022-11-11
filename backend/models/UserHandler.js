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

const updateInfo=(user_id, update, operation, res)=>{
    getUserById(user_id)
        .then(user=>{
            if (!user){
                return res.handleMessage('User does not exist!')
            }
            updateByObjId(res, user._id, {$set: update}, `${operation} successfully!`)
            res.handleMessage(`${operation} successfully!`, 0)
        })
        .catch(err => {
            throw Error(err)
        })
}


/*---------------for public (user without login)-------------------*/
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

            // TODO password 加密
            if (user.password!==password){
                updateByObjId(res, user._id, {$inc: {fail_login_count: 1}}, `[${user_id}] Failure login count +1`)
                return res.handleMessage('Wrong Password!')
            }

            updateByObjId(res, user._id, {fail_login_count: 0}, `[${user_id}] login successfully!`)
            const userObj = {...user._doc, password:''}
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



/*------------ for only after user login into account------------*/
exports.getMemberList = async (req, res)=>{
    const members = await userModel.find({
        user_role: 'Club Member',
        is_available: true
    })

    res.send({
        member_list: members
    })
}

exports.getProfile= (req, res)=>{
    const user_id=req.params.id

    getUserById(user_id)
        .then(user=>{
            if (!user){
                return res.handleMessage('User does not exist!')
            }
            const {
                user_id, firstname, middle_name, lastname, gender, birthday, address_line1,
                address_line2, address_line3, address_city, address_country, address_postalcode,
                email, phone, registered_date, effective_date, expire_date, membership_status
            } = user

            res.send({
                user_id, firstname, middle_name, lastname, gender, birthday, address_line1,
                address_line2, address_line3, address_city, address_country, address_postalcode,
                email, phone, registered_date, effective_date, expire_date, membership_status
            })
        })
        .catch(err => {
            throw Error(err)
        })
}

exports.updateInfoByMember=(req, res)=>{
    let {user_id, attribute, value}=req.body

    updateInfo(
        user_id,
        attribute==='birthday' ? {birthday: new Date(value.birthday).toLocaleDateString()} : value,
        `Update ${attribute}`,
        res
    )
}

exports.updateInfoByAdmin = (req, res)=>{
    updateInfo(
        req.body.user_id,
        {...req.body, birthday: new Date(req.body.birthday).toLocaleDateString()},
        'Update profile',
        res
    )
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

exports.removeMember= (req, res)=>{
    updateInfo(
        req.params.id,
        {is_available: false},
        'Delete',
        res
    )
}

exports.sendGroupEmail=(req, res)=>{
    res.send('ok')
}


