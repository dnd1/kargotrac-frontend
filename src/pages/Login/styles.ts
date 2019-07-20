import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
;

const useStyles = makeStyles((theme:any) => ({
  '@global': {
    body: {
      backgroundColor: "white",
    },
  },
  paper: {
    marginTop: 64,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 8,
    backgroundColor: "darkred",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 8,
  },
  submit: {
    margin: 24,
  },
}));

export default useStyles