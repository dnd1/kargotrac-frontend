import React, { useContext } from 'react';

import { BrowserRouter as Router, Route, Link, RouteComponentProps } from "react-router-dom";
import Homepage from './pages/Homepage';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import {NavBar} from './pages/NavBar'
import { Dashboard } from './pages/Dashboard'
import { UserProfile } from './pages/UserProfile'
import SideBar from './pages/SideBar';


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
  if (sesion) sesion = JSON.parse(sesion)

  let obj: any = sesion
  if (sesion) userSesion = {
    user: obj.user,
    companyID: obj.companyID,
    token: obj.token,
    usersCompanies: obj.usersCompanies
  }
  console.log('sesioooooon')

  console.log('SESION EN APP')
  //if(user) console.log(user)
  if (sesion) console.log(userSesion)
  const [session, setSession] = React.useState(obj)
  const context = React.useContext(userContext)
  return (
    <userContext.Provider value={{ session, setSession }}>
      <Router>
        <Route
          path="/"
          render={(props: any) => {
            return (
              <div>
                <NavBar {...props}>

                  <Route
                    path="/login:id?"
                    render={(props: RouteComponentProps) => {
                      const id = (props.match.params as any).id
                      return <Login id={id}></Login>
                    }}
                  />

                  <Route
                    path="/signup:id?"
                    render={(props: RouteComponentProps) => {
                      return <SignUp></SignUp>
                    }}
                  />
                  </NavBar>
                </div>
              

            );
          }}
        />

        <Route
          path="/dashboard"
          render={(props: any) => {
            return (
              
                <SideBar {...props}>
                
                <Route
                  exact
                  path="/dashboard"
                  render={(props: any) => {
                    return (
                      <Dashboard></Dashboard>
                    );
                  }}
                />
                <Route
                  path="/dashboard/users/me"
                  render={(props: any) => {
                    return (
                      <UserProfile></UserProfile>
                    );
                  }}
                />
                </SideBar>

              

            );
          }}
        />
      </Router>
    </userContext.Provider>
  );
}


