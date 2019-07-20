import * as React from 'react'
import useStyles from '../Homepage/styles';
import {Typography} from '@material-ui/core'

export interface HomepageProps {
    name: string
}

const Homepage = (props:HomepageProps) => {

    const {name} = props
    const classes = useStyles()

    return  <React.Fragment> 
        <Typography className={classes.root} variant="h1">
            Hello {name}, this is the Homepage!
        </Typography>
    </React.Fragment>
}

export default Homepage