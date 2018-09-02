//mm- 16 importo las librerias de react
import React, {Component} from 'react';

//nn- 17 creo el componente principal de la aplicacion
class App extends Component{

    //nn- 19 constructor para agregar el estado
    constructor(){
        super()
        this.state = {
            title:'',  
            description: ''
        }
        this.AgregarTarea = this.AgregarTarea.bind(this)
    }
    //nn. 18 metodo para agregar tareas
    AgregarTarea(e){
        console.log('agregando tarea')
        e.preventDefault();
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
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.AgregarTarea}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" placeholder="title"/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea placeholder="description" className="materialize-testarea"></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-light-blue darken-4">SEND</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                        
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

module.exports = App