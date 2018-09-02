console.log('react app loaded');

//mm- 16 importo las librerias de react
import React, {Component} from 'react';
import {render} from 'react-dom';

//nn- 17 creo el componente principal de la aplicacion
class App extends Component{
    render (){
        return(
            <h1>MERN APP</h1>
        )
    }
}
//nn- 18 anclo er componete al dib del index.ahtml
render(<App/>, document.getElementById(app));