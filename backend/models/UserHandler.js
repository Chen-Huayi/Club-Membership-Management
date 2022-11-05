require('../db/server')
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
    // const user_id = 'C120106'
    // const user_role = 'Membership Admin'
    // const firstname = '泽炜'
    // const middle_name=''
    // const lastname = '盛'
    // const gender= 'Male'
    // const birthday= '2000/3/28'
    // const address_line1= '后坂新村'
    // const address_line2= ''
    // const address_line3= ''
    // const address_city= 'Fuzhou'
    // const address_country= 'China'
    // const address_postalcode= '350000'
    // const email = '919602906@qq.com'
    // const phone = '18846063519'
    // const password = '123456'
    const user_id = 'C120442'
    const user_role = 'Club Member'
    const firstname = '启航'
    const middle_name=''
    const lastname = '陈'
    const gender= 'Male'
    const birthday= '2000/4/16'
    const address_line1= '融侨-奥体园著'
    const address_line2= ''
    const address_line3= ''
    const address_city= 'Fuzhou'
    const address_country= 'China'
    const address_postalcode= '350000'
    const email = '1577878867@qq.com'
    const phone = '17720795991'
    const password = '123456'

    userModel.create(
        {
            user_id,
            user_role,
            firstname,
            middle_name,
            lastname,
            gender,
            birthday,
            address_line1,
            address_line2,
            address_line3,
            address_city,
            address_country,
            address_postalcode,
            email,
            phone,
            password,
        },
        (err)=>{
            if (!err)
                console.log(`Register [${user_role}: ${user_id}] successfully!`)
            else
                console.log(err)
        }
    )
    res.send('6')
}


exports.login=(req, res)=>{
    const user_id=req.body.user_id   // '919602906'
    const password=req.body.password   // '123456'

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

        const tokenStr=jwt.sign(
            rest,
            config.jwtSecretKey,
            {expiresIn: config.expiresIn}
        )

        res.send({
            status: 0,
            token: 'Bearer '+tokenStr
        })
    })

}

