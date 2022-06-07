import React from 'react';
import ReactDOM from 'react-dom';
import './common.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify';
import "@aws-amplify/ui-react/styles.css";
import {AmplifyProvider} from "@aws-amplify/ui-react";
import awsconfig from './aws-exports';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dressup from "./routes/dressup";
Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <AmplifyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="dressup" element={<Dressup />} />
        </Routes>
      </BrowserRouter>
    </AmplifyProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
