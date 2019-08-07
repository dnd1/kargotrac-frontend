

import React from 'react';
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core';

export default function PopUp(props: any) {
    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title">{props.action}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.msg}
            </DialogContentText>
                <form noValidate onSubmit={props.onSubmit}>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Nombre del artículo"
                        type="text"
                        fullWidth
                        onChange={props.handleChange}
                        error={props.nameError}
                        helperText={props.nameError ? 'Please enter a valid name' : ' '}
                        
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="quantity"
                        name="quantity"
                        label="Cantidad"
                        type="number"
                        fullWidth
                        onChange={props.handleChange}
                        error={props.qtyError}
                        helperText={props.qtyError ? 'Please enter a valid name' : ' '}
                        
                    />
                    <TextField
                        autoFocus
                        name="tracking_id"
                        margin="dense"
                        id="package"
                        label="# Paquete"
                        type="text"
                        fullWidth
                        onChange={props.handleChange}
                    />
                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button color="primary" type="submit">
                            Agregar
                        </Button>
                    </DialogActions>


                </form>

            </DialogContent>
        </Dialog>
    )
}