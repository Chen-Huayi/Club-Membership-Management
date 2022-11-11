// macOS start command:
// mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork
const mongoose = require('mongoose')
const config=require('../config')

mongoose.connect(config.dbServer).then(()=>{
    console.log('Database is connected')
}).catch((reason)=>{
    console.log('Fail to connect to MongoDB database')
    console.log(reason)
})
