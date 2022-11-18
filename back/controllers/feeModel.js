const config = require('../config')
const {feeModel}=require('../models')


exports.updateMembershipFee = (req, res)=>{
    feeModel.findOneAndUpdate({company: config.company}, {membership_fee: req.body.membership_fee}, (err)=>{
        if (err){
            res.handleMessage(err)
        }
        res.handleMessage('Membership fee updated!', 0)
    })
}

exports.getMembershipFee = async (req, res)=>{
    const result=await feeModel.findOne({company: config.company})

    res.send({
        membership_fee: result.membership_fee
    })
}

