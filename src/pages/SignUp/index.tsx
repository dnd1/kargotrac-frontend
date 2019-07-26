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
import axios from 'axios'

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
  password: string,
  emailError: boolean,
  passError: boolean
}

interface IErrors {
  emailError: boolean,
  passError: boolean
}


export const userResponse = {
  "user": {
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
// Estilos 


// SignUp component

export const SignUp = (props: any) => {
  const classes = useStyles();
  


  const [signup, setSignup] = React.useState({
    email: "",
    username: "",
    password: "",
  })

  const [error, setError] = React.useState({
    emailError : false,
    passError: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const { name, value } = e.target
    setSignup({ ...signup, [name]: value })
    console.log(signup)
    
    
    if(name === 'email'){
      e.target.value === ""? setError({...error, emailError : true}): setError({...error, emailError : false})
      console.log(error)
    }else if(name === 'password'){
      e.target.value === ""? setError({...error, passError : true}): setError({...error, passError : false})
    }
    
  }

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    alert(`Submitting Name ${signup.username}`)
    let user = {
      email: signup.email,
      username: signup.username,
      password: signup.password,
      companyID: props.match.params.id
    }
    const {email, username, password, companyID} = user
    console.log(email)
    axios.post(`http://localhost:8080/register`, user)
      .then(res => {
        console.log(res);
        console.log(res.data);
        if(res.statusText == "OK"){
          window.sessionStorage.setItem("session", res.data.token);
        }
      })
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
                error={error.emailError}
                helperText={error.emailError ? 'Please enter a valid Email' : ' '}
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
                error={error.passError}
                helperText={error.passError ? 'Please enter a valid password' : ' '}
              />
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
withRouter(SignUp)