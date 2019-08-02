import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import useStyles from './styles';
import { Link, withRouter, Route } from 'react-router-dom';
import { UserProfile } from '../UserProfile';


const ClippedDrawer = ({match} : any) => {
    const classes = useStyles();
    console.log('aquiiiii')
    const routes = ['users/me','','', '' ]
    console.log(`${match.url}/${routes[0]}`)
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Kargotrack
            </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <List className={classes.list}>
                    {['Modificar perfil', 'Listado de artículos', 'Listado de paquetes', 'Listado de envíos'].map((text, index) => (
                        <ListItem button key={text} component={Link} to={`${match.url}/${routes[index]}`}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                
            </Drawer>
            <Route path={`${match.path}/:path`} component={UserProfile} />
        </div>
    );
}

export default withRouter(ClippedDrawer)