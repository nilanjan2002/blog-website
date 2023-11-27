const axios = require('axios');

const fetchUsers = ()=> axios.get('http://localhost:3000/users')
.then(users => users)
.catch(err => console.log(err))


module.exports = {fetchUsers}