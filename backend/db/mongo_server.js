// macOS start command:
// mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork
const mongoose = require('mongoose')
const config = require('../config')
const feeSchema = require("../schema/fee")
const feeModel = mongoose.model('fees', feeSchema)

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
                }
            }
        })
    })
    .catch((reason)=>{
        console.log('Fail to connect to MongoDB database: ', reason)
    })
