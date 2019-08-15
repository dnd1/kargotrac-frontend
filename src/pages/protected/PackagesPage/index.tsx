import React from 'react';
import useStyles from "./styles"
import { Container, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Checkbox, Button, Typography, Snackbar } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { userContext } from '../../../App';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import Snackbars from '../../Snackbar/snackbar';


type response = {
    tracking_id: string,
    status: string,
    qty: number
}
export default function Packages() {

    const context = React.useContext(userContext)
    console.log("Contexto en Items page")
    if (context && context.session) console.log(context.session)
    let user: any = null
    if (context && context.session) user = JSON.stringify(context.session)
    if (user) user = JSON.parse(user)

    const [packages, setPackages] = React.useState<response[]>([])
    const [selectedPackage, setSelectedPackage] = React.useState<response>({
        tracking_id: "",
        status: "",
        qty: 0
    })


    const fetchPackages = () => {

        axios
            .get(`http://localhost:8080/packages`, {

                headers: { userToken: (user as any).token, companyID: (context as any).session.isCompany ? (user as any).user.id : (user as any).companyID, iscompany: (context as any).session.isCompany },

            })

            .then((res: any) => {

                console.log(res)
                setPackages(res.data.packages)
                //setShipments(res.data.shipments)

            })

            .catch((error: any) => {

                window.alert(error)

            })

    }

    React.useEffect(() => { fetchPackages() }, []);

    React.useEffect(() => { fetchPackages() }, [(user as any).companyID]);
    // Aqui uso el use effect para cargar los shipments
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Paper className={classes.root}>
                {
                    packages.length > 0 ?
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow hover>
                                    <TableCell></TableCell>
                                    <TableCell>Paquete</TableCell>
                                    <TableCell align="right">Número de artículos</TableCell>
                                    <TableCell align="right">Estatus del paquete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    packages.map((pck, index) => (
                                        <TableRow key={pck.tracking_id} hover>
                                            <TableCell padding="checkbox">
                                                <IconButton disabled={packages[index].status !== "PENDIENTE" ? false : true} component={Link} to={`packages/edit/${pck.tracking_id}`}>
                                                    <Edit></Edit>
                                                </IconButton>
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="checkbox">
                                                {`${pck.tracking_id}`}
                                            </TableCell>
                                            <TableCell align="right">{pck.qty}</TableCell>
                                            <TableCell align="right">{pck.status}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        :
                        <Snackbars showInfo={true} variant="info" msg="Aún no tienes paquetes asociados"></Snackbars>
                }

            </Paper>
        </Container>
    )
}