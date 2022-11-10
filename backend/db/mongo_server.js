const mongoose = require('mongoose');

// macOS
// mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork

mongoose.connect('mongodb://localhost:27017/club_member')
    .then(()=>{
        console.log('Database is connected')
    })
    .catch((reason)=>{
        console.log('Fail to connect to MongoDB database')
        console.log(reason)
    })
