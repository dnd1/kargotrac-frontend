import React, { useContext } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Homepage from './pages/Homepage';
import {Login} from './pages/Login';
import { SignUp } from './pages/SignUp';
import NavigationBar from './pages/NavBar'
import {Dashboard} from './pages/Dashboard'
import userContext from './index'


const App: React.FC = () => {
  const value = useContext(userContext);
  return (
    <Router>
      <NavigationBar/>

      <Route exact path="/" component={() => <Homepage name="Maria" />} />
      <Route exact path="/login:id" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup:id"  component={SignUp} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Router>
  );
}

export default App;
