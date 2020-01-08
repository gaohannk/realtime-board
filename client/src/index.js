import React from 'react';
import ReactDOM from 'react-dom';
import './public/stylesheets/index.css';
import Header from './header';
import registerServiceWorker from './registerServiceWorker';
import Board from "./board";

ReactDOM.render(<Header />, document.getElementById('root'));
ReactDOM.render(<Board />, document.getElementById('board'));

registerServiceWorker();
