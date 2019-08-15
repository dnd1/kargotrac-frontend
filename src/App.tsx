import React, { useContext } from 'react';

import { BrowserRouter as Router, Route, Link, RouteComponentProps, Switch } from "react-router-dom";
import Homepage from './pages/Homepage';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { NavBar } from './pages/NavBar'
import { Dashboard } from './pages/Dashboard'
import { UserProfile } from './pages/UserProfile'
import SideBar from './pages/SideBar';
import ItemsPage from './pages/protected/ItemsPage';
import ShipmentsPage from './pages/protected/ShipmentsPage';
import PackagesPage from './pages/protected/PackagesPage';
import EditShipment from './pages/protected/ShipmentsPage/editShipment';
import EditPackage from './pages/protected/PackagesPage/editPackage';
// 

type user = {
  user: any,
  companyID: any,
  token: any,
  usersCompanies: any,
  isCompany: any
}

type company = {
  user: any,
  isCompany: any,
  token: any
}
type userSession = {
  session: user | null,
  setSession: (s: string) => any
}
export const userContext = React.createContext<userSession | null>(null);


export const App: React.FC = () => {
  // Manejo si es sesion de compania o de usuario 
  let sesion = sessionStorage.getItem('session')
  if (sesion) sesion = JSON.parse(sesion)
  let obj: any = sesion
  let userSesion: user | company | null = null
  if (obj && obj.isCompany) {
    userSesion = {
      user: obj.user,
      isCompany: true,
      token: obj.token
    }

  } else if (sesion) {
    userSesion = {
      user: obj.user,
      companyID: obj.companyID,
      token: obj.token,
      usersCompanies: obj.usersCompanies,
      isCompany: false

    }
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
                <NavBar {...props}></NavBar>
                <Switch>

                  <Route
                    exact
                    path="/login/company/:id"
                    render={(props: RouteComponentProps) => {
                      const id = (props.match.params as any).id
                      return <Login companyID={id} isCompany={true}></Login>
                    }}
                  />

                  <Route
                    path="/login/:id?"
                    render={(props: RouteComponentProps) => {
                      const id = props.match.params ? (props.match.params as any).id : null
                      return <Login id={id}></Login>
                    }}
                  />

                  <Route
                    path="/signup/:id?"
                    render={(props: RouteComponentProps) => {
                      const id = (props.match.params as any).id
                      return <SignUp id={id}></SignUp>
                    }}
                  />
                </Switch>

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
                  exact
                  path="/dashboard/items"
                  render={(props: any) => {
                    return (
                      <ItemsPage></ItemsPage>
                    );
                  }}
                />
                <Route
                  exact
                  path="/dashboard/shipments"
                  render={(props: any) => {
                    return (
                      <ShipmentsPage></ShipmentsPage>
                    );
                  }}
                />

                <Route
                  exact
                  path="/dashboard/shipments/edit/:id?"
                  render={(props: any) => {
                    const id = (props.match.params as any).id

                    return (
                      <EditShipment id={id}></EditShipment>
                    );
                  }}
                />


                <Route
                  exact
                  path="/dashboard/packages"
                  render={(props: any) => {
                    return (
                      <PackagesPage></PackagesPage>
                    );
                  }}
                />

                <Route
                  exact
                  path="/dashboard/packages/edit/:id?"
                  render={(props: any) => {
                    const id = (props.match.params as any).id

                    return (
                      <EditPackage id={id}></EditPackage>
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


