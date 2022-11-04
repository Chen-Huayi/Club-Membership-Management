const express=require('express')
const app=express()
const cors = require('cors')

const signupRouter=require('./router/SignUp')

app.use(cors())
app.use(express.json())

app.use("/api/signup", signupRouter);


app.listen(8000, ()=>{
    console.log('Server is running at http://localhost:8000')
})