const express = require('express');
const { fetchUsers } = require('../services/getUsers');
const loginRouter = express.Router();


loginRouter.post('/', async (req,res)=>{
    const { email, password } = req.body;
    const { data: USERS } = await fetchUsers();
    const isUser = USERS.find((user) => user.email === email && user.password == password);
  
    if (isUser) {
      res.cookie('email', email);
      res.cookie('password', password);
      return res.redirect('/');
    } else {
      res.render('403');
    }
})


module.exports = loginRouter;