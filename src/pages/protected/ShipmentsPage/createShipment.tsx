

import React from 'react';
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Chip, FormGroup, FormControlLabel, Checkbox, FormLabel, Divider, Radio } from '@material-ui/core';
import useStyles from "./styles"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Snackbars from '../../Snackbar/snackbar';

type response = {
    tracking_id: string,
    status: string | null,
    name: string,
    qty: number,
    item_id: number,
    package_id: number
}



export default function CreateShipmentForm(props: any) {
    const classes = useStyles();
    const closeError = () => {
        props.setOpen(true)
    }
    const items = props.selectedItems
    // Arreglo de response

    // {itemid: , checked:}
    //props.selectedItems.map 

    return (
            items.length > 0 ?
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title">{props.action}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.msg}
                </DialogContentText>
 
                <form onSubmit={props.handleShipmentWay}>
                    
                    
                        <List>
                        {items.map((value: response) => {
                            const labelId = `checkbox-list-label-${value.name}`;

                            return (
                                <ListItem key={value.item_id} role={undefined} dense button >
                                    <ListItemText id={labelId} primary={`${value.name}`} />
                                </ListItem>
                            );
                        })}
                    </List>
                    <FormLabel>Tipo de envío</FormLabel>
                    <div className={classes.divider}></div>
                    <FormControlLabel value="Aéreo" control={<Radio checked={props.selectedValue === 'Aéreo'}
                        onChange={props.handleChangeShipWay}
                        value="Aéreo"
                        name="aereo"
                        inputProps={{ 'aria-label': 'Aéreo' }} />} label="Aéreo" />

                    <FormControlLabel value="Aéreo" control={<Radio checked={props.selectedValue === 'Marítimo'}
                        onChange={props.handleChangeShipWay}
                        value="Marítimo"
                        name="maritimo"
                        inputProps={{ 'aria-label': 'Marítimo' }} />} label="Marítimo" />

                    <DialogActions>
                        <Button onClick={props.handleClose} color="secondary">
                            Cancelar
                        </Button>
                        <Button color="secondary" type="submit" onClick={props.handleClose}>
                            {props.action === "Crear envío" ? 'Crear' : 'Editar'}
                        </Button>
                    </DialogActions>
                    </form>
                    

            </DialogContent>
        </Dialog >
        :
                    
        props.openError ? <Snackbars showInfo={props.openError} error={true} set={props.setOpenError} variant="error" msg="Debe seleccionar al menos un artículo"></Snackbars> : null
    )
}