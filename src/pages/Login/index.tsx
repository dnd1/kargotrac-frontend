// import * as React from 'react'
// import useStyles from './styles';

// export interface LoginProps {
//     name: string
// }

// const Login = (props:LoginProps) => {
//     const {name} = props
//     return <h1>Hello {name}, this is the Login page!</h1>
// }

// export default Login

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import Container from '@material-ui/core/Container';
import { Link, Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import axios from 'axios';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}

      {' team.'}
    </Typography>
  );
}


export default function Login(props: RouteComponentProps) {

  const id = props.match.params && (props.match.params as any).id
  console.log("CompanyId", id)

  const [login, setLogin] = React.useState({
    email: "",
    password: "",

  })

  const [error, setError] = React.useState({
    emailError : false,
    passError: false
  })


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLogin({ ...login, [name]: value })
    if(name === 'email'){
      e.target.value === ""? setError({...error, emailError : true}): setError({...error, emailError : false})
    }else if(name === 'password'){
      e.target.value === ""? setError({...error, passError : true}): setError({...error, passError : false})
    }

  }

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    alert(`Submitting Name ${login.email}`)

    let user = {
      email: login.email,
      password: login.password,
      companyID: id
    }
    console.log(user)
    axios.post(`http://localhost:8080/users`, user)
      .then(res => {
        console.log('Este es el status')
        console.log(res.status)
        console.log(res);
        console.log(res.data);
        if(res.statusText == "OK"){
          window.sessionStorage.setItem("session", res.data.token);
        }
        //
      })
  }


  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={login.email}
            onChange={handleChange}
            error={error.emailError}
            helperText={error.emailError ? 'Please enter a valid Email' : ' '}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={login.password}
            onChange={handleChange}
            error={error.passError}
            helperText={error.passError ? 'Please enter a valid Password' : ' '}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              {"Si olvidaste tu contraseña ve a "}
              <Link to="/">
                {'Recuperar contraseña'}
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

withRouter(Login)