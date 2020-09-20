const express = require('express')
const app =express()
const mongoose = require('mongoose')
const PORT = 5000
const {MONGOURI} = require('./Keys')

require('./models/user')

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=> {
    console.log("Connected to MongoDB")
})

mongoose.connection.on('error',(err)=> {
    console.log("Error Connecting", err)
})


//Custom Middleware: This will be called first before any of the call routes is being called.
// const CustomMiddleware = (req,res,next)=>{
//     console.log("Middleware Executed")
//     next()
// }

// app.use(CustomMiddleware)

// app.get('/',(req,res)=>{
//     console.log("Home")
//     res.send("hello world")
// })


//If you want to add a middleware to a specific route
// app.get('/about',CustomMiddleware,(req,res)=>{
//     console.log("About")
//     res.send("About Page")
// })
 
app.listen(PORT,()=>{
    console.log("Server is running on:", PORT)
})
