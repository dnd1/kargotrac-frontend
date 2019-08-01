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
    let user = null
    if (context && context.session) user = JSON.stringify(context.session)
    if (user) user = JSON.parse(user)
    console.log(user)
    const userToken = user.token
    const [edit, setEdit] = React.useState({
        address: "",
        phone1: "",
        phone2: ""

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

        axios.patch(`http://localhost:8080/users/me`, update, {headers: {'userToken': userToken}})
            .then(res => {
                console.log(res)
                //
            }, (error) => {
                //setResError({ ...resError, error: true, msg: error})
                window.alert(error)
                //setResError({ ...resError, error: true, msg: error})
            })
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