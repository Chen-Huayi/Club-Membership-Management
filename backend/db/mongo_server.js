// macOS start command:
// mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork
const mongoose = require('mongoose')
const config = require('../config')
const feeSchema = require("../schema/fee")
const staffSchema = require('../schema/staff')
const feeModel = mongoose.model('fees', feeSchema)
const staffModel = mongoose.model('staffs', staffSchema)

mongoose.connect(config.dbServer)
    .then(()=>{
        console.log('Database is connected...')

        feeModel.count({company: 'green_space_club'}, (err, result)=> {
            if (err) {
                console.log('Failed: ',err)
            }else {
                if (result === 0) {  // Initialize default values if this company name doesn't exist
                    feeModel.create({company: 'green_space_club', membership_fee: 648}, (err) => {
                        if (err)
                            console.log('Failed: ',err)
                        else
                            console.log('Register company basic information successfully!')
                    })


                    const userInfo= {
                        staff_id: 'sys-admin',
                        user_role: 'System Admin',
                        firstname: 'Zhijie',
                        lastname: 'Zheng',
                        email: 'zzj@qq.com',
                        phone: '204-666-6666',
                        password: '666666',
                        membership_status: true
                    }
                    const staff_id=userInfo.staff_id
                    const user_role=userInfo.user_role

                    staffModel.count({staff_id}, (err, result)=> {
                        if (err) {
                            console.log(err)
                        }
                        if (result > 0) {  // Already exist this staff id
                            console.log('Staff ID is occupied!')
                        } else {
                            staffModel.create(userInfo, (err) => {
                                if (err) {
                                    console.log(err)
                                }else {
                                    console.log(`Insert [${user_role}: ${staff_id}] successfully!`)  // insert to the database successfully
                                }
                            })
                        }
                    })





                }
            }
        })
    })
    .catch((reason)=>{
        console.log('Fail to connect to MongoDB database: ', reason)
    })
