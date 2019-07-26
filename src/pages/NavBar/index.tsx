import React from 'react'
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

const ButtonAppBar = (props: any) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {props.location.pathname === '/' ? (
                        <div className={classes.button}>
                            <Button color="inherit" component={Link} to="/login">
                                {' '}
                                Login{' '}
                            </Button>
                            <Button color="inherit" component={Link} to="/signup">
                                {' '}
                                Sign Up
                            </Button>
                        </div>
                    ) : (
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                            <div>
                                <Box flexGrow={1}></Box>
                                <Button color="inherit" component={Link} to="/">
                                    Home
                                </Button>
                                <Button
                                    className={classes.button}
                                    color="inherit"
                                    component={Link}
                                    to={props.location.pathname === '/login' ? '/signup' : '/login'}>
                                    {props.location.pathname === '/login' ? 'Sign Up' : 'Login'}
                                </Button>
                            </div>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withRouter(ButtonAppBar)
