import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { lighten } from "@material-ui/core/styles";

export const useToolbarStyles = makeStyles(theme => ({
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