import React, { ComponentType, useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import useStyles from './styles'
import { Link, RouteComponentProps } from 'react-router-dom'
import Box from '@material-ui/core/Box'

//import userContext from '../../index'

// if(props.location.pathname === '/') 


export const NavBar = (props: RouteComponentProps & { children?: any }) => {
    const classes = useStyles()
    const id = (props.match.params as any)
    console.log(id)
    //const location = props.location
    return (
        <div className={classes.root}>
            <AppBar position="static">
                {console.log(props.location.pathname)}
                <Toolbar>
                    {
                        props.location.pathname === '/' ?
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
                            :

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
                                        to={props.location.pathname.match(/login[0-9]*/)? '/signup' : '/login'}>
                                        {props.location.pathname.match(/login[0-9]*/) ? 'Registrar' : 'Ingresar'}
                                    </Button>
                                </div>


                            </div>


                    }
                </Toolbar>
            </AppBar>
            {props.children}
        </div>
    )
}


