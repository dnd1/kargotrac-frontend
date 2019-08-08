
import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Container, ListItemIcon, ListSubheader, Table, Paper, TableBody } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import PopUp from './popup';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import axios, { AxiosResponse } from 'axios';
import { userContext } from '../../../App';
import { useStyles } from './styles'
import DeleteIcon from '@material-ui/icons/Delete';




const headRows = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Nombre del artículo' },
    { id: 'qty', numeric: true, disablePadding: false, label: 'Cantidad' },
    { id: 'tracking_id', numeric: true, disablePadding: false, label: '# Paquete' },
    { id: 'status', numeric: true, disablePadding: false, label: 'Estatus del paquete' },

];

function EnhancedTableHead(props: any) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: any) => (event: any) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        align={row.numeric ? 'right' : 'left'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={createSortHandler(row.id)}
                        >
                            {row.label}
                            {orderBy === row.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};



/* ********************* FORM PARA CREAR UN ITEM ************************/

const FormCreateItem = (props: any) => {

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(item)
        const { name, value } = e.target
        setItem({ ...item, [name]: value })
        if (e.target.name === "name") setNameError(e.target.value.length === 0)
        else setQtyError(e.target.value.length === 0)
    }

    // ERROR HANDLER

    const [nameError, setNameError] = React.useState(false)
    const [qtyError, setQtyError] = React.useState(false)

    const validate = (name: any, value: any) => {
        let notValid = false
        if (value.length === 0 || value === 0) notValid = true

        if (name === "name") setNameError(notValid)
        else setQtyError(notValid)


    }
    const handleSubmit = (e: any) => {
        e.preventDefault();

        // Validaciones
        validate("name", item.name)
        validate("quantity", item.quantity)


        if (!nameError && !qtyError) {
            const req = {
                name: item.name,
                quantity: item.quantity,
                tracking_id: item.tracking_id,
                userID: (user as any).user.id,
                companyID: (user as any).companyID
            }

            axios.post(`http://localhost:8080/items`, req, { headers: { 'userToken': (user as any).token, 'companyID': (user as any).companyID } })
                .then(res => {
                    console.log("este es el item:")
                    console.log(item)
                    console.log("Este es el response")
                    console.log(res)
                    //
                }, (error) => {
                    window.alert(error)

                })
        } else {
            console.log("Request no enviado!")
        }
    }

    return (
        <PopUp
            setOpen={props.setOpen}
            action={"Agregar artículo"}
            open={props.open}
            handleClose={props.handleClose}
            onSubmit={handleSubmit}
            handleChange={handleChange}
            handleNameError={setNameError}
            handleQtyError={setQtyError}
            nameError={nameError}
            qtyError={qtyError}
            msg=""
        >
        </PopUp>
    )
}



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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(item)
        const { name, value } = e.target
        setItem({ ...item, [name]: value })
        if (e.target.name === "name") setNameError(e.target.value.length === 0)
        else setQtyError(e.target.value.length === 0)
    }

    // ERROR HANDLER

    const [nameError, setNameError] = React.useState(false)
    const [qtyError, setQtyError] = React.useState(false)

    const validate = (name: any, value: any) => {
        let notValid = false
        if (value.length === 0 || value === 0) notValid = true

        if (name === "name") setNameError(notValid)
        else setQtyError(notValid)


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

            axios.post(`http://localhost:8080/items`, req, { headers: { 'userToken': (user as any).token, 'companyID': (user as any).companyID } })
                .then(res => {
                    console.log("este es el item:")
                    console.log(item)
                    console.log("Este es el response")
                    console.log(res)
                    //
                }, (error) => {
                    window.alert(error)

                })
        } else {
            console.log("Request no enviado!")
        }
    }

    // Items para el ItemsPage 


    const [items, setItems] = React.useState<response[]>([])

    // Para el popup de editar
    const [open, setOpen] = React.useState(false);
    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
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

    // Hare dos setOpen y handleClick uno para add y otro para edit

    // PARA MANEJAR LA LISTA

    const [checked, setChecked] = React.useState([1]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

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
                    <Button variant="outlined" color="primary" className={classes.button} onClick={handleClickOpen}>
                        Agregar artículo{' '}
                    </Button>
                    <Button variant="outlined" color="primary" className={classes.button} >
                        Crear envío
            </Button>
                </div>
            </Toolbar>
            <PopUp
                setOpen={setOpen}
                action={"Agregar artículo"}
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
            >
            </PopUp>
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
                                        <IconButton onClick={(e:any) => console.log(item.item_id, "edit")}>
                                            <Edit></Edit>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell padding="checkbox">
                                        <IconButton onClick={(e:any) => console.log(item.item_id, "delete")}>
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
                                        <Checkbox onClick={(e:any) => console.log(index)}/>
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

