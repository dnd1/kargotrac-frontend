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
    let user: any = null
    // COMO CARGAR EL CONTEXTO =======>>>>
    if (context && context.session) user = JSON.stringify(context.session)
    if (user) user = JSON.parse(user)


    console.log('este es el usuario')
    console.log(user)

    const userToken = user.token
    const companyID = user.companyID
    const [edit, setEdit] = React.useState({
        address: user ? user.user.address : "",
        phone1: user ? user.user.phone1 : "",
        phone2: user ? user.user.phone2 : ""

    })

    const [companyInfo, setCompanyInfo] = React.useState({
        logo: user ? user.user.logo : "",
        primary_color: user ? user.user.primary_color : "",
        secondary_color: user ? user.user.secondary_color : "",
        pvl_factor: user ? user.user.pvl_factor : 0.0,
        maritime_cubic_feet_price: user ? user.user.maritime_cubic_feet_price : 0.0,
        air_pound_price: user ? user.user.air_pound_price : 0.0
    })

    const [resError, setResError] = React.useState({
        error: false,
        msg: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEdit({ ...edit, [e.target.name]: e.target.value })
        console.log(edit)
    }

    const handleChangeExtended = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value })
        console.log(edit)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        window.alert(`Submitting ${edit.address}`)
        let update: any = {}
        if ((context as any).session.isCompany) {
            update = {
                address: edit.address,
                phone1: edit.phone1,
                logo: companyInfo.logo,
                primary_color: companyInfo.primary_color,
                secondary_color: companyInfo.secondary_color,
                pvl_factor: companyInfo.pvl_factor,
                maritime_cubic_feet_price: companyInfo.maritime_cubic_feet_price,
                air_pound_price: companyInfo.air_pound_price

            }
        } else {
            update = {
                address: edit.address,
                phone1: edit.phone1,
                phone2: edit.phone2
            }
        }

        axios.patch(`http://localhost:8080/users/me`, update, {
            headers: {
                userToken: (user as any).token,
                companyID: (context as any).session.isCompany ? (user as any).user.id : (user as any).companyID,
                iscompany: (context as any).session.isCompany
            }
        })
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

                    axios.get(`http://localhost:8080/users/me`, {
                        headers: {
                            userToken: (user as any).token,
                            companyID: (context as any).session.isCompany ? (user as any).user.id : (user as any).companyID,
                            iscompany: (context as any).session.isCompany
                        }
                    })
                        .then(res => {
                            console.log('GET USER')
                            if (!(context as any).session.isCompany) {
                                const user: any = {
                                    user: res.data.user,
                                    companyID: res.data.companyID,
                                    token: res.data.token,
                                    usersCompanies: context && context.session ? (context.session as any).usersCompanies : '',
                                    isCompany: false
                                }


                                if (context) context.setSession(user)
                                //if (context && context.session) console.log(context.session)
                                window.sessionStorage.setItem("session", JSON.stringify(user));
                            } else {
                                const user: any = {
                                    user: res.data.user,
                                    isCompany: true,
                                    token: res.data.token
                                }
                                if (context) context.setSession(user)
                                //if (context && context.session) console.log(context.session)
                                window.sessionStorage.setItem("session", JSON.stringify(user));
                            }



                        }, (error) => {
                            window.alert(error)
                        })

                    console.log(res.data)
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
                        value={edit.address}
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
                        value={edit.phone1}
                        name="phone1"
                        inputProps={{
                            'aria-label': 'description',
                        }}
                        fullWidth
                        onChange={handleChange}
                    />
                    {
                        !((context as any).session as any).isCompany ?
                            <Input
                                placeholder="Número de teléfono #2"
                                className={classes.input}
                                value={edit.phone2}
                                name="phone2"
                                inputProps={{
                                    'aria-label': 'description',
                                }}
                                fullWidth
                                onChange={handleChange}
                            /> :
                            null
                    }
                    {
                        ((context as any).session as any).isCompany ?
                            <div>
                                <Input
                                    placeholder="Logo"
                                    className={classes.input}
                                    value={companyInfo.logo}
                                    name="logo"
                                    inputProps={{
                                        'aria-label': 'description',
                                    }}
                                    fullWidth
                                    onChange={handleChangeExtended}
                                />
                                <Input
                                    placeholder="Color primario"
                                    className={classes.input}
                                    value={companyInfo.primary_color}
                                    name="primary_color"
                                    inputProps={{
                                        'aria-label': 'description',
                                    }}
                                    fullWidth
                                    onChange={handleChangeExtended}
                                />
                                <Input
                                    placeholder="Color secundario"
                                    className={classes.input}
                                    value={companyInfo.secondary_color}
                                    name="secondary_color"
                                    inputProps={{
                                        'aria-label': 'description',
                                    }}
                                    fullWidth
                                    onChange={handleChangeExtended}
                                />
                                <Input
                                    placeholder="Factor PVL"
                                    className={classes.input}
                                    value={companyInfo.pvl_factor}
                                    name="pvl_factor"
                                    inputProps={{
                                        'aria-label': 'description',
                                    }}
                                    fullWidth
                                    onChange={handleChangeExtended}
                                />
                                <Input
                                    placeholder="Precio de pie cúbico marítimo"
                                    className={classes.input}
                                    value={companyInfo.maritime_cubic_feet_price}
                                    name="maritime_cubic_feet_price"
                                    inputProps={{
                                        'aria-label': 'description',
                                    }}
                                    fullWidth
                                    onChange={handleChangeExtended}
                                />
                                <Input
                                    placeholder="Precio de libra aérea"
                                    className={classes.input}
                                    value={companyInfo.air_pound_price}
                                    name="air_pound_price"
                                    inputProps={{
                                        'aria-label': 'description',
                                    }}
                                    fullWidth
                                    onChange={handleChangeExtended}
                                />
                            </div>
                            :
                            null
                    }

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