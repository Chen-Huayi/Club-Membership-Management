const {memberModel, membershipModel}=require('../schema/index')

const getUserById =async (member_id)=>{
    let member=null
    try {
        member=await memberModel.findOne({member_id})
    } catch (err){
        throw Error(err)
    }
    return member
}

const formatDateString = (date)=>{
    return date.getFullYear() +'/'+ (date.getMonth()+1).toString().padStart(2, '0')+'/'+ (date.getDate()+1).toString().padStart(2, '0')
}


exports.membershipActivateRecord= async (req, res)=>{
    const approved_by=req.body.approved_by
    const member_id=req.body.member_id
    const member=await getUserById(member_id)

    if (!member){
        return res.handleMessage('Wrong Member ID!')
    }

    let newExpireDate
    let effectiveDate
    const prevExpireDate=new Date(member.expire_date)

    if (prevExpireDate>new Date()){  // member.expire_date is not expire today(失效日期还没到)
        newExpireDate = prevExpireDate
        newExpireDate.setFullYear(newExpireDate.getFullYear()+1)
        effectiveDate=new Date(member.effective_date)
    }else {  // membership is expire
        newExpireDate = new Date()
        newExpireDate.setFullYear(newExpireDate.getFullYear()+1)
        effectiveDate=new Date()
    }

    const expire_date = formatDateString(newExpireDate)
    const effective_date = formatDateString(effectiveDate)

    await membershipModel.create({
        member_id,
        effective_date,
        expire_date,
        payment_date: formatDateString(new Date()),
        approved_by,
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
    const approved_by=req.body.approved_by
    const member_id=req.body.member_id
    const member=await getUserById(member_id)

    if (!member){
        return res.handleMessage('Wrong Member ID!')
    }

    await membershipModel.create({
        member_id,
        effective_date: formatDateString(new Date(member.effective_date)),
        expire_date: formatDateString(new Date()),
        payment_date: formatDateString(new Date()),
        approved_by,
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
    const range=req.params.range
    const start=formatDateString(new Date(range.split(' ')[0]))
    const end=formatDateString(new Date(range.split(' ')[1]))

    const records=await memberModel.find({
        registered_date: {$gte: start, $lte: end}
    })
    res.send({
        status: 0,
        record_list: records
    })
}

exports.getExpiredList=async (req, res)=> {
    const range=req.params.range
    const start=formatDateString(new Date(range.split(' ')[0]))
    const end=formatDateString(new Date(range.split(' ')[1]))

    const records=await memberModel.find({
        expire_date: {$gte: start, $lte: end}
    })
    res.send({
        status: 0,
        record_list: records
    })
}

exports.getRenewedList=async (req, res)=> {
    const range=req.params.range
    const start=formatDateString(new Date(range.split(' ')[0]))
    const end=formatDateString(new Date(range.split(' ')[1]))

    const records=await memberModel.find({
        recent_renewal_date: {$gte: start, $lte: end}
    })
    res.send({
        status: 0,
        record_list: records
    })
}



