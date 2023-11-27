const express = require('express');
const axios = require('axios');
const app = express();
const methodOverride = require('method-override');
const routes = require('./routes/articles')
const dbArticles = require('./models/model')
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const {fetchUsers} = require('./services/getUsers')
const loginRouter = require('./routes/login');
var cookieParser = require('cookie-parser')
app.use(cookieParser())



const getRandomDate = () => {
    const randomDate = new Date(
      new Date().getTime() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000 // Random date within the last 30 days
    );
    return randomDate.toLocaleDateString();
  };

  const clientId = process.env.ACCESS_KEY;
  

// function getBlogImage(keyword){
  //     const unsplashApi = `https://api.unsplash.com/photos/random?count=1&query=${keyword}&client_id=${clientId}`
  //     return axios.get(unsplashApi)
  //     .then(res => res.data)
  //     .catch(err => console.log(err));
  // }
app.set('view engine','ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}))
app.use('/login', loginRouter)

// const getBlogImage = function(query){
//     return `https://source.unsplash.com/featured/400x300/?${query}`
// }


const isAuthenticated = async (req, res, next) => {
  const email = req.cookies?.email;
  const password = req.cookies?.password;
  console.log('cookies',req.cookies)
  console.log(email, password)

  if (email && password) {
    const { data: USERS } = await fetchUsers();
    const isUser = USERS.find((user) => user.email === String(email) && user.password == password);

    if (isUser) {
      return next();
    }
  }

  res.redirect('/login');
};







function truncateDesc(description){
    const n=150;
    if(description.length > n){
        return description.substring(0,n) + '...';
    }
    return description;
}

async function getImages(){
    const images = articles.map(article => getBlogImage(article.genre));
    return await Promise.all(images)
}




app.get('/', isAuthenticated ,async (req,res)=>{
    // const images = await getImages();
    articles = await dbArticles.find()
    articles = articles.map(({_doc})=> {
      return {
        ..._doc, date:_doc.date.toLocaleDateString()
      }
    })      
    res.render('articles/index', {articles:articles, fn:truncateDesc});
});

app.use('/login',(req,res)=>{
  res.render('login')
})

app.use('/articles', routes);

app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}...`);
})