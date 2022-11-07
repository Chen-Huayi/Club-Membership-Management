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
        const result=await userModel.find({user_id})
        if (result.length!==0){
            user=result[0]
        }
    } catch (err){
        throw Error(err)
    }
    return user
}


const updateById = (res, id, update, msg) => {
    userModel.findByIdAndUpdate(id, update, (err)=>{
        if (err){
            return res.handleMessage(err)
        } else{
            console.log(msg)
        }
    })
}


exports.signup=(req, res)=>{
    // delete agreement
    const {agreement, ...rest} = req.body
    // format birthday date
    const userInfo={...rest, birthday: new Date(req.body.birthday).toLocaleDateString()}

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

    getUserById(user_id).then(user => {
        if (!user)
            return res.handleMessage('Wrong User ID!')

        if (user.password!==password){
            updateById(res, user._id, {$inc: {fail_login_count: 1}}, `[${user_id}] Failure login count +1`)
            return res.handleMessage('Wrong Password!')
        }

        updateById(res, user._id, {fail_login_count: 0}, `[${user_id}] login successfully!`)
        const userObj = {...user._doc, password:''}
        const {fail_login_count, __v, ...rest} = userObj
        const {firstname, lastname}=rest

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
            lastname
        })
    })

}
