import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';






const userResponse = window.sessionStorage.getItem('session')
console.log(`session ${userResponse}`)
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
