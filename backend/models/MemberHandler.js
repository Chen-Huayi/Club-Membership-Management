require('../db/server')
const mongoose = require('mongoose');
const userSchema = require('../schema/user')
const userModel = mongoose.model('users', userSchema)


const getUserByRole=async (user_role)=>{
    let members=null
    try {
        members=await userModel.find({user_role})
    } catch (err){
        throw Error(err)
    }
    return members
}


exports.viewMemberList=(req, res)=>{
    getUserByRole('Club Member').then(list=>{
        res.send({
            member_list: list
        })
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

exports.displayProfile=(req, res)=>{
    res.send('ok')
}
