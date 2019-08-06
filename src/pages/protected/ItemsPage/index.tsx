
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import PopUp from './popup';
import axios from 'axios';
import { userContext } from '../../../App';



function createData(name: any, packNumber: any, packStatus: any, envStatus: any) {
    return { name, packNumber, packStatus, envStatus };
}
const rows = [
    createData('Cupcake', 305, 3.7, 67),
    createData('Donut', 452, 25.0, 51),
    createData('Eclair', 262, 16.0, 24),
    createData('Frozen yoghurt', 159, 6.0, 24),
    createData('Gingerbread', 356, 16.0, 49),
    createData('Honeycomb', 408, 3.2, 87),
    createData('Ice cream sandwich', 237, 9.0, 37),
    createData('Jelly Bean', 375, 0.0, 94),
    createData('KitKat', 518, 26.0, 65),
    createData('Lollipop', 392, 0.2, 98),
    createData('Marshmallow', 318, 0, 81),
    createData('Nougat', 360, 19.0, 9),
    createData('Oreo', 437, 18.0, 63),
];

function desc(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array: any, cmp: any) {
    const stabilizedThis = array.map((el: any, index: any) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el: any) => el[0]);
}

function getSorting(order: any, orderBy: any) {
    return order === 'desc' ? (a: any, b: any) => desc(a, b, orderBy) : (a: any, b: any) => -desc(a, b, orderBy);
}

const headRows = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Nombre del artículo' },
    { id: 'packNumber', numeric: true, disablePadding: false, label: '# Paquete' },
    { id: 'packStatus', numeric: true, disablePadding: false, label: 'Estatus del paquete' },
    { id: 'envStatus', numeric: true, disablePadding: false, label: 'Estatus del envío' },

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

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),

    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '0 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    title: {
        flex: '0 0 auto',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const EnhancedTableToolbar = (props: any) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    const context = React.useContext(userContext)
    console.log("Contexto en Items page")
    if (context && context.session) console.log(context.session)
    let user: any = null
    if (context && context.session) user = JSON.stringify(context.session)
    if (user) user = JSON.parse(user)
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

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
        
        if(name==="name") setNameError(notValid)
        else setQtyError(notValid)

        
    }


    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("este es el item:")
        console.log(item)

        // Validaciones
        validate("name", item.name)
        validate("quantity", item.quantity)
        console.log(nameError)
        console.log(qtyError)

        if (!nameError && !qtyError) {
            const req = {
                name: item.name,
                quantity: item.quantity,
                tracking_id: item.tracking_id,
                userID: (user as any).user.id,
                companyID: (user as any).companyID
            }
            console.log("Este es el request")
            console.log(req)
            axios.post(`http://localhost:8080/items`, req)
                .then(res => {
                    console.log("este es el item:")
                    console.log(item)
                    console.log("Este es el response")
                    console.log(res)
                    //
                }, (error) => {
                    window.alert(error)

                })
        }else{
            console.log("Request no enviado!")
        }


    }
    // Aqui debo manejar hacer la funcion del onSubmit
    return (
        <div>
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >

                <div className={classes.title}>
                    {numSelected > 0 ? (
                        <Typography color="inherit" variant="subtitle1">
                            {numSelected} selected
                        </Typography>
                    ) : (
                            <Typography variant="h6" id="tableTitle">
                                Dashboard
                            </Typography>
                        )}
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
                open={open}
                handleClose={handleClose}
                onSubmit={handleSubmit}
                handleChange={handleChange}
                handleNameError={setNameError}
                handleQtyError={setQtyError}
                nameError={nameError}
                qtyError={qtyError}
                >
            </PopUp>

        </div>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',

    },
    paper: {
        width: '100%',
        marginTop: theme.spacing(-5)
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
    fab: {
        margin: theme.spacing(1),
    },
}));

export default function ItemsPage() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('packNumber');
    const [selected, setSelected] = React.useState(new Array<any>());
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    function handleRequestSort(event: any, property: any) {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }

    function handleSelectAllClick(event: any) {
        if (event.target.checked) {
            const newSelecteds = rows.map(n => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    function handleClick(event: any, name: any) {
        const selectedIndex = selected.indexOf(name);
        let newSelected = new Array<any>();

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    }

    function handleChangePage(event: any, newPage: any) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event: any) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    function handleChangeDense(event: any) {
        setDense(event.target.checked);
    }

    const isSelected = (name: any) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <div className={classes.tableWrapper}>

                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: any, index: any) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    // Aqui paso la informacion de que voy a mostrar segun donde estoy
                                    // Cambiar el nombre de packnumber y eso a algo generico
                                    // Recordar que solo muestro los botones de agregar articulo y crear envio en
                                    // Listado de articulos
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.packNumber}</TableCell>
                                            <TableCell align="right">{row.packStatus}</TableCell>
                                            <TableCell align="right">{row.envStatus}</TableCell>
                                            <TableCell align="right">
                                                <IconButton className={classes.button} aria-label="edit">
                                                    <Edit></Edit>
                                                </IconButton>
                                            </TableCell>

                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </div>
    );
}
