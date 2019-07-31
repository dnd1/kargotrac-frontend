import React from 'react';
import useStyles from './styles';
import Input from '@material-ui/core/Input';
import { Container, InputAdornment } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Email from '@material-ui/icons/Email';
import { InputLabel } from '@material-ui/core';
import SideBar from '../SideBar'

export const UserProfile = () => {
    const classes = useStyles()

    return (
        <div>
        <SideBar></SideBar>
        <Container className={classes.container} maxWidth="xs">
            <Input
                placeholder="Username"
                value="Disabled"
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
                value="Disabled"
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
                inputProps={{
                    'aria-label': 'description',
                }}
                fullWidth
            />
            <Input
                placeholder="Número de teléfono #1"
                className={classes.input}
                inputProps={{
                    'aria-label': 'description',
                }}
                fullWidth
            />
            <Input
                placeholder="Número de teléfono #2"
                className={classes.input}
                inputProps={{
                    'aria-label': 'description',
                }}
                fullWidth
            />

        </Container>
        </div>
    )

}