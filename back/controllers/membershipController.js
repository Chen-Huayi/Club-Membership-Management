const {memberModel, membershipModel}=require('../models')
const {getUserById, formatDateString, calculateDates}=require('../utils/member_functions')


/* Format daytime array to two "YYYY-MM-DD" string */
const formatDate = (range) => {
    const start=formatDateString(new Date(range.split(' ')[0]))
    const end=formatDateString(new Date(range.split(' ')[1]))
    return {start, end}
}


/* Record all activating membership operations with (member_id, effective_date, expire_date, payment_date, approved_by) */
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

/* Record all deactivating membership operations with (member_id, effective_date, expire_date, payment_date, approved_by) */
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

/* Get all audit histories */
exports.getMembershipAudit=async (req, res)=>{
    const records=await membershipModel.find({})
    res.send({
        status: 0,
        record_list: records
    })
}


/* Get member lists in terms of new registered, expire, and recent renewal */
/* Filter these dates by compare formatted date strings (YYYY-MM-DD) */
/* Search range by greater than or equal to, and less than or equal to */

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
