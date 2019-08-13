import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: theme.spacing(0.5),
        },
        chip: {
            margin: theme.spacing(0.5),
        },
        divider: {
            height: theme.spacing(2),
        }
    }),
);

export default useStyles