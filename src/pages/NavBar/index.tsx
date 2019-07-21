import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from './styles';
import { Link, withRouter } from "react-router-dom";
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';





const ButtonAppBar = (props: any) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          {
            props.location.pathname == '/' ?
              <div className={classes.button}>
                <Button color="inherit" component={Link} to='/login'> Login </Button>
                <Button color="inherit" component={Link} to='/signup'> Sign Up</Button>
              </div> :
              <div>
                <div>
                  <Typography variant="h6" className={classes.title} style={{ flex: 1 }}>
                    <SvgIcon  >
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </SvgIcon>
                    <Button color="inherit" component={Link} to='/'>
                      Home
                </Button>
                  </Typography>
                </div>


                <div className={classes.button}>
                  <Button color="inherit" component={Link} to={props.location.pathname === '/login' ? '/signup' : '/login'}>
                    {props.location.pathname === '/login' ? 'Sign Up' : 'Login'}
                  </Button>
                </div>
              </div>



          }

          {console.log(props.location.pathname)}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(ButtonAppBar);