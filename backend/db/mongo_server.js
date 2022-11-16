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

        // Initialize
        feeModel.count({company: config.company}, (err, result)=> {
            if (err) {
                console.log('Failed: ',err)
            }else if (result === 0) {  // Initialize default values if this company name doesn't exist
                feeModel.create({company: config.company, membership_fee: config.membership_fee}, (err) => {
                    if (err)
                        console.log('Failed: ',err)
                    else
                        console.log('Register company basic information successfully!')
                })

                // Add system admin staff to the database
                const userInfo=config.sysAdmin
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
                }) // end add system admin
            }
        })

        // initialize done

    })
    .catch((reason)=>{
        console.log('Fail to connect to MongoDB database: ', reason)
    })
