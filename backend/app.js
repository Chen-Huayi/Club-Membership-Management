const express=require('express')
const app=express()
const cors = require('cors')
const joi = require('joi')
const userRouter=require('./router/UserRouter')
const bodyParser = require("body-parser")
const config=require('./config')


// Cross-Origin Resource Sharing
app.use(cors())

// content-type interceptor
app.use(bodyParser.json())  // app.use(express.urlencoded({ extended: false }))

// Handle message middlewares (include both success and failure event)
app.use((req, res, next)=>{
    res.handleMessage= (err, status=1)=>{
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// Main router (Start here)
app.use('/api', userRouter);

// Errors middlewares
app.use((err, req, res, next)=>{
    if (err instanceof joi.ValidationError){  // Error caused by failed validation
        return res.handleMessage(err)
    }
    if (err.name === 'UnauthorizedError')  // Middleware error
        return res.handleMessage('Authorization Error!')
    res.handleMessage(err)  // Unknown error
})

// Listen at 8000 port
app.listen(config.PORT, (err)=>{
    if (err) console.log(err)
    console.log(`Server is running at http://localhost:${config.PORT}`)
})
