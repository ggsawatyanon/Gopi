import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import Play from './components/Play';
import User from './components/User';
import AddNewSet from 'components/Add-New-Set';

import { makeStyles } from '@material-ui/core/styles';
import { colors } from './colors.js';
import { EditSet } from 'components/EditSet';
import SignIn from 'components/auth/SignIn';
import SignUp from 'components/auth/SignUp';

const useStyles = makeStyles(() => ({
  root:{
    minHeight: '100vh',
    padding: 0,
    margin: 0
  },
  container: {
    display: 'flex',
  },
  content: {
    marginLeft: '8em',
    width: '100%'
  },
}));

const App = () => {

  const {
    root,
    container,
    content,
  } = useStyles();

  return (
    <div className={root}>
      {/* Navigation bar */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/add-new-set" element={<AddNewSet />} />
          <Route path="/user" element={<User />} />
          <Route path="/edit-set/:cardId" element={<EditSet /> } />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </Router>

      {/* Page Contents */}
      <div className={container}>
        <div className={content}>
        </div>
      </div>
    </div>
  );
};

export default App;