//nn- 7 creo conect a bbdd
var mongoose = require('mongoose');
const URI = 'mongodb://localhost:/MERN-TASKS'
mongoose.connect(URI)
.then(db => console.log('db conected'))
.catch(err => console.error(err));


module.exports = mongoose