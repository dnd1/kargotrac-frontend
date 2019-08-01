import React, { useContext } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Homepage from './pages/Homepage';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import NavigationBar from './pages/NavBar'
import { Dashboard } from './pages/Dashboard'
import { UserProfile } from './pages/UserProfile'
import { any, string } from 'prop-types';

// 

type userSession = {
  session: string | null,
  setSession: (s: string) => any
}
export const userContext = React.createContext<userSession | null>(null);


export const App: React.FC = () => {
  //const value = useContext(userContext);
  
  const sesion = window.sessionStorage.getItem('session')
  const [session, setSession] = React.useState(sesion)
  const context = React.useContext(userContext)
  return (
    <userContext.Provider value={{session, setSession}}>
      <Router>
        <NavigationBar />

        <Route exact path="/" component={() => <Homepage name="Maria" />} />
        <Route exact path="/login:id" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup:id" component={SignUp} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/users/me" component={UserProfile} />
      </Router>
    </userContext.Provider>
  );
}


