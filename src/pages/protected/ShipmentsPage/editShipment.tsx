
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
import { Button, Box, Container, Table, Paper, TableBody, Link, TextField, List, ListItem, ListItemText, Menu, MenuItem } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import axios, { AxiosResponse } from 'axios';
import { userContext } from '../../../App';
import useStyles from './styles'
import DeleteIcon from '@material-ui/icons/Delete';
import CreateShipmentForm from "../ShipmentsPage/createShipment"
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

export default function EditShipment(props: any) {
    const classes = useStyles();
    //let index = -1

    const context = React.useContext(userContext)
    console.log("Contexto en Items page")
    if (context && context.session) console.log(context.session)
    let user: any = null
    if (context && context.session) user = JSON.stringify(context.session)
    if (user) user = JSON.parse(user)

    const [item, setItem] = React.useState(
        {
            name: "",
            quantity: 0,
            tracking_id: ""
        }
    )


    const [index, setIndex] = React.useState(-1)
    const [selectedItems, setSelectedItems] = React.useState<response[]>([])
    const [deselectedItems, setDeselectedItems] = React.useState<response[]>([])

    function handleSelectedItem(index: number) {
        const itemSelected = items[index]
        const newSelected = [...selectedItems]
        const i = selectedItems.findIndex((item) => {
            return item.item_id === itemSelected.item_id
        })

        if (i > 0) {
            newSelected.splice(i, 1);
            setDeselectedItems([...deselectedItems, itemSelected])
        }
        else
            newSelected.push(itemSelected)
        console.log(selectedItems)
        console.log("ITEM SELECTED")
        setSelectedItems(newSelected)
        console.log(items[index])
    }
    // Items para el ItemsPage 

    const set = (itemsList: response[]) => {
        // Ordeno los checked primero que coinciden en shipmentId con el id que paso como parametro
        // Al final setItems 
        // selectedItems son los elegidos, si lo deschequeo entonces lo elimino de ahi
        // si chequeo entonces lo agrego
        console.log("INICIO")
        console.log(itemsList)
        let list: response[] = [...itemsList]

        const itemsFirst = list.filter(item => item.ShipmentId === parseInt(props.id))
        setSelectedItems(itemsFirst)
        console.log("ITEM LIST!!!")
        console.log(itemsList)
        const itemsLast = list.filter(item => item.ShipmentId !== parseInt(props.id) && item.ShipmentId === null)

        setItems([...itemsFirst, ...itemsLast])
        //setItems(list)
    }

    const [items, setItems] = React.useState<response[]>([])

    const [action, setAction] = React.useState("")

    const [redirect, setRedirect] = React.useState(false)


    // Handle request for items, save in row
    // Cargo el contexto para sacar el user.id y el companyid
    const fetchItems = () => {

        axios
            .get(`${process.env.URL}/items`, {

                headers: {
                    userToken: (user as any).token,
                    companyID: (context as any).session.isCompany ? (user as any).user.id : (user as any).company.id,
                    iscompany: (context as any).session.isCompany
                },

            })

            .then((res: AxiosResponse<response[]>) => {
                if ((context as any).session.isCompany) {
                    axios.get(`${process.env.URL}/getShipment`, { headers: { userToken: (user as any).token, id: props.id } })
                        .then((res) => {
                            setValues({
                                lbs_weight: res.data.shipment.lbs_weight,
                                pvl_weight: res.data.shipment.pvl_weight,
                                cubic_feet_volume: res.data.shipment.cubic_feet_volume,
                                number_of_boxes: res.data.shipment.number_of_boxes
                            })
                        })
                }
                //setItems(res.data)

                set(res.data)

            })

            .catch((error: any) => {

                window.alert(error)

            })

    }

    React.useEffect(() => { fetchItems() }, []);

    React.useEffect(() => { fetchItems() }, [(user as any).company.id]);

    const handleSave = () => {
        console.log("SELECTED ITEMS SAVED")
        console.log(selectedItems)
        console.log("DESELECTED ITEMS SAVED")
        console.log(deselectedItems)
        const edits = {
            lbs_weight: values.lbs_weight,
            pvl_weight: values.pvl_weight,
            cubic_feet_volume: values.cubic_feet_volume,
            number_of_boxes: values.number_of_boxes,
            status: status
        }
        const req = {
            selectedItems: selectedItems,
            deselectedItems: deselectedItems,
            ShipmentId: props.id,
            companyEdits: edits
        }
        axios
            .patch(`${process.env.URL}/shipments/edit`, req,
                {
                    headers: {
                        'userToken': (user as any).token,
                        'companyID': (user as any).company.id,
                        iscompany: (context as any).session.isCompany
                    }
                })

            .then((res: any) => {

                setRedirect(true)

            })

            .catch((error: any) => {

                window.alert(error)

            })
    }
    const [values, setValues] = React.useState({
        lbs_weight: 0.0,
        pvl_weight: 0.0,
        cubic_feet_volume: 0.0,
        number_of_boxes: 0
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [status, setStatus] = React.useState("POR EMPACAR")

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

    const options = [
        "POR EMPACAR", "EMPACADO", "EN TRANSITO", "EN DESTINO"
    ]; 

    return (
        <div className={classes.paper}>
            {
                redirect ? <Redirect to="/dashboard/shipments"></Redirect> : null
            }
            <Container className={classes.container}>
                {
                    ((context as any).session as any).isCompany ?
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                id="lbs_weight"
                                label="Peso LBS"
                                name="lbs_weight"
                                className={classes.textField}
                                value={values.lbs_weight}
                                onChange={handleChange}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="pvl_weight"
                                label="Peso PVL"
                                name="pvl_weight"
                                className={classes.textField}
                                value={values.pvl_weight}
                                onChange={handleChange}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="cubic_feet_volume"
                                label="Volumen pie cúbico"
                                name="cubic_feet_volume"
                                className={classes.textField}
                                value={values.cubic_feet_volume}
                                onChange={handleChange}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="standard-name"
                                label="Número de cajas"
                                name="number_of_boxes"
                                className={classes.textField}
                                value={values.number_of_boxes}
                                onChange={handleChange}
                                margin="normal"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
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
                                            onClick={(event: any) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        </form>
                        :
                        null

                }
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
                            {((context as any).session.isCompany ? selectedItems : items).map((item, index) => (
                                <TableRow key={item.item_id} hover>
                                    <TableCell component="th" scope="row" padding="checkbox">
                                        {`${item.name}
                                          Cantidad: ${item.qty}
                                        `}
                                    </TableCell>
                                    <TableCell align="right">{item.tracking_id}</TableCell>
                                    <TableCell align="right">{item.status}</TableCell>
                                    {
                                        !((context as any).session as any).isCompany ?
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={selectedItems.findIndex((itemSelected) => {
                                                    return itemSelected.item_id === item.item_id
                                                }) !== -1} onClick={(e: any) => handleSelectedItem(index)} />
                                            </TableCell>
                                            :
                                            null

                                    }

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

