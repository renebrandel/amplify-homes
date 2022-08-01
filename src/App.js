import './App.css';
import '@aws-amplify/ui-react/styles.css';
import React from 'react';
import Amplify from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

import { StandardCardCollection } from "./ui-components";
import { NavBar } from "./ui-components";

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const Main = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <div className="App">
      <NavBar className="App-header"/>      
      <StandardCardCollection className="App-content"/>
    </div>
  );
}

const App = ()=> {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
          <Main/>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
