import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes } from "react-router-dom";
import TopLayout from './components/TopLayout';
import { ReactNotifications } from 'react-notifications-component'
import { ConfigProvider,theme } from 'antd';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <BrowserRouter>
    <ReactNotifications />
    <ConfigProvider
      theme={{
        //  algorithm: theme.compactAlgorithm ,

      }}
    >
      <TopLayout />
    </ConfigProvider>
  </BrowserRouter>

);


