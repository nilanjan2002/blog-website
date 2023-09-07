const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required :false
    },
    genre:{
        type: String ,  
        required:true,
        enum: ['Science','Technology', 'Health','Photography']
    },
    date:{
        type:Date,
        default: ()=> Date.now()
    }
})

module.exports =  mongoose.model('Article',articleSchema);