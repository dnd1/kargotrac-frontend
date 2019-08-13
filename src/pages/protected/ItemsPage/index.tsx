
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
import PopUp from './popup';
import axios, { AxiosResponse } from 'axios';
import { userContext } from '../../../App';
import { useStyles } from './styles'
import DeleteIcon from '@material-ui/icons/Delete';
import CreateShipmentForm from "../ShipmentsPage/createShipment"





type response = {
    tracking_id: string,
    status: string | null,
    name: string,
    qty: number,
    item_id: number,
    package_id: number
}

export default function ItemsPage() {
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


    function handleSelectedItem(index: number) {
        const itemSelected = items[index]
        const newSelected = [...selectedItems]
        const i = selectedItems.findIndex((item) => {
            return item.item_id === itemSelected.item_id
        })

        if (i > 0) {
            newSelected.splice(i, 1);
        }
        else
            newSelected.push(itemSelected)
        console.log(selectedItems)
        console.log("ITEM SELECTED")
        setSelectedItems(newSelected)
        console.log(items[index])
    }

    function handleChangeSelect(value: any) {
        console.log("ESTE ES EL VALUE!!!!!!!!!!")
        console.log(value)
        setItem({ ...item, tracking_id: value })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(item)
        const { name, value } = e.target
        console.log("Entre a handle change")
        console.log(`name: ${name} and value: ${value} `)
        setItem({ ...item, [name]: value })

        if (e.target.name === "name") setNameError(e.target.value.length === 0)
        else if (e.target.name === "quantity") setQtyError(parseInt(e.target.value) === 0)
    }
    // ERROR HANDLER


    const [nameError, setNameError] = React.useState(false)
    const [qtyError, setQtyError] = React.useState(false)

    const [selectedValue, setSelectedValue] = React.useState('Aéreo');

    function handleChangeShipWay(event: React.ChangeEvent<HTMLInputElement>) {
        // Los seleccionados son los que llevaran este tipo de envio, luego debo eliminarlos de selectedItems y agregarlos
        // a selectedShiypmentWay
        setSelectedValue(event.target.value);
        console.log(`nameeee ${event.target.name}`)
    }
    const handleShipmentWay = (e: any) => {
        e.preventDefault()

        // Post request a agregar envio
        console.log(selectedItems)
        const req = {
            items: selectedItems,
            shippingWay: selectedValue
        }
        const emptyItems: response[] = []
        setSelectedItems(emptyItems)
        axios.post(`http://localhost:8080/shipments`, req, { headers: { 'userToken': (user as any).token, 'companyID': (user as any).companyID } })
            .then(res => {
                console.log("AQUIIII")
                console.log(res)
                //
                const emptyItems: response[] = []
                setSelectedItems(emptyItems)

            }, (error) => {
                window.alert(error)

            })
    }

    const validate = (name: any, value: any) => {
        let notValid = false
        if (value.length === 0 || value === 0) notValid = true

        if (name === "name") setNameError(notValid)
        else setQtyError(notValid)


    }

    const postReq = (req: any) => {
        axios.post(`http://localhost:8080/items`, req, { headers: { 'userToken': (user as any).token, 'companyID': (user as any).companyID } })
            .then(res => {
                setItems([...items, res.data])
                //
            }, (error) => {
                window.alert(error)

            })
    }

    const patchReq = (req: any) => {
        axios.patch(`http://localhost:8080/items`, req, { headers: { 'userToken': (user as any).token, 'companyID': (user as any).companyID } })
            .then(res => {
                //setItems(res.data)
                //
                console.log(res.data)
                console.log("ESTO ES ITEMS")
                console.log(items.slice(0, index))
                console.log(items.slice(index + 1, items.length - 1))
                setItems([...items.slice(0, index), res.data, ...items.slice(index + 1, items.length)])
            }, (error) => {
                window.alert(error)

            })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // Validaciones
        validate("name", item.name)
        validate("quantity", item.quantity)


        if (item.name.length > 0 && item.quantity > 0) {
            const req = {
                name: item.name,
                quantity: item.quantity,
                tracking_id: item.tracking_id,
                userID: (user as any).user.id,
                companyID: (user as any).companyID
            }
            if (action === "add") postReq(req)
            else if (action === "edit") {
                // Deberia editsrlo despues de saber que todo esta bien
                const editItem: response = {
                    tracking_id: item.tracking_id,
                    status: items[index].status,
                    name: item.name,
                    qty: item.quantity,
                    item_id: items[index].item_id,
                    package_id: items[index].package_id
                }
                console.log("ITEM EDITADO")
                console.log(editItem)
                //setItems([...items.slice(0, index),( editItem as response),...items.slice(index + 1, items.length)])
                patchReq(editItem)
            }

        } else {
            console.log("Request no enviado!")
        }
    }

    // Items para el ItemsPage 


    const [items, setItems] = React.useState<response[]>([])

    const [action, setAction] = React.useState("")


    const [open, setOpen] = React.useState(false);
    function handleClickOpen(event: any, i: number, action: string) {
        //setEditableItem(items[index])
        console.log("Estos son los items")
        console.log(items)
        if (i > -1) {
            setItem({
                name: items[i].name,
                quantity: items[i].qty,
                tracking_id: items[i].tracking_id
            })
        }
        if (action === "add") setItem({
            name: "",
            quantity: 0,
            tracking_id: ""
        })
        setIndex(i)
        setAction(action)
        //setCurrent({items[i]})
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    // DELETE

    const handleDelete = (id: any, index: number) => {
        const req = {
            item_id: id,
            package_id: items[index].package_id
        }
        axios.delete(`http://localhost:8080/items`,
            {
                headers: { 'userToken': (user as any).token, 'companyID': (user as any).companyID }, data: {
                    tracking_id: items[index].tracking_id,
                    status: items[index].status,
                    name: items[index].name,
                    qty: items[index].qty,
                    item_id: id,
                    package_id: items[index].package_id
                }
            },
        )
            .then((res: any) => {
                //setItems(res.data)
                //
                console.log(`ITEM DELETED ${id}`)
                setItems([...items.slice(0, index), ...items.slice(index + 1, items.length)])
            }, (error: any) => {
                window.alert(error)

            })
    }

    const [openShipment, setOpenShipment] = React.useState(false)
    const handleOpenShipment = (e: any) => {
        // Set open el popup de create shipment
        setOpenShipment(true)
        console.log("Open shipment")
    }

    function handleCloseShipment() {
        setOpenShipment(false);
    }
    // Handle request for items, save in row
    // Cargo el contexto para sacar el user.id y el companyid
    const fetchItems = () => {

        axios
            .get(`http://localhost:8080/items`, {

                headers: { userToken: (user as any).token, companyID: (user as any).companyID },

            })

            .then((res: AxiosResponse<response[]>) => {

                setItems(res.data)

            })

            .catch((error: any) => {

                window.alert(error)

            })

    }

    React.useEffect(() => { fetchItems() }, []);

    React.useEffect(() => { fetchItems() }, [(user as any).companyID]);

    // Cuando haga click en editar, tomo el indice y muestro esa informacion, y en vez de tener un boton de agregar tendre el de guardar
    // Set open y open debo hacer uni oara crear y uno para editar para evitar cocnflictos 
    // Al igual con los handlers. 
    // Probar si sirve con un solo hanldeSubmit 

    return (
        <div className={classes.paper}>
            <Toolbar
                className={classes.root}
            >

                <div className={classes.title}>

                    <Typography variant="h6" id="tableTitle">

                    </Typography>

                </div>
                <Box flexGrow={1}></Box>
                <div className={classes.actions}>
                    <Button variant="outlined" color="primary" className={classes.button} onClick={(event: any) => handleClickOpen(event, -1, "add")}>
                        Agregar artículo{' '}
                    </Button>
                    <Button variant="outlined" color="primary" className={classes.button} onClick={(event: any) => handleOpenShipment(event)} >
                        Crear envío
            </Button>
                </div>
            </Toolbar>
            <PopUp
                setOpen={setOpen}
                item={item}
                action={action === "edit" ? "Editar artículo" : "Agregar artículo"}
                open={open}
                handleClose={handleClose}
                onSubmit={handleSubmit}
                handleChange={handleChange}
                handleNameError={setNameError}
                handleQtyError={setQtyError}
                name={item.name}
                qty={item.quantity}
                nameError={nameError}
                qtyError={qtyError}
                msg=""
                suggestions={items}
                setItem={setItem}
                handleChangeSelect={handleChangeSelect}
            >
            </PopUp>
            <CreateShipmentForm
                open={openShipment}
                action={"Crear envío"}
                handleClose={handleCloseShipment}
                selectedItems={selectedItems}
                selectedValue={selectedValue}
                handleChangeShipWay={handleChangeShipWay}
                handleShipmentWay={handleShipmentWay}
            >
            </CreateShipmentForm>
            <Container className={classes.container}>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow hover>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell align="right">Cantidad</TableCell>
                                <TableCell align="right">Número del paquete</TableCell>
                                <TableCell align="right">Estatus del paquete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, index) => (
                                <TableRow key={item.item_id} hover>
                                    <TableCell padding="checkbox">
                                        <IconButton disabled={items[index].status !== "PENDING" ? false : true} onClick={(event: any) => handleClickOpen(event, index, "edit")}>
                                            <Edit></Edit>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell padding="checkbox">
                                        <IconButton disabled={items[index].status !== "PENDING" ? false : true} onClick={(e: any) => handleDelete(item.item_id, index)}>
                                            <DeleteIcon></DeleteIcon>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell component="th" scope="row" padding="checkbox">
                                        {item.name}
                                    </TableCell>
                                    <TableCell align="right">{item.qty}</TableCell>
                                    <TableCell align="right">{item.tracking_id}</TableCell>
                                    <TableCell align="right">{item.status}</TableCell>
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={selectedItems.findIndex((itemSelected)=> {
                                            return itemSelected.item_id === item.item_id
                                        }) !== -1}onClick={(e: any) => handleSelectedItem(index)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        </div>
    );
}

