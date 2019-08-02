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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './styles';
import { Link, Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import axios from 'axios'
import { PopUp } from './popup'
import {userContext} from '../../App'






// 




export const SignUp = (props: any) => {
  const classes = useStyles();
  //const id = props.match.params && (props.match.params as any).id

  // meter responsehandler aqui y que sea el el que cambie el estado de error

  const [signup, setSignup] = React.useState({
    email: "",
    username: "",
    password: "",
  })

  const [emailError, setEmailError] = React.useState({
    emptyEmail: false,
    format: false
  })

  const [passError, setPassError] = React.useState(false)

  const [usernameError, setUsernameError] = React.useState(false)

  const [resError, setResError] = React.useState({
    error: false,
    msg: ""
  })

  const [submitting, setSubmit ] = React.useState(false)
  
  const context = React.useContext(userContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const { name, value } = e.target
    console.log(name)
    console.log(value)
    setSignup({ ...signup, [name]: value })
    console.log(signup)

    if (name === 'email') {
      validate('emailError', e.target.value)
    } else if (name === 'password') {
      validate('passError', e.target.value)
    } else validate('usernameError', e.target.value)

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
    else if(name==='passError') setPassError(errorVal)
    //console.log(error)
    else setUsernameError(errorVal)

  }

  const handleBlur = (e: any) => {
    setEmailError({ ...emailError, format: !validateEmail(e.target.value) })
  }

  const handleSubmit = (evt: any) => {
    evt.preventDefault();


    setResError({ ...resError, error: false })


    validate('passError', signup.password)
    validate('emailError', signup.email)
    validate('usernameError', signup.username)


    if (!passError && !emailError.emptyEmail && !emailError.format) {
      let user = {
        email: signup.email,
        username: signup.username,
        password: signup.password,
        companyID: props.match.params.id
      }
      
      axios.post(`http://localhost:8080/register`, user)
        .then(res => {
          console.log(res);
          console.log(res.data);
          // Hacer siwtch con los casos de errores y adentro del OK esto:
          // Llamar response errors
          // Cambiar esto a response handler
          responseHandler(res)
        }, (error) => {
          //setResError({ ...resError, error: true, msg: error})
          window.alert(error)
          //setResError({ ...resError, error: true, msg: error})
        })
    }
  }

  const responseHandler = (res: any) => {
    console.log(res)
    if (res.statusText === "OK") {

      switch (res.data.status) {
        case 'success':
          setSubmit(true)
          //const user = JSON.parse(res.data)
          const user:any = {
            user: res.data.user,
            companyID: res.data.companyID,
            token: res.data.token,
            usersCompanies: res.data.usersCompanies
          }

          if(context) context.setSession(user)
          console.log('SESION')
         // if(context) context.setSession(res.data)
          if(context) console.log(context.session)
          //setSession(user)
          // Aqui debo cargar el estado y manejarlo
          window.sessionStorage.setItem("session", JSON.stringify(user));
          //window.sessionStorage.setItem("user", res.data.user)
          window.alert(`
                  El usuario ${res.data.user.email} ha sido registrado
                  El token de sesion es ${res.data.token}
                  Con Status ${res.status}
                  `)
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

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            
      </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2} className="container">
              <Grid item xs={12} >
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
                  error={emailError.emptyEmail || emailError.format}
                  helperText={emailError.emptyEmail || emailError.format ? 'Please enter a valid Email' : ' '}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="Uname"
                  value={signup.username}
                  onChange={handleChange}
                  error={usernameError}
                  helperText={usernameError ? 'Please enter a valid password' : ' '}

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
                  error={passError}
                  helperText={passError ? 'Please enter a valid password' : ' '}
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
            Registrar
        </Button>
            <Grid container justify="flex-end">
              <Grid item>
                {'Si ya estás registrado con otra empresa de envíos ve al '}
                <Link to={`/login${props.params.id}`}>
                  login
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
withRouter(SignUp)
