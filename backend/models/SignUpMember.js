require('../db/server')
const mongoose = require('mongoose');
const schema=require('../schema/member')
const memberModel=mongoose.model('members', schema)  // Model (collections)

exports.addMember=(req, res)=>{
    memberModel.create(
        {
            member_id: 1,
            firstname: 'Qihang',
            middle_name: '',
            lastname: 'Chen',
            gender: 'Male',
            birthday: '2000/04/16',
            address_line1: '融侨-奥体园著',
            address_line2: '',
            address_line3: '',
            address_city: 'Fuzhou',
            address_country: 'China',
            address_postalcode: '350000',
            email: 'sail.chen@outlook.com',
            phone: '17720795991',
            registered_date: new Date().toLocaleDateString(),  // The date the user is registered
            effective_date: new Date().toLocaleDateString(),  // The membership becomes effective for the current or last period
            expire_date: '2023/11/4',  // The membership expires after this date
            membership_status: false
        },
        (err)=>{if (!err) console.log('插入成功'); else console.log(err)}
    )
    res.send('ok')
}

exports.getMember=(req, res)=>{

    res.send('ok')
}
