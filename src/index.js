import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './userContext';
import NavBar from './navbar';
import Home from './home';
import CreateAccount from './createaccount';
import Login from './login';
import Deposit from './deposit';
import Withdraw from './withdraw';
import AllData from './alldata';

function Spa() {
  return (
    <HashRouter>
      <div>
        <NavBar />
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/alldata" element={<AllData />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <UserProvider>
    <Spa />
  </UserProvider>,
  document.getElementById('root')
);
