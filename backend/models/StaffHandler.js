require('../db/server')
const mongoose = require('mongoose');
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const schema = require('../schema/staff')
const staffModel = mongoose.model('staffs', schema)  // Model (collections)


const getStaffById=async (user_id)=>{
    let staff=null
    try {
        const result=await staffModel.find({user_id})
        if (result.length!==0){
            staff=result[0]
        }
    } catch (err){
        throw Error(err)
    }
    return staff
}

const updateById = (res, id, update, msg) => {
    staffModel.findByIdAndUpdate(id, update, (err)=>{
        if (err){
            return res.handleMessage(err)
        } else{
            console.log(msg)
        }
    })
}


exports.staffRegister=(req, res)=>{
    staffModel.create(
        {
            user_id: '919602906',
            user_role: 'Membership Admin',
            firstname: '泽炜',
            lastname: '盛',
            email: '666@gmail.com',
            phone: '1234567890',
            password: '123456',
        },
        (err)=>{
            if (!err)
                console.log('插入staff成功')
            else
                console.log(err)
        }
    )
    res.send('6')
}



exports.staffLogin=(req, res)=>{
    const user_id=req.body.user_id   // '919602906'
    const password=req.body.password   // '123456'
    // res.send('ok')

    getStaffById(user_id).then(staff => {
        if (!staff)
            return res.handleMessage('Wrong User ID!')

        if (staff.password!==password){
            updateById(res, staff._id, {$inc: {fail_login_count: 1}}, 'Fail login count +1')
            return res.handleMessage('Wrong Password!')
        }

        console.log('登录成功')
        updateById(res, staff._id, {fail_login_count: 0}, 'Fail login count return 0')
        const staffObj = {...staff._doc, password:''}
        const {fail_login_count, __v, ...rest} = staffObj

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

