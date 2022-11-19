const {memberModel, membershipModel}=require('../models')
const {getUserById, formatDateString, calculateDates}=require('../utils/member_functions')


const formatDate = (range) => {
    const start=formatDateString(new Date(range.split(' ')[0]))
    const end=formatDateString(new Date(range.split(' ')[1]))
    return {start, end}
}


exports.membershipActivateRecord= async (req, res)=>{
    const member_id=req.body.member_id
    const member=await getUserById(memberModel, member_id)

    if (!member){
        return res.handleMessage('Wrong Member ID!')
    }
    const {expire_date, effective_date} = calculateDates(member)

    await membershipModel.create({
        member_id,
        effective_date,
        expire_date,
        payment_date: formatDateString(new Date()),
        approved_by: req.body.approved_by,
    }, (err) => {
        if (err) {
            console.log(err)
            return res.handleMessage(err)
        } else {
            console.log('Record added!')
            res.handleMessage('Record added!', 0)
        }
    })

}

exports.membershipDeactivateRecord= async (req, res)=>{
    const member_id=req.body.member_id
    const member=await getUserById(memberModel, member_id)

    if (!member){
        return res.handleMessage('Wrong Member ID!')
    }

    await membershipModel.create({
        member_id,
        effective_date: formatDateString(new Date(member.effective_date)),
        expire_date: formatDateString(new Date()),
        payment_date: formatDateString(new Date()),
        approved_by: req.body.approved_by,
    }, (err) => {
        if (err) {
            console.log(err)
            return res.handleMessage(err)
        } else {
            console.log('Deactivate!')
            res.handleMessage('Deactivate!', 0)
        }
    })

}

exports.getMembershipAudit=async (req, res)=>{
    const records=await membershipModel.find({})
    res.send({
        status: 0,
        record_list: records
    })
}




exports.getNewRegisteredList= async (req, res)=> {
    const {start, end}=formatDate(req.params.range)
    const records=await memberModel.find({
        registered_date: {$gte: start, $lte: end}
    })

    res.send({
        status: 0,
        record_list: records
    })
}

exports.getExpiredList=async (req, res)=> {
    const {start, end}=formatDate(req.params.range)
    const records=await memberModel.find({
        expire_date: {$gte: start, $lte: end}
    })

    res.send({
        status: 0,
        record_list: records
    })
}

exports.getRenewedList=async (req, res)=> {
    const {start, end}=formatDate(req.params.range)
    const records=await memberModel.find({
        recent_renewal_date: {$gte: start, $lte: end}
    })

    res.send({
        status: 0,
        record_list: records
    })
}
