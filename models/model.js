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
        default: ()=> Date.now().toLocaleDateString()
    },
    image:{
        type: String,
        default:''
    }
})

articleSchema.pre('save', function(next){
    if(!this.image){
        this.image = `https://source.unsplash.com/featured/400x300/?${this.genre}`
    }
    next();
} )

module.exports =  mongoose.model('Article',articleSchema);