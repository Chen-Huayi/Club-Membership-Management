const express=require('express')
const app=express()
const cors = require('cors')
const joi = require('joi')
const userRouter=require('./router/UserRouter')
const memberRouter=require('./router/MemberRouter')

app.use(cors())
// app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use((req, res, next)=>{
    res.handleMessage= (err, status=1)=>{
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

app.use('/api', userRouter);
app.use('/api/member', memberRouter);

app.use((err, req, res, next)=>{
    if (err instanceof joi.ValidationError){  // Error caused by failed validation
        return res.handleMessage(err)
    }
    if (err.name === 'UnauthorizedError')  // Middleware error
        return res.handleMessage('Authorization Error!')
    res.handleMessage(err)  // Unknown error
})

app.listen(8000, ()=>{
    console.log('Server is running at http://localhost:8000')
})
