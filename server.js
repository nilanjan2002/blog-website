const express = require('express');
const axios = require('axios');
const app = express();
const routes = require('./routes/articles')
require('dotenv').config();

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

app.use(express.urlencoded({extended:true}))

const getBlogImage = function(query){
    return `https://source.unsplash.com/featured/400x300/?${query}`
}



function truncateDesc(desription){
    const n=150;
    if(desription.length > n){
        return desription.substring(0,n) + '...';
    }
    return desription;
}

async function getImages(){
    const images = articles.map(article => getBlogImage(article.genre));
    return await Promise.all(images)
}


  var articles = [
    {
      title: 'The Art of Programming',
      desc:
        'In this in-depth exploration, we delve into the beauty and complexity of coding. From designing elegant algorithms to optimizing data structures, we\'ll uncover the secrets of writing efficient and maintainable code that powers our digital world.',
      genre: 'Technology',
      date: getRandomDate(),
      image: getBlogImage('programming')
    },
    {
      title: 'Healthy Eating Habits',
      desc:
        'Join us on a journey to discover the keys to a healthier lifestyle. In this comprehensive guide, we provide tips, tricks, and expert advice on maintaining a nutritious diet, making informed food choices, and achieving your wellness goals. Explore the world of balanced nutrition and sustainable health practices.',
      genre: 'Health & Wellness',
      date: getRandomDate(),
      image: getBlogImage('healthy+eating')
    },
    {
      title: 'The Art of Photography',
      desc:
        'Capture the beauty of the world through the lens of a camera. Our photography articles cover everything from mastering composition and harnessing the power of light to advanced post-processing techniques. Learn how to transform ordinary moments into extraordinary visual stories that leave a lasting impression.',
      genre: 'Photography',
      date: getRandomDate(),
      image: getBlogImage('photography')
    },
    {
      title: 'Innovation in Space Exploration',
      desc:
        'Explore the latest breakthroughs in the world of space science and technology. From Mars rovers and asteroid missions to the search for habitable exoplanets, we delve into the mysteries of the cosmos and the incredible achievements of human space exploration. Join us on a cosmic journey of discovery and wonder.',
      genre: 'Science',
      date: getRandomDate(),
      image: getBlogImage('space')
    },
  ];
  

app.set('view engine','ejs');

app.get('/',async (req,res)=>{
    const images = await getImages();
    console.log(images);
    articles = articles.map((article,index)=>{
        return {
            ...article, image: images[index]
        }
    })
      
    res.render('articles/index', {articles:articles, fn:truncateDesc});
});

app.use('/articles', routes);


app.listen(3000, ()=>{
    console.log('`Server` is running');
})