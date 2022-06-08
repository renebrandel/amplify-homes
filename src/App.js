import './App.css';
import React, { useEffect } from 'react';
import { NavBar, MarketingFooter } from './ui-components'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMoralis } from "react-moralis";
import Dressup from "./routes/dressup";
import List from './routes/list';

function App() {

  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  const navBarOverrides = {
    "LoginButton": {
      onClick: (event) => { logIn() },
    },
    "LogoutButton": {
      onClick: (event) => { logOut() },
    },
  };

  useEffect(() => {
    if (isAuthenticated) {
      // add your logic here
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const logIn = async () => {
    if (!isAuthenticated) {

      await authenticate({signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const logOut = async () => {
    await logout();
    console.log("logged out");
  }

  const dispLoginInfo = () => {
    if (!isAuthenticated) {
      return    <button onClick={logIn}>Metamask Login</button>;
    } else {
      let ethAddress = user.get("ethAddress");
      let dispAddress = ethAddress.substr(0, 5) + "....." + ethAddress.slice(-5);
      return (
        <>
          <div>{dispAddress}</div>
          <button onClick={logOut} disabled={isAuthenticating}>Logout</button>
        </>
      );
    }
  }

  return (

  <div className="App">
    <NavBar width={"100vw"} overrides={navBarOverrides} />
    {dispLoginInfo()}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="dressup" element={<Dressup />} />
      </Routes>
    </BrowserRouter>

    <MarketingFooter width={"100vw"} />
  </div>

  );
}

export default App;
/*
import './App.css';

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;

*/
