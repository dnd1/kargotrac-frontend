

import React from 'react';
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core';
import IntegrationDownshift from "./downshift"

export default function PopUp(props: any) {
    const closeError = () => {
        props.setOpen(true)
    }

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
                        value={props.item.name}
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
                        value={props.item.quantity}
                        type="number"
                        fullWidth
                        onChange={props.handleChange}
                        error={props.qtyError}
                        helperText={props.qtyError ? 'Please enter a valid number' : ' '}

                    />

                    <IntegrationDownshift tracking_value={props.item.tracking_id} handleChange={props.handleChange}
                    handleChangeSelect = {props.handleChangeSelect}
                    suggestions={props.suggestions}></IntegrationDownshift>
                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button color="primary" type="submit" onClick={props.name && props.qty && props.name.length > 0 && props.qty > 0 ? props.handleClose : closeError}>
                            {props.action === "Editar artículo" ? 'Guardar' : 'Agregar'}
                        </Button>
                    </DialogActions>


                </form>

            </DialogContent>
        </Dialog>
    )
}