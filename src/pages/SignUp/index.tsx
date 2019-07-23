import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './styles';
import { Link, withRouter } from "react-router-dom";
import { sign } from 'crypto';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      
      {' team.'}
    </Typography>
  );
}

export interface ISignupProps {
  username: string,
  email: string,
  error: boolean,
  password: string
}

// Estilos 


// SignUp component

 const SignUp = (props: any) => {
  const classes = useStyles();
  


  const [signup, setSignup] = React.useState({
    username: "",
    email: "",
    password: "",
    emailError: false,
    passError: false
  })


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignup({ ...signup, [name]: value })
    if(name == 'email'){
      e.target.value === ""? setSignup({...signup, emailError : true}): setSignup({...signup, emailError : false})
    }else if(name== 'password'){
      e.target.value === ""? setSignup({...signup, passError : true}): setSignup({...signup, passError : false})
    }
    
  }

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    alert(`Submitting Name ${signup.username}`)
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        Es la empresa {props.match.params.id}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={signup.email}
                onChange={handleChange}
                error={signup.emailError}
                helperText={signup.emailError ? 'Please enter a valid Email' : ' '}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="Uname"
                value={signup.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={signup.password}
                onChange={handleChange}
                error={signup.passError}
                helperText={signup.passError ? 'Please enter a valid password' : ' '}
              />
            </Grid>
            <Grid item xs={12}>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              {'Si ya estás registrado con otra empresa de envíos ve al '}
              <Link to="/login">
              login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );
}

export default withRouter(SignUp)