const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.send("Hello")
})

//SignUp Route
router.post('/signup',(req,res)=>{
    const {name, email, password} = req.body
    if(!email || !password || !name){
        return res.status(422).json({error:"Please add all the fields"})
    }
    res.json({message:"Successfully Posted!"})
})

module.exports = router