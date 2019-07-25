import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ThemeProvider } from '@material-ui/styles';
const theme = {};

const userResponse = {
    "usuario": {
        "id": 86,
        "email": "dianar@gmail.com",
        "username": "diana",
        "password": "1234567",
        "address": null,
        "phone1": null,
        "phone2": null,
        "createdAt": "2019-07-24T19:05:58.000Z",
        "updatedAt": "2019-07-24T19:05:58.000Z"
    },
    "company": 1,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODYsInVzZXJuYW1lIjoiZGlhbmEiLCJpYXQiOjE1NjQwMTgyODAsImV4cCI6MTU2NDE0Nzg4MH0.WvnZevu7EwTBSHdd4Mhr2diPUj3pieHbtfRMwA1h4Mw"
  }
  
  const userContext = React.createContext(userResponse);
  export default userContext;

ReactDOM.render(
    // <ThemeProvider theme={theme}>
        <userContext.Provider value={userResponse}>
            <App />
        </userContext.Provider>
            
    // </ThemeProvider>, 
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
