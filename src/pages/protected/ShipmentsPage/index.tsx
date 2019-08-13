import React from 'react';
import useStyles from "./styles"
import { Container, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Checkbox } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { userContext } from '../../../App';
import axios, { AxiosResponse } from 'axios';

type response = {
    id: number,
    lbs_weight: number,
    pvl_weight: number,
    cubic_feet_volume: number,
    number_of_boxes: number,
    shipping_way: string,
    status: string
}
export default function Shipments() {

    const context = React.useContext(userContext)
    console.log("Contexto en Items page")
    if (context && context.session) console.log(context.session)
    let user: any = null
    if (context && context.session) user = JSON.stringify(context.session)
    if (user) user = JSON.parse(user)

    const [shipments, setShipments] = React.useState<response[]>([])

    const fetchShipments = () => {

        axios
            .get(`http://localhost:8080/shipments`, {

                headers: { userToken: (user as any).token, companyID: (user as any).companyID },

            })

            .then((res: any) => {

                setShipments(res.data.shipments)

            })

            .catch((error: any) => {

                window.alert(error)

            })

    }

    React.useEffect(() => { fetchShipments() }, []);

    React.useEffect(() => { fetchShipments() }, [(user as any).companyID]);
    // Aqui uso el use effect para cargar los shipments
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow hover>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell># Envío</TableCell>
                            <TableCell align="right">Tipo de envío</TableCell>
                            <TableCell align="right">Estatus del envío</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shipments.map((ship, index) => (
                            <TableRow key={ship.id} hover>
                                <TableCell padding="checkbox">
                                    <IconButton disabled={shipments[index].status !== "PENDING" ? false : true} onClick={(event: any) => console.log("EDIT")}>
                                        <Edit></Edit>
                                    </IconButton>
                                </TableCell>
                                <TableCell padding="checkbox">
                                    <IconButton disabled={shipments[index].status !== "PENDING" ? false : true} onClick={(e: any) => console.log("DELETE")}>
                                        <DeleteIcon></DeleteIcon>
                                    </IconButton>
                                </TableCell>
                                <TableCell component="th" scope="row" padding="checkbox">
                                    {`${ship.id}`}
                                </TableCell>
                                <TableCell align="right">{ship.shipping_way}</TableCell>
                                <TableCell align="right">{ship.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    )
}