const mongoose = require('mongoose')
const feeSchema = require('../schema/fee')
const feeModel = mongoose.model('fees', feeSchema)

exports.updateMembershipFee = (req, res)=>{
    feeModel.findOneAndUpdate({company: 'green_space_club'}, {membership_fee: req.body.membership_fee}, (err)=>{
        if (err){
            res.handleMessage(err)
        }
        res.handleMessage('Membership fee updated!', 0)
    })
}

exports.getMembershipFee = async (req, res)=>{
    const result=await feeModel.findOne({company: 'green_space_club'})

    res.send({
        membership_fee: result.membership_fee
    })
}

