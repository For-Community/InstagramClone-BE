const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model('Post')

router.get('/allpost', requireLogin, (req,res)=>{
    Post.find()
    .populate('postedBy', '_id name')
    .populate('comment.postedBy', '_id name')
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost', requireLogin, (req,res)=>{
    const{title, body, pic} = req.body
    console.log(title, body, pic)
    if(!title || !body ||!pic){
        return res.status(422).json({error:"Please add all the fields"})
    }

    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo: pic,
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
router.get('/mypost', requireLogin, (req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate('PostedBy','_id name')
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

// route to like posts
router.put('/like', requireLogin, (req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{  //the postId will be sent from the front end
        $push:{like:req.user._id} //This will push the user ids to the likes array
    },{
        new:true //This statement will tell MongoDB to always send an updated record of the likes array
    }).exec((err, result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})

// route to unlike posts
router.put('/unlike', requireLogin, (req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{  //the postId will be sent from the front end
        $pull:{like:req.user._id} //This will push the user ids to the likes array
    },{
        new:true //This statement will tell MongoDB to always send an updated record of the likes array
    }).exec((err, result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})

//Comment Route
router.put('/comment', requireLogin, (req,res)=>{
    const comments = {
        text: req.body.text,
        postedBy : req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{  //the postId will be sent from the front end
        $push:{comment:comments} //This will push the user ids to the likes array
    },{
        new:true //This statement will tell MongoDB to always send an updated record of the likes array
    })
    .populate("comment.postedBy","_id name") //this populate line of code is used to get the name of the user who posted that particular post not just the id.
    .populate("postedBy","_id name") //this populate line of code is used to get the name of the user who posted that particular post not just the id.
    .exec((err, result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})


module.exports = router