import React, { ComponentType } from 'react'
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

// if(props.location.pathname === '/') 

const AppBarHome = (props: any) => {
    const classes = useStyles()
    return (
        
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <Button color="inherit" component={Link} to="/login">
                    {' '}
                    Login{' '}
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                    {' '}
                    Sign Up
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
                    to={props.pathname === '/login' ? '/signup' : '/login'}>
                    {props.pathname === '/login' ? 'Sign Up' : 'Login'}
                </Button>
            </div>


        </div>)

}

const NavBar = (props : any) => {
    const classes = useStyles()
    const location = props.location
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {
                        
                       location.pathname === '/' ? <AppBarHome></AppBarHome> :
                        <AppBarLogSign pathname={location.pathname}></AppBarLogSign>
                        
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withRouter(NavBar);
