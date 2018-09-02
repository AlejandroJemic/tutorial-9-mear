//servidor node express

const express= require('express');
const morgan= require('morgan');
const path = require('path');
const app = express();
var {mongoose} = require('./database'); //nn-8 importo la db

//setings
app.set('port', process.env.PORT || 3000) //nn- 1 puerto del sistema o 3000

//middlewares
app.use(morgan('dev')); //nn- 2 para log de peticiones por consola
app.use(express.json()); //nn- 3 cada peticion sera resivida y enviada como json data

// routes
//nn- 5 requiero el archivo de rutas para definir la api
// tdoas lals rutas estaran en api/task
app.use('/api/task', require('./Routes/task.routes.js'))

// statics files
//nn- 6 sirvo los archivos staticos public index.html
// path.join(__dirname , 'public');//para multiplataforma
app.use(express.static(path.join(__dirname , 'public')));
// server start
app.listen(app.get('port'),
    ()=> console.log("start  at " + app.get('port')));

