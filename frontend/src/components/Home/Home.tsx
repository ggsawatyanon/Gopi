import React from 'react';
import { makeStyles } from '@material-ui/core';
import StudySet from './StudySet';
import { colors } from '../../colors.js';

const useStyles = makeStyles(() => ({    
  content:{
    marginLeft: 'calc(8em + 3%)',
    marginRight: '3%',
  },
  // pageTitle: {
  //   paddingTop:'1em',
  //   margin: 0,
  //   fontFamily: 'Raleway-Bold',
  //   color: colors.green4,
  //   fontSize: 45,
  // },
}));

const Home = () => {

  const {
    content,
    // pageTitle,
  } = useStyles();

  return (
    <>
      <div className={content}>
        {/* <h1 className={pageTitle}>Home</h1> */}
        <StudySet />
      </div>
    </>
  );
};

export default Home;