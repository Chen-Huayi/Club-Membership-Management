const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/club_member')
    .then(()=>{
        console.log('Database is connected')
    })
    .catch((reason)=>{
        console.log('Fail to connect to MongoDB database')
        console.log(reason)
    })

// mongoose.connection.once('open', ()=>console.log('连接成功'))
