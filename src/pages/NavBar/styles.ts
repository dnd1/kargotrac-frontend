import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    button: {
      marginLeft: theme.spacing(200),
    },
    div: {
      alignItems: 'center',
      
    }
  }),
);

export default useStyles