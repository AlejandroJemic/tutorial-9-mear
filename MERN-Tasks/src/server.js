//servidor node express

//const express= require('express');
import express from 'express'
import morgan from 'morgan'
import path  from 'path'
const app = express();
import mongoose from './database' //nn-8 importo la db

class Server{
    constructor(){
        this.setPort()
        this.setMiddles()
        this.setRoutes()
        this.servStatics()
        this.StartServer()
    }
    setPort(){
        //setings
        app.set('port', process.env.PORT || 3000) //nn- 1 puerto del sistema o 3000
    }
    setMiddles(){
        //middlewares
        app.use(morgan('dev')); //nn- 2 para log de peticiones por consola
        app.use(express.json()); //nn- 3 cada peticion sera resivida y enviada como json data
    }
    setRoutes(){
        // routes
        //nn- 5 requiero el archivo de rutas para definir la api
        // tdoas lals rutas estaran en api/task
        app.use('/api/task', require('./Routes/task.routes.js'))
    }

    servStatics(){
        // statics files
        //nn- 6 sirvo los archivos staticos public index.html
        // path.join(__dirname , 'public');//para multiplataforma
        app.use(express.static(path.join(__dirname , 'public')));
    }

    StartServer(){
        // server start
        app.listen(app.get('port'),
        ()=> console.log("start  at " + app.get('port')));
    }
}

new Server();