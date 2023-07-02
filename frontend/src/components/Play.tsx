import React from 'react';
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

const Play: React.FC = () => {

  const {
    content, pageTitle
  } = useStyles();

  return (
    <div className={content}>
      <h1 className={pageTitle}>Play</h1>
    </div>
  );
};

export default Play;
