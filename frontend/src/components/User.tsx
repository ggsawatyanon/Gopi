import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { colors } from '../colors.js';

const useStyles = makeStyles(() => ({
    content:{
      marginLeft: 'calc(8em + 3%)',
    },
    pageTitle:{
      paddingTop:'1em',
      margin: 0,
      fontFamily: 'Raleway, sans-serif',
      color: colors.green4,
    }
}));

const User = () => {
    const {
        content, pageTitle
    } = useStyles();

    return (
        <div className={content}>

            <h1 className={pageTitle}>User</h1>
            <Link to="/play">Play</Link>

        </div>
    );
};
export default User;