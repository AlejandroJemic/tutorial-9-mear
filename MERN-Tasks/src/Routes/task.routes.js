//nn- 4 defino el manejador del rouying del servidor
const express= require('express');
const router = express.Router();

var Task = require('../models/task');//nn-10 importo el modelo

// rutas
router.get('/', async (req,res)=> {
    const tasks = await Task.find()//nn-11  consulta ddbb y espero la tarea asincrona
    res.json(tasks)
});

//nn- 12 agergo el routes para resivir datos y guardar la tarea en bbdd
router.post('/', async (req,res)=> {
    //console.log(req.body);
    const {title,  description} = req.body;
    const task = new Task ( {title,  description});
    await task.save()
    res.json({APIstatus: 'task saved'})
});

//nn- 15 agrego la ruta para obterner tarea por id
router.get('/:id', async (req,res) => {
    console.log(req.params.id);
    const task= await Task.findById(req.params.id);
    res.json(task)
});

//nn- 13 agrego la ruta para actualizar una tarea
router.put('/:id', async (req,res) => {
    console.log(req.params.id);
    const {title,  description} = req.body;
    const newTask = {title,  description};
    await Task.findByIdAndUpdate(req.params.id, newTask );
    res.json({APIstatus: 'task updated'})
});
//nn- 14 agrego la ruta para eliminar una tarea
router.delete('/:id', async (req,res) => {
    console.log(req.params.id);
    await Task.findByIdAndRemove(req.params.id);
    res.json({APIstatus: 'task deleted'})
});

module.exports = router;