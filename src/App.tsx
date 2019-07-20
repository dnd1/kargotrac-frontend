import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Homepage from './pages/Homepage';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <Router>
      
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>  
        
          <Route exact path="/" component={() => <Homepage name="Maria" />} />
          <Route path="/login" component={Login} />
      
    </Router>
  );
}

export default App;
