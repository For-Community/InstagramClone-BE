const express = require('express')
const app =express()
const mongoose = require('mongoose')
const PORT = 5000
const {MONGOURI} = require('./Keys')


mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify:false
})
mongoose.connection.on('connected',()=> {
    console.log("Connected to MongoDB")
})

mongoose.connection.on('error',(err)=> {
    console.log("Error Connecting", err)
})

// Registering Models
require('./models/user')
require('./models/post')

//Express server never automatically parses json requests, so for that we need to do the following.
app.use(express.json())

// Registering Routes 
app.use(require('./routes/auth'))
app.use(require('./routes/post'))



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
