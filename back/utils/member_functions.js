// Format date to YYYY/MM/DD
const formatDate = (date) => {
    return date.getFullYear() +'/'+ (date.getMonth()+1).toString().padStart(2, '0')+'/'+ date.getDate().toString().padStart(2, '0')
}


exports.getUserById = async (memberModel, member_id)=>{
    let member=null
    try {
        member=await memberModel.findOne({member_id})
    } catch (err){
        throw Error(err)
    }
    return member
}

exports.formatDateString = (date)=>{
    return formatDate(date)
}

exports.calculateDates = (member)=>{
    let newExpireDate
    let effectiveDate
    const prevExpireDate=new Date(member.expire_date)

    if (prevExpireDate>new Date()){  // member.expire_date is not expire today(失效日期还没到)
        // expire_date: previous expire date +1 year
        newExpireDate = prevExpireDate
        newExpireDate.setFullYear(newExpireDate.getFullYear()+1)
        // effectIve_date no change
        effectiveDate=new Date(member.effective_date)
    }else {  // membership is expired
        // expire_date: today + 1 year
        newExpireDate = new Date()
        newExpireDate.setFullYear(newExpireDate.getFullYear()+1)
        // effectIve_date: today
        effectiveDate=new Date()
    }
    const expire_date = formatDate(newExpireDate)
    const effective_date = formatDate(effectiveDate)

    return {expire_date, effective_date}
}

