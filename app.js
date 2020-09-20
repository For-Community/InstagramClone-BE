const express = require('express')
const app =express()
const PORT = 5000

//Custom Middleware
const CustomMiddleware = (req,res,next)=>{
    console.log("Middleware Executed")
    next()
}

app.use(CustomMiddleware)

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.listen(PORT,()=>{
    console.log("Server is running on:", PORT)
})
