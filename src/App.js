import './App.css';
import React, { useEffect } from 'react';
import { NavBar, MarketingFooter } from './ui-components'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import Dressup from "./routes/dressup";
import CollectionList from './routes/collectionList';

function App() {


  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  const navBarOverrides = {
    "LoginButton": {
      onClick: (event) => { logIn() },
      style: { visibility: "visible" },
      children: "Connect your wallet",
    },
    "LogoutButton": {
      onClick: (event) => { logOut() },
      style: { visibility: "hidden" },
    },
    "logo-dressupnft": {
      onClick: (event) => { window.location.href = "/"; },
      className: "ext-link",
    },
    "logo-twitter": {
      className: "ext-link",
    },
    "logo-discord": {
      className: "ext-link",
    },
    "logo-openSea": {
      className: "ext-link",
    },
  };

  useEffect(() => {
    console.log("isAuthenticated : " + isAuthenticated);
    if (isAuthenticated) {
      // add your logic here
      // dispNFTs();

    } else {
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

  const dispNavBar = () => {

    if (isAuthenticated) {
      navBarOverrides.LoginButton.children = getDispAddress();
      navBarOverrides.LogoutButton.style.visibility = "visible";
    } else {
      navBarOverrides.LoginButton.children = "Connect your wallet";
      navBarOverrides.LogoutButton.style.visibility = "hidden";
    }

    navBarOverrides.Twitter = {
      style: {
        hover: {cursor: 'pointer'},
      }
    }

    return <NavBar width={"100vw"} overrides={navBarOverrides} />;

  }

  const getDispAddress = () => {
    let ethAddress = user.get("ethAddress");
    let dispAddress = ethAddress.substr(0, 5) + "....." + ethAddress.slice(-5);
    return dispAddress
  }


  return (

  <div className="App">
    <BrowserRouter>
      {dispNavBar()}
      <Routes>
        <Route path="/" element={<CollectionList />} />
        <Route path="/dressup" element={<Dressup />} />
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
