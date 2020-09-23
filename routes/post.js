const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const auth = require('../middleware/auth')
const Post = mongoose.model('Post')

router.get('/allposts', (req,res)=>{
    Post.find()
    .populate('postedBy', '_id name')
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost', auth, (req,res)=>{
    const{title, body} = req.body
    if(!title || !body){
        return res.status(422).json({error:"Please add all the fields"})
    }

    req.user.password = undefined
    const post = new Post({
        title,
        body,
        postedBy : req.user
    })

    post.save()
    .then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

//Route to find posts made by the logged in User(if any)
router.get('/mypost', auth, (req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate('PostedBy','_id name')
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router