import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import TopLayout from './components/TopLayout';
import { ReactNotifications } from 'react-notifications-component'


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <ReactNotifications/>
        <TopLayout/>
    </BrowserRouter>
);


