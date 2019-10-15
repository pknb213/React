import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Video from './video';
import Timer from "./tick";
import ToggleBtn from './toggle';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <div>
        <ToggleBtn/>
        <Timer/>
        <Video/>
    </div>
    , document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
