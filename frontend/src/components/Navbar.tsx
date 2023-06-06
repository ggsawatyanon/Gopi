import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../colors';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  navbar: {
    backgroundColor: colors.green2,
    width: '8em',
    height: '100vh',
    left: 0,
    top: 0,
    display: 'flex',
    paddingTop: '20px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
  },

  navIcons:{
    display: 'flex',
    paddingTop: '20px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  navItem: {
    listStyle: 'none',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    height: '10%',
    justifyContent: 'center',
  },

  logo: {
    width: '6.3em',
    height: '3.8em',
    margin: 0,
    marginBottom: '50px',
    listStyle: 'none'
  }
}));

const Navbar: React.FC = () => {
  const {
    navbar,
    navItem,
    logo,
    navIcons
  } = useStyles();

  return (
    <Grid className={navbar}>
      <Grid container className={navIcons}>
        <Grid item className = {navItem}>
            <Link to="/">Home</Link>
        </Grid>
        <Grid item className={navItem}>
            <Link to="/play">Play</Link>
        </Grid>
      </Grid>

      <Grid item>
        <img className={logo} src="gopiLogo.png" alt="Gopi Logo" />
      </Grid>
    </Grid>
  );
};

export default Navbar;