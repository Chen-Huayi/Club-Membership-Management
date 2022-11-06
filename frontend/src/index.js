import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/antd.min.css'

//////////////////// Change here for API SERVER URL ///////////////
const url='http://localhost:8000'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App url={url}/>
    </React.StrictMode>
);
