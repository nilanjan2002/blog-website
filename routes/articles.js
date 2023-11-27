const mongoose = require('mongoose');
const articleRouter = require('express').Router();
const Article = require('../models/model');
articleRouter.use(require('method-override')('_method'))

async function main(){
    await mongoose.connect('mongodb://localhost:27017/test',{'useUnifiedTopology': true},{'useNewUrlParser': true});
}
main().catch(err=> console.log(err));

articleRouter.get('/new',(req,res)=>{
res.render('articles/new', {article: new Article().toObject()});
})

articleRouter.get('/:id', async (req, res) => {
    try {
      const result = await Article.findById(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'Article not found' });
      }
      res.render('articles/read_more.ejs',{article:result});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  articleRouter.delete('/:id', async(req,res)=>{
    console.log('delete route hit')
    try {
      await Article.deleteOne({_id:req.params.id});
      res.redirect('/');
    } catch (error) {
      alert('Couldn\'t delete the requested article');
      res.redirect('/');
    }
  })
      
  

articleRouter.post('/',async (req,res)=>{
    const{title, description,genre } = req.body;
    const article = new Article({
        title : title ,
        description  : description ,
        genre   : genre,
        date: new Date().toLocaleDateString()
    })
    try {
        const articleID = await article.save()
        console.log(articleID)
        res.redirect(`articles/${articleID._id}`);
    } catch (error) {
        res.render('articles/new',{ article:article.toObject()})
    }
    // res.redirect('/');
})




module.exports = articleRouter;