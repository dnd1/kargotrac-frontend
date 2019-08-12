import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0097a7',
        },
        secondary: {
            main: '#ff5722',
        },
    },

});
//export default userContext;

ReactDOM.render(
    // <ThemeProvider theme={theme}>
    <MuiThemeProvider theme={theme}>
        <App />

    </MuiThemeProvider>

    // </ThemeProvider>, 
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
