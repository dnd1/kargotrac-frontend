import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',

    },
    rootList: {
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
    actions: {
        color: theme.palette.text.secondary,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    title: {
        flex: '0 0 auto',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
    },

}));