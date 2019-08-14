
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
import { Button, Box, Container, Table, Paper, TableBody, Link } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import axios, { AxiosResponse } from 'axios';
import { userContext } from '../../../App';
import useStyles from './styles'
import DeleteIcon from '@material-ui/icons/Delete';
import CreateShipmentForm from "../ShipmentsPage/createShipment"





type response = {
    tracking_id: string,
    status: string | null,
    name: string,
    qty: number,
    item_id: number,
    package_id: number,
    ShipmentId: number
}

export default function EditShipment(props : any) {
    const classes = useStyles();
    //let index = -1

    const context = React.useContext(userContext)
    console.log("Contexto en Items page")
    if (context && context.session) console.log(context.session)
    let user: any = null
    if (context && context.session) user = JSON.stringify(context.session)
    if (user) user = JSON.parse(user)

    console.log("QUE CONOOOOO")
    console.log(user)
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
        let list : response [] = [...itemsList]

        const itemsFirst = list.filter(item => item.ShipmentId === parseInt(props.id))
        setSelectedItems(itemsFirst)
        const itemsLast = list.filter(item => item.ShipmentId !== parseInt(props.id))

        setItems([...itemsFirst, ...itemsLast])
        //setItems(list)
    }

    const [items, setItems] = React.useState<response[]>([])

    const [action, setAction] = React.useState("")



    // Handle request for items, save in row
    // Cargo el contexto para sacar el user.id y el companyid
    const fetchItems = () => {

        axios
            .get(`http://localhost:8080/items`, {

                headers: { userToken: (user as any).token, companyID: (user as any).companyID },

            })

            .then((res: AxiosResponse<response[]>) => {

                //setItems(res.data)
                set(res.data)

            })

            .catch((error: any) => {

                window.alert(error)

            })

    }

    React.useEffect(() => { fetchItems() }, []);

    React.useEffect(() => { fetchItems() }, [(user as any).companyID]);

    const handleSave = () => {
        console.log("SELECTED ITEMS SAVED")
        console.log(selectedItems)
        console.log("DESELECTED ITEMS SAVED")
        console.log(deselectedItems)
        const req = {
            selectedItems: selectedItems,
            deselectedItems: deselectedItems,
            ShipmentId: props.id
        }
        axios
        .patch(`http://localhost:8080/shipments/edit`, req, { headers: { 'userToken': (user as any).token, 'companyID': (user as any).companyID } })

        .then((res: any) => {

            //setItems(res.data)
            console.log(res)

        })

        .catch((error: any) => {

            window.alert(error)

        })
    }
    // Cuando haga click en editar, tomo el indice y muestro esa informacion, y en vez de tener un boton de agregar tendre el de guardar
    // Set open y open debo hacer uni oara crear y uno para editar para evitar cocnflictos 
    // Al igual con los handlers. 
    // Probar si sirve con un solo hanldeSubmit 

    return (
        <div className={classes.paper}>
            <Container className={classes.container}>
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
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={selectedItems.findIndex((itemSelected) => {
                                            return itemSelected.item_id === item.item_id
                                        }) !== -1} onClick={(e: any) => handleSelectedItem(index)} />
                                    </TableCell>
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

