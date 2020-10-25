const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types //this line of code connects the posts model with the user model

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required:true
    },
    like:[{
        type: ObjectId,
        ref: 'User'
    }],
    photo:{
        type: String, 
        required: true
    },
    postedBy:{
        type: ObjectId,
        ref: 'User'
    }
})

mongoose.model('Post', postSchema)