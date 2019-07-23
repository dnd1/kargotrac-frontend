import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NavBar from './pages/NavBar'

const App: React.FC = () => {
  return (
    <Router>

      <NavBar />
      <Route exact path="/" component={() => <Homepage name="Maria" />} />
      <Route path="/login" component={Login} />
      <Route path="/signup:id" exact component={SignUp} />
      <Route path="/signup" exact component={SignUp} />
      

    </Router>
  );
}

export default App;
