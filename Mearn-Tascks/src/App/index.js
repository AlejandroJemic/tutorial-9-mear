console.log('react app loaded');

//mm- 16 importo las librerias de react
import React, {Component} from 'react';
import {render} from 'react-dom';

//nn- 18 importo el ocmpente principal d ela app
import App from './app';

//nn- 18 anclo er componete al dib del index.ahtml
render(<App/>, document.getElementById('root'));