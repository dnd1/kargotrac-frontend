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

type user = {
  user: any,
  companyID: any,
  token: any,
  usersCompanies: any
}

type userSession = {
  session: user | null,
  setSession: (s: string) => any
}
export const userContext = React.createContext<userSession | null>(null);


export const App: React.FC = () => {
  let sesion = sessionStorage.getItem('session')
  let userSesion: user = {
    user: null,
    companyID: null,
    token: null,
    usersCompanies: null
  }
  if(sesion) sesion = JSON.parse(sesion)

  let obj: any = sesion
  if(sesion) userSesion = {
    user: obj.user,
    companyID: obj.companyID,
    token: obj.token,
    usersCompanies: obj.usersCompanies
  }
  console.log('sesioooooon')
  
  console.log('SESION EN APP')
  //if(user) console.log(user)
  if(sesion) console.log(userSesion)
  const [session, setSession] = React.useState(obj)
  const context = React.useContext(userContext)
  return (
    <userContext.Provider value={{ session, setSession }}>
      <Router>
        <NavigationBar />

        <Route exact path="/" component={() => <Homepage name="Maria" />} />
        <Route exact path="/login:id" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup:id" component={SignUp} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/users/me" component={UserProfile} />
      </Router>
    </userContext.Provider>
  );
}


