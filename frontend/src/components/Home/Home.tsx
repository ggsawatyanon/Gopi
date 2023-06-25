import React from 'react';
import { makeStyles } from '@material-ui/core';
import HomeContent from './HomeContent';

const useStyles = makeStyles(() => ({    
  content:{
    background: 'white',
    marginLeft: '8em',
  },
}));

const Home = () => {

  const {
    content,
  } = useStyles();

  return (
    <>
      <div className={content}>
        <HomeContent />
      </div>
    </>
  );
};

export default Home;