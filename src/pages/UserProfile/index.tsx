import React from 'react';
import useStyles from './styles';
import Input from '@material-ui/core/Input';
import { Container, InputAdornment, Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Email from '@material-ui/icons/Email';
import { InputLabel } from '@material-ui/core';
import SideBar from '../SideBar'
import { userContext } from '../../App'
import axios from 'axios';

export const UserProfile = () => {
    const classes = useStyles()
    const context = React.useContext(userContext)
    console.log('CONTEXTO!')
    if (context && context.session) console.log(context.session)
    let user = null
    // COMO CARGAR EL CONTEXTO =======>>>>
    if (context && context.session) user = JSON.stringify(context.session)
    if (user) user = JSON.parse(user)

    console.log('este es el usuario')
    console.log(user)

    const userToken = user.token
    const companyID = user.companyID
    const [edit, setEdit] = React.useState({
        address:  user ? user.user.address: "",
        phone1: user ? user.user.phone1: "",
        phone2: user ? user.user.phone2: ""

    })

    const [resError, setResError] = React.useState({
        error: false,
        msg: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEdit({ ...edit, [e.target.name]: e.target.value })
        console.log(edit)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        window.alert(`Submitting ${edit.address}`)
        let update = {
            address: edit.address,
            phone1: edit.phone1,
            phone2: edit.phone2
        }

        axios.patch(`http://localhost:8080/users/me`, update, { headers: { 'userToken': userToken , 'companyID': companyID } })
            .then(res => {
                console.log('Respuesta de actualizacion')
                console.log(res.data)
                responseHandler(res)
                //
            }, (error) => {
                //setResError({ ...resError, error: true, msg: error})
                window.alert(error)
                //setResError({ ...resError, error: true, msg: error})
            })
    }

    const responseHandler = (res: any) => {
        
        if (res.statusText === "OK") {

            switch (res.data.status) {
                case 'success':

                    // Probar que actualice la sesion y que la muestre al darle a guardar
                    // Hago get para sustituir y ya
                    // Hacer get request para actualizar los datos? ==> mientras si

                    //if(res.data.updatedFields.address)
                    
                    axios.get(`http://localhost:8080/users/me`, { headers: { 'userToken': userToken, 'companyID': companyID } })
                        .then(res => {
                            console.log('GET USER')
                            if (context) context.setSession(res.data)
                            if(context && context.session) console.log(context.session)

                            //
                        }, (error) => {
                            //setResError({ ...resError, error: true, msg: error})
                            window.alert(error)
                            //setResError({ ...resError, error: true, msg: error})
                        })
                        if (context) context.setSession(res.data)
                        

                    

                    

                    window.alert(`
                        El usuario ${res.data.user.email} ha sido actualizado
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
            <SideBar></SideBar>
            <Container className={classes.container} maxWidth="xs">
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Input
                        placeholder="Username"
                        value={user.user.username}
                        className={classes.input}
                        disabled
                        inputProps={{
                            'aria-label': 'description',
                        }}
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                        fullWidth
                    />
                    <Input
                        placeholder="Email"
                        value={user.user.email}
                        className={classes.input}
                        disabled
                        inputProps={{
                            'aria-label': 'description',
                        }}
                        startAdornment={
                            <InputAdornment position="start">
                                <Email />
                            </InputAdornment>
                        }
                        fullWidth
                    />
                    <Input
                        placeholder="Dirección"
                        className={classes.input}
                        value={ edit.address}
                        name="address"
                        inputProps={{
                            'aria-label': 'description',
                        }}
                        fullWidth
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="Número de teléfono #1"
                        className={classes.input}
                        value={  edit.phone1}
                        name="phone1"
                        inputProps={{
                            'aria-label': 'description',
                        }}
                        fullWidth
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="Número de teléfono #2"
                        className={classes.input}
                        value={  edit.phone2}
                        name="phone2"
                        inputProps={{
                            'aria-label': 'description',
                        }}
                        fullWidth
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Guardar
                    </Button>
                </form>
            </Container>
        </div>
    )

}