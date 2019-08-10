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
import { PopUp } from './popup'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {userContext} from '../../App'
import Snackbars from './snackbar';


export const Login = (props: any) => {

  const id = props.id
  const classes = useStyles();

  const [login, setLogin] = React.useState({
    email: "",
    password: "",

  })

  const [emailError, setEmailError] = React.useState({
    emptyEmail: false,
    format: false
  })

  const [passError, setPassError] = React.useState(false)

  const [resError, setResError] = React.useState({
    error: false,
    msg: ""
  })

  const [showInfo, setShowInfo] = React.useState(false)

  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const [submitting, setSubmit ] = React.useState(false)

  const context = React.useContext(userContext)

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLogin({ ...login, [name]: value })
    if (name === 'email') {
      validate('emailError', e.target.value)
    } else if (name === 'password') {
      validate('passError', e.target.value)
    }

  }

  const validateEmail = (email: string) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }
  const validate = (name: string, value: string) => {
    let errorVal = false
    if (value.length === 0) errorVal = true
    if (name === 'emailError') {
      setEmailError({ ...emailError, emptyEmail: errorVal })

      console.log(validateEmail(value))
    }
    else setPassError(errorVal)
    //console.log(error)

  }

  const handleBlur = (e: any) => {
    if(e.target.name === "email") setEmailError({ ...emailError, format: !validateEmail(e.target.value) })
    else setPassError(e.target.value.length === 0)
    
  }

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    setShowInfo(true)
    setResError({ ...resError, error: false })


    validate('passError', login.password)
    validate('emailError', login.email)

    if (!passError && !emailError.emptyEmail && !emailError.format) {
      let user = {
        email: login.email,
        password: login.password,
        companyID: id
      }
      console.log(user)
      axios.post(`https://kargotrack.herokuapp.com/users`, user)
        .then(res => {
          responseHandler(res)
          //
        }, (error) => {
          //setResError({ ...resError, error: true, msg: error})
          window.alert(error)
          //setResError({ ...resError, error: true, msg: error})
        })
    }
  }

  const responseHandler = (res: any) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>')
    console.log(res.data.status)
    if (res.statusText === "OK") {
      setShowInfo(false)
      switch (res.data.status) {
        case 'success':
          
          //const user = JSON.parse(res.data)
          const user:any = {
            user: res.data.user,
            companyID: res.data.companyID,
            token: res.data.token,
            usersCompanies: res.data.usersCompanies
          }

          if(context) context.setSession(user)
          console.log('SESION EN LOGIN')
          //let user
          //if(context && context.session) user = JSON.parse(context.session)
          //console.log(res.data)
          if(context && context.session) console.log(context.session)
          window.sessionStorage.setItem("session", JSON.stringify(user));
          //window.sessionStorage.setItem("username", res.data.user.username)
          //const element = window.sessionStorage.getItem("session")
          //console.log(element)
          console.log('aqui toy')
          console.log(res.data.user)
          window.alert(`
                  El usuario ${res.data.user.email} ha sido registrado
                  El token de sesion es ${res.data.token}
                  Con Status ${res.status}
                  `)
          setSubmit(true)
          break
        case 'failed':
          setResError({ ...resError, error: true, msg: res.data.msg })
          break

      }

    } else {
      console.log("????????????????????????")


    }

  }


  return (
    <div>
    {
      // Cuando reciba el response, de ahi establezco el error y el mensaje de error
      resError.error === true ? <PopUp errorMessage={resError.msg}></PopUp> : null
      
      
    }

    {
      // Cuando este todo bien hago submit y voy al dashboard
      submitting === true ? <Redirect to='/dashboard'/> : null

    }
    <Snackbars showInfo={showInfo}></Snackbars>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            
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
              error={emailError.emptyEmail || emailError.format}
              helperText={emailError.emptyEmail || emailError.format ? 'Please enter a valid Email' : ' '}
              onBlur={handleBlur}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={values.showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={login.password}
              onChange={handleChange}
              error={passError}
              helperText={passError ? 'Please enter a valid password' : ' '}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onBlur={handleBlur}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={showInfo ? true : false}
            >
              Ingresar
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
        </Box>
      </Container>
    </div>

  );
}

withRouter(Login)