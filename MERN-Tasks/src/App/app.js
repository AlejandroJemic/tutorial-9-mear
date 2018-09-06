//mm- 16 importo las librerias de react
import React, {Component} from 'react';

//nn- 17 creo el componente principal de la aplicacion
class App extends Component{

    //nn- 19 constructor para agregar el estado
    constructor(){
        super()
        this.state = {
            id:'',
            title:'',  
            description: '',
            tasks: []
        }
        this.AddTask = this.AddTask.bind(this)
        this.fetchTasks = this.fetchTasks.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleDeleteTask = this.handleDeleteTask.bind(this)
        this.handleEditTask = this.handleEditTask.bind(this)
        
    }

    // HANDLERS //

    //nn- 18 metodo para agregar tareas
    //nn- 29 agregolas tareas para el adit de una tarea

    AddTask(e){
        if(this.state.id){ //nn- 30 si existe el id estoy actualizando
            console.log('task edited')
            console.log(this.state)
            fetch('/api/task/' + this.state.id,{
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": 'application/json'
                }
            })
            .then(res => res.json())
            .then(data =>{ 
                console.log(data)
                M.toast({html: 'tarea editada'}) //objeto de materializacss que permite mostrar un mensaje en el footer
                this.setState({ title:'', description: '' })  //limpio el estado del formulario, y lo vinvulo a a los controles para qu ese limpien
                this.fetchTasks() // agrego la lectura de tareas para actualizar la lista de tareas en el estado y pantalla
            })
            .catch(err => console.error(err))
        }
        else{ //si no existe el id estoy agregando
            console.log('task added')
            console.log(this.state)
    
            //nn- 21 envio los datos del estado a la api y a la ddbb
            fetch('/api/task/',{
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": 'application/json'
                }
            })
            .then(res => res.json())
            .then(data =>{ 
                console.log(data)
                M.toast({html: 'tarea guardada'}) //objeto de materializacss que permite mostrar un mensaje en el footer
                this.setState({ title:'', description: '' }) //nn- 22 limpio el estado del formulario, y lo vinvulo a a los controles para qu ese limpien
                this.fetchTasks() //nn- 26 agrego la lectura de tareas para actualizar la lista de tareas en el estado y pantalla
                }) 
            .catch(err => console.error(err))
        }
        e.preventDefault();
    }

    //nn- 23 creo metodo para consultar las tareas deade la api
    fetchTasks(){
        fetch('/api/task/')
        .then(res => res.json())
        .then(data =>{ 
            this.setState({tasks: data})
            console.log(this.state.tasks)
            }) 
        .catch(err => console.error(err))
    }


    //nn- 20 agrego handleOnChange para pasar los cambios al state
    handleOnChange(e){
        const { name, value } = e.target
        console.log(name + 'Changed to ' + value)
        this.setState({[name]: value}) //cambio el state con nombre name al valor de value
    }

    //nn- 28 creo las tareas para  el delete
    handleDeleteTask(id){
        if(confirm('eliminar tarea?')){
            console.log('eliminando tarea ' + id)
            fetch('/api/task/' + id,{
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": 'application/json'
                }
            })
            .then(res => res.json())
            .then(data =>{ 
                console.log(data)
                M.toast({html: 'tarea eliminada'}) //objeto de materializacss que permite mostrar un mensaje en el footer
                this.fetchTasks() // para actualizar la lista de tareas en el estado y pantalla tras el delete
                }) 
            .catch(err => console.error(err))
        }
    }

    //nn- 29 creo las tareas para el delete
    handleEditTask(id){
        fetch('/api/task/' + id) //LA BUSCO DESDE LA API
        .then(res => res.json())
        .then(data =>{ 
            console.log('editando tarea')
            console.log(data)
            this.setState({id: data._id, title: data.title, description: data.description })
            }) 
        .catch(err => console.error(err))
        }
     
    // LIFE CICLE METHODS //

    //nn- 24 agrego metodo para consultar las tareas en el load
    componentDidMount(){
        console.log('react app loaded');
        this.fetchTasks();
    }

    render (){
        return(
            <div>
                {/* NAVEGACION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className='band-logo' href='/'><h5>REACT APP START HERE !</h5></a>
                    </div>
                </nav>
                {/* aplicacion */}
                <div className="container">
                    <div className="row">
                        {/* add update form */}
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.AddTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                {/* //nn- 20 agrego onChange={this.handleOnChange} para resivir lso cambios*/}
                                                {/* //nn- 22 limpio el estado del formulario, y lo vinvulo a a los controles para qu ese limpien */}
                                                <input type="text" name="title" placeholder="title" 
                                                onChange={this.handleOnChange}
                                                value={this.state.title}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                {/* //nn- 20 agrego onChange={this.handleOnChange} para resivir lso cambios*/}
                                                {/*//nn- 22 limpio el estado del formulario, y lo vinvulo a a los controles para qu ese limpien*/}
                                                <textarea placeholder="description"  name="description" className="materialize-testarea"
                                                onChange={this.handleOnChange} 
                                                value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">SEND<i className="material-icons right">send</i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* task list */}
                        <div className="col s7">
                        <table>
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* //nn- 25 recoro las tareas obtenuidas de la api y las mustro en la lista */}
                                {/* //nn- 27 agedo los botones para editar y borrar */}
                                {this.state.tasks.map(task => {
                                        return (
                                        <tr key={task._id}>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td>
                                                <button className="btn light-blue darken-4" onClick={ () => this.handleEditTask(task._id)}><i className="material-icons">edit</i></button>
                                                <button className="btn light-blue darken-4"  onClick={() => this.handleDeleteTask(task._id)} style={{margin: '4px'}}><i className="material-icons">delete</i></button>
                                            </td>
                                        </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

module.exports = App
