require('../db/server')
const mongoose = require('mongoose');
const userSchema = require('../schema/user')
const userModel = mongoose.model('users', userSchema)



exports.viewMemberList=async (req, res)=>{
    const user_role=req.body.user_role
    const members=await userModel.find({user_role})
    res.send({
        member_list: members
    })
}

exports.displayProfile=async (req, res)=>{
    const user_id=req.body.user_id
    const profile=await userModel.findOne({user_id})
    res.send(profile)
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


