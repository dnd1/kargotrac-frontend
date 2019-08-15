
import React from 'react';
import PropTypes, { number } from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { Button, Box, Container, Table, Paper, TableBody, Link, TextField, Menu, MenuItem, List, ListItem, ListItemText, FormControlLabel } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import axios, { AxiosResponse } from 'axios';
import { userContext } from '../../../App';
import useStyles from './styles'
import DeleteIcon from '@material-ui/icons/Delete';
import { Redirect } from 'react-router';





type response = {
    tracking_id: string,
    status: string | null,
    name: string,
    qty: number,
    item_id: number,
    package_id: number,
    ShipmentId: number
}


export default function EditPackage(props: any) {
    const classes = useStyles();
    //let index = -1

    const context = React.useContext(userContext)
    console.log("Contexto en Items page")
    if (context && context.session) console.log(context.session)
    let user: any = null
    if (context && context.session) user = JSON.stringify(context.session)
    if (user) user = JSON.parse(user)


    // Items para el ItemsPage 



    const [items, setItems] = React.useState<response[]>([])
    const [oldPackage, setOldPackage] = React.useState(
        {
            tracking_id: "",
            seller: ""
        }
    )
    const [packageEdit, setPackage] = React.useState({
        tracking_id: null,
        seller: null
    })

    const [status, setStatus] = React.useState('PENDIENTE')

    const [redirect, setRedirect] = React.useState(false)

    // Handle request for items, save in row
    // Cargo el contexto para sacar el user.id y el companyid
    const fetchItems = () => {
        console.log("?????????????????//")
        console.log(props.id)
        axios
            .get(`http://localhost:8080/packages/items`, {

                headers: { userToken: (user as any).token, companyID: (user as any).companyID, trackingid: props.id },


            })

            .then((res: any) => {

                //setItems(res.data)
                // Debo devolver info del package
                setItems(res.data.items)
                setOldPackage({
                    tracking_id: res.data.package.tracking_id,
                    seller: res.data.package.seller
                })
                setPackage({
                    tracking_id: res.data.package.tracking_id,
                    seller: res.data.package.seller
                })
                setStatus(res.data.package.status)
                console.log(res.data)

            })

            .catch((error: any) => {

                window.alert(error)

            })

    }

    React.useEffect(() => { fetchItems() }, []);

    React.useEffect(() => { fetchItems() }, [(user as any).companyID]);

    const handleSave = () => {

        const req = {
            old_tracking_id: oldPackage.tracking_id,
            new_tracking_id: packageEdit.tracking_id,
            old_seller: oldPackage.seller,
            new_seller: packageEdit.seller,
            status: status
        }
        axios
            .patch(`http://localhost:8080/packages/edit`, req, { headers: { 'userToken': (user as any).token, 'companyID': (user as any).companyID , iscompany: (context as any).session.isCompany} })

            .then((res: any) => {

                //setItems(res.data)
                setRedirect(true)
                console.log(res)

            })

            .catch((error: any) => {

                window.alert(error)

            })
    }

    const options = [
        'Pendiente',
        'En almacen',
    ];
    const handleChange = (e: any) => {
        const { name, value } = e.target
        console.log(name, value)
        setPackage({ ...packageEdit, [name]: value })
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    function handleClickListItem(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleMenuItemClick(event: React.MouseEvent<HTMLElement>, index: number) {
        setSelectedIndex(index);
        setStatus(options[index])
        setAnchorEl(null);
    }

    function handleClose() {
        setAnchorEl(null);
    }
    // Cuando haga click en editar, tomo el indice y muestro esa informacion, y en vez de tener un boton de agregar tendre el de guardar
    // Set open y open debo hacer uni oara crear y uno para editar para evitar cocnflictos 
    // Al igual con los handlers. 
    // Probar si sirve con un solo hanldeSubmit 

    return (
        <div className={classes.paper}>
            {
                redirect ? <Redirect to="/dashboard/packages"></Redirect> : null
            }
            <Container className={classes.container}>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="tracking"
                        name="tracking_id"
                        label="Número de paquete"
                        className={classes.textField}
                        value={packageEdit.tracking_id}
                        onChange={handleChange}
                        margin="normal"
                        disabled={(context as any).session.isCompany}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="seller"
                        name="seller"
                        label="Vendedor"
                        className={classes.textField}
                        value={packageEdit.seller}
                        onChange={handleChange}
                        margin="normal"
                        disabled={(context as any).session.isCompany}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {
                        ((context as any).session as any).isCompany ?
                            <div className={classes.rootMenu}>
                                <Typography variant="subtitle1">
                                    Estado del paquete
                                </Typography>
                                <List component="nav" aria-label="Device settings">
                                    <ListItem
                                        button
                                        aria-haspopup="true"
                                        aria-controls="lock-menu"
                                        aria-label="when device is locked"
                                        onClick={handleClickListItem}
                                    >
                                        <ListItemText primary={status} />
                                    </ListItem>
                                </List>
                                <Menu
                                    id="lock-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            onClick={event => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div> :
                            null
                    }
                </form>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow hover>
                                <TableCell>Nombre</TableCell>
                                <TableCell align="right">Número del paquete</TableCell>
                                <TableCell align="right">Estatus del paquete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, index) => (
                                <TableRow key={item.item_id} hover>
                                    <TableCell component="th" scope="row" padding="checkbox">
                                        {`${item.name}
                                          Cantidad: ${item.qty}
                                        `}
                                    </TableCell>
                                    <TableCell align="right">{item.tracking_id}</TableCell>
                                    <TableCell align="right">{item.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Button variant="outlined" color="primary" className={classes.button} onClick={(event: any) => handleSave()} >
                    Guardar
                </Button>
            </Container>
        </div>
    );
}

