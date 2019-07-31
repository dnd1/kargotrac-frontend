import React, { ComponentType, useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import useStyles from './styles'
import { Link, withRouter } from 'react-router-dom'
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon'
import { mergeClasses } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import userContext from '../../index'

// if(props.location.pathname === '/') 

const AppBarHome = (props: any) => {
    const classes = useStyles()
    return (

        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Button color="inherit" component={Link} to="/login">
                {' '}
                Ingresar{' '}
            </Button>
            <Button color="inherit" component={Link} to="/signup">
                {' '}
                Registrar
            </Button>
        </div>
    )


}

const AppBarLogSign = (props: any) => {
    const classes = useStyles()
    return (

        <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
            <div style={{ justifyContent: 'flex-start' }}>
                <Box flexGrow={1}></Box>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
            </div>
            <Box flexGrow={1}></Box>
            <div style={{ justifyContent: 'flex-end' }}>
                <Button
                    className={classes.button}
                    color="inherit"
                    component={Link}
                    // Debo probar aqui que sea login y el id
                    to={props.location === '/login' ? '/signup' : '/login'}>
                    {props.location === '/login' ? 'Registrar' : 'Ingresar'}
                </Button>
            </div>


        </div>)

}

const AppBarDashboard = () => {
    const value = useContext(userContext);
    console.log('Esto essss')
    console.log(value)
    const user = window.sessionStorage.getItem("username");
    return <div>{user}</div>
}

const NavBar = (WrappedComponent : any, location : any) => {
    const classes = useStyles()
    //const location = props.location
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <WrappedComponent location={location}></WrappedComponent>
                </Toolbar>
            </AppBar>
        </div>
    )
}


const NavigationBar = (props: any) =>{ 
    console.log(props.location)
    if(props.location.pathname === '/') return NavBar(AppBarHome, "")
    else if(props.location.pathname === '/dashboard' || props.location.pathname === '/users/me') return NavBar(AppBarDashboard, "")
    else return NavBar(AppBarLogSign, props.location.pathname)
    return <div></div>
    //else if(props.location.pathname === '/dashboard') return NavBar(AppBarDashboard)
    //else return NavBar(AppBarLogSign)
}
export default withRouter(NavigationBar);
//const appbarlogin = withRouter(AppBarLogSign);
/*
{

                        location.pathname === '/' ? <AppBarHome></AppBarHome> :
                            <AppBarLogSign pathname={location.pathname}></AppBarLogSign>

                    }
*/