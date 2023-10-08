import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../colors.js';
import { Grid } from '@material-ui/core';
import { HiHome } from 'react-icons/hi'
import { BsFillPlayFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';

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

  navContainer:{
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
  },

  userIcon:{
    height: '2.5em',
    width: '100%',
  },

  iconContainer: {
    position: 'relative',
    width: '2.5em',
    height: '2.5em',
    marginTop: '30%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  overlay: {
    position: 'absolute',
    width: '2.5em',
    height: '2.5em',
    backgroundColor: 'rgba(40, 166, 128, 0.37)',
    borderRadius: '4px',
    pointerEvents: 'none',
    top: 0,
    left: 0,
    zIndex: -1,
  },
}));

const Navbar: React.FC = () => {
  const {
    navbar,
    navItem,
    logo,
    navContainer,
    userIcon,
    iconContainer,
    overlay,
  } = useStyles();
  const location = useLocation();

  return (
    <Grid className={navbar}>
      <Grid container className={navContainer}>
        <Grid item className={navItem}>
            <Link to="/user">
              <FaUserCircle className={userIcon} style={{color: location.pathname === '/user' ? colors.pink2 : colors.green1}}/>
            </Link>
        </Grid>
        <Grid item className = {navItem}>
          <Link to="/">
              <div className={iconContainer}>
                <HiHome style={{height: '2em', width: '100%', color: location.pathname === '/' ? 'white' : colors.green1}}/>
                {location.pathname === '/' && <div className={overlay}></div>}
              </div>
          </Link>
        </Grid>
        <Grid item className={navItem}>
            <Link to="/play">
              <div className={iconContainer}>
                <BsFillPlayFill style={{height: '2.5em', width: '100%', color: location.pathname === '/play' ? 'white' : colors.green1}}/>
                {location.pathname === '/play' && <div className={overlay}></div>}
              </div>
            </Link>
        </Grid>
      </Grid>

      <Grid item>
        <img className={logo} src="gopiLogo.png" alt="Gopi Logo" />
      </Grid>
    </Grid>
  );
};

export default Navbar;