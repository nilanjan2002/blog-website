const mongoose = require('mongoose');
const articleRouter = require('express').Router();
const Article = require('../models/model');

async function main(){
    const db = await mongoose.connect('mongodb://localhost:27017/Demo');
}
main().catch(err=> console.log(err));

articleRouter.get('/new',(req,res)=>{
res.render('articles/new');
})

articleRouter.post('/',async (req,res)=>{
    const{title, description,genre } = req.body;
    const article = new Article({
        title : title ,
        description  : description ,
        genre   : genre,
        date: new Date().toLocaleDateString()
    })
    await article.save()
    res.redirect('/');
})


module.exports = articleRouter;