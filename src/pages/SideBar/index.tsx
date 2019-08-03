import React from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import useStyles from "./styles";
import { Link as RouterLink } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { userContext } from "../../App";
import { Box } from "@material-ui/core";





const SplitButton = (props: any) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    let options: any
    if(options) options = props.companyIDs
    else options = props.company
    // Falta: la actual debe ser la seleccionada (el index inicial)
    console.log('Companies')
    console.log(options)
    function handleClick() {
        
        alert(`You clicked`);
    }

    function handleMenuItemClick(event: any, index: any) {
        setSelectedIndex(index);
        setOpen(false);
    }

    function handleToggle() {
        if (options.length > 1) setOpen(prevOpen => !prevOpen);
    }

    function handleClose(event: any) {
        if (anchorRef && anchorRef.current && (anchorRef as any).current.contains(event.target)) {
            return;
        }

        setOpen(false);
    }

    return (
        <Grid container alignContent="center">
            <Grid item xs={12}>
                <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                    <Button onClick={handleClick}>{options ? options[selectedIndex].companyID || options: ''}</Button>
                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        aria-owns={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper id="menu-list-grow">
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList>
                                        {options.map((option: any, index: any) => (
                                            <MenuItem
                                                key={option}
                                                selected={index === selectedIndex}
                                                onClick={event => handleMenuItemClick(event, index)}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Grid>
        </Grid>
    );
}

export default function PersistentDrawerLeft(props: { children?: any }) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const context = React.useContext(userContext)
    if (context && context.session) console.log(context.session)
    let user = null
    if (context && context.session) user = JSON.stringify(context.session)
    if (user) user = JSON.parse(user)

    console.log('estas son las companias')
    if (user) console.log(user.usersCompanies)
    //console.log(user)

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Button color="inherit" className={classes.button} component={RouterLink} to="/dashboard">
                        <Typography variant="body1" noWrap>
                            Kargotrack
                        </Typography>
                    </Button>


                    <Box flexGrow={1}></Box>
                    <div style={{ justifyContent: 'flex-end', marginRight: theme.spacing(5) }} >
                        <Typography variant="body2" noWrap>
                            Nombre de usuario:{' '}{user ? user.user.username : ''}
                        </Typography>

                        <Box flexGrow={1}></Box>
                        <SplitButton companyIDs={user ? user.usersCompanies : ''} company={user ? user.companyID : ''}></SplitButton>



                    </div>

                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                                <ChevronRightIcon />
                            )}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem component={RouterLink} to="/dashboard/users/me" button>
                        <ListItemText primary="Modificar perfil" />
                    </ListItem>
                    <ListItem component={RouterLink} to="" button>
                        <ListItemText primary="Articulos" />
                    </ListItem>
                    <ListItem component={RouterLink} to="" button>
                        <ListItemText primary="Paquetes" />
                    </ListItem>
                    <ListItem component={RouterLink} to="" button>
                        <ListItemText primary="Envios" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem component={RouterLink} to="/" button>
                        <ListItemText primary="Salir" />
                    </ListItem>
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open
                })}
            >
                <div className={classes.drawerHeader} />
                {props.children}
            </main>
        </div>
    );
}