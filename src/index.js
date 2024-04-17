import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Team from './Pages/Team'
import About from './Pages/About'
import Profile from './Pages/Profile'
import AccountLogin from './Pages/AccountLogin';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <><>
    <HashRouter>
      <Routes>

        <Route path="/" element={<Navigate replace to="SignIn" />} />
        <Route path="/SignIn" element={<AccountLogin />}>x </Route>
        <Route path="/Home" element={<App/>}></Route>
        <Route path="/Team" element={<Team/>}></Route>
        <Route path="/Profile" element={<Profile/>}></Route>
        <Route path="/About" element={<About/>}></Route>
      </Routes>
    </HashRouter>
  </><React.StrictMode>
    </React.StrictMode></>
);
reportWebVitals();
