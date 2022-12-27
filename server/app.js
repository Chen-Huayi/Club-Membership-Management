const express = require('express')
const app = express()
const cors = require('cors')
const Joi = require('joi')
const {expressjwt: jwt} = require('express-jwt')
const bodyParser = require("body-parser")
const {port, jwtSecretKey} = require('./config')
const userRouter = require('./routers/userRouter')
const memberRouter = require('./routers/memberRouter')
const staffRouter = require('./routers/staffRouter')
const membershipRouter = require('./routers/membershipRouter')
const feeRouter = require('./routers/feeRouter')
const db = require('./db/mongo')


/* Cross-Origin Resource Sharing */
app.use(cors())

/* content-type interceptor */
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))

// Handle message middlewares (include both success and failure event)
app.use((req, res, next) => {
    res.handleMessage = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

/* Add authorization to routes but exclude that do not need to be verified (all paths start with "/api") */
app.use(jwt({secret: jwtSecretKey, algorithms: ['HS256']})
    .unless({path: [/^\/api\//, '/fee/get', '/member/pw/reset']}))

/* Main routes (Start here) */
app.use('/api', userRouter)
app.use('/member', memberRouter)
app.use('/staff', staffRouter)
app.use('/membership', membershipRouter)
app.use('/fee', feeRouter)

/*Middlewares errors*/
app.use((err, req, res, next) => {
    if (err instanceof Joi.ValidationError) {  // Error caused by failed validation
        return res.handleMessage(err)
    }
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 401,
            message: 'Authorization Error (Invalid token)'
        })
    }
    res.send({
        status: 500,
        message: 'Unknown error'   // Unknown error
    })
})

db.createConnection().then(() => {
    // Listen at default port: 12138
    app.listen(port, (err) => {
        if (err) {
            throw Error(err)
        } else {
            console.log(`Server is running at http://localhost:${port}`)
        }
    })
})
