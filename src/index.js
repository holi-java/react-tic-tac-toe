import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import './index.css';
import Game from './components/Game';


ReactDOM.render(
    <Game />,
    document.getElementById('container')
);
