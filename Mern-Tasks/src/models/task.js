const mongoose = require('mongoose');
const { Schema } = mongoose;

//nn- 9 defino el tipo de dato del las tareas 
const TaskSchema = new Schema({
title: {type: String, required: true}, 
description: {type: String, required: true}
});

module.exports = mongoose.model('task', TaskSchema) //creo un modelo para usar en el resto de la pp
