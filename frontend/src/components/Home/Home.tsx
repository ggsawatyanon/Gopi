import React from 'react';
import { makeStyles } from '@material-ui/core';
import StudySet from './StudySet';
import { colors } from '../../colors.js';

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
        <StudySet />
      </div>
    </>
  );
};

export default Home;