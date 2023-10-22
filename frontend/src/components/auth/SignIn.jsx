import { signInWithEmailAndPassword } from "firebase/auth";
import SignInWithGoogle from './SignInWithGoogle.tsx';
import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../colors';
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import { TextField, InputAdornment } from "@material-ui/core";
import { MdEmail } from 'react-icons/md';
import { RiLockFill } from 'react-icons/ri';

const useStyles = makeStyles(() => ({

  signInContainer: {
    position: 'absolute',
    right: '15%',
    width: '50vw-8em',
    height: '100vh',
    top: '10px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },

  logoContainer: {
    width: '53vw',
    height: '100vh',
    backgroundColor: colors.green1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },

  headerTitle: {
    textAlign: 'center',
    fontFamily: 'Raleway-SemiBold, sans-serif',
    color: colors.black,
    fontSize: '25px',
  },

  emailBar: {
    backgroundColor: colors.gray5,
    height: '40px',
    margin: '0 auto',
    width: '275px',
    borderColor: colors.gray5,
    borderRadius: '8px',
    border: '1px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textIndent: 10
  },

  errorMessage: {
    margin: '20px',
    color: 'red',
    fontSize: '14px',
    paddingBottom: '5px',

  },

  passwordBar: {
    backgroundColor: colors.gray5,
    height: '40px',
    margin: '0 auto',
    marginBottom: 0,
    width: '275px',
    borderColor: colors.gray5,
    borderRadius: '8px',
    marginTop: '8px',      
    border: '1px',  
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textIndent: 10
  },

  SubmitButton: {
    fontFamily: 'Raleway-SemiBold, sans-serif bold',
    fontSize: '0.9em',
    borderColor: colors.green1,
    backgroundColor: colors.green1,
    height: '38px',
    margin: '15px',
    width: '275px',
    borderRadius: '20px',
    textAlign: 'center',
    marginTop: '10px',
    color: 'white', 
    border: '1px'
  },

  orText: {
    textAlign: 'center',
    fontFamily: 'Raleway, sans-serif bold',
    color: colors.gray4,
    fontSize: '13px',
    paddingTop: '6px',
    paddingBottom: '6px',
},

  googleButton: {
    fontFamily: 'Raleway, sans-serif bold',
    borderColor: colors.gray1,
    backgroundColor: colors.white,
    height: '38px',
    margin: '15px',
    width: '275px',
    textAlign: 'center',
    color: colors.white, 
    border: '1px',
  },
  otherOption: {
    textAlign: 'center',
    fontFamily: 'Raleway, bold',
    color: colors.gray4,
    fontSize: '14px',
    marginTop: '40px',
    paddingLeft: '30px',
  },

  googleLogo: {
    width: '15%',
    height: '100%',
  },
  logo: {
    width: '28vw',
    height: '28vh',
    paddingLeft: '4em'
  },
  caption: {
    textAlign: 'right',
    fontFamily: 'Raleway-SemiBold, sans-serif',
    color: colors.gray3,
    fontSize: '0.75em'
  }
}));




const SignIn = () => {
  const {
    signInContainer, headerTitle,
    emailBar, passwordBar,
    SubmitButton, orText, googleButton,
    otherOption, googleLogo, logoContainer,
    logo, caption
  } = useStyles();




  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [value, setValue] = useState("");

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {

      setValue(data.user.email)

      //saves the value variable into localStorage, the key is 'email'
      localStorage.setItem("email", data.user.email)
    })
  };

  //Gets email from localStorage, sets value state variable.
  useEffect(() => {
    setValue(localStorage.getItem('email'))

  });



  const signIn = (e) => {

    //stops the form from being reloaded and submitting
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className={logoContainer}>
        <div style={{ fontFamily: 'Raleway', fontSize: 36, fontWeight: 500, paddingLeft: '4em', color: 'white' }}>Welcome to</div>
        <img className={logo} src="gopi-white-cropped.png" alt="Gopi Logo" />
      </div>
      <div className={signInContainer}>
        <form onSubmit={signIn}>
        <h1 className={headerTitle}>Login</h1>
          <TextField required 
          className={emailBar}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                  <InputAdornment position="start" style={{paddingLeft: '10px'}}>
                      <MdEmail style={{color: colors.gray4}}/>
                  </InputAdornment>
              ),
              disableUnderline: true,
              style: {
                  fontFamily: 'Raleway-SemiBold, sans-serif',
                  fontSize: '0.95em',
                  color: colors.gray4,
              }
          }}
          />

          <br></br>
          <TextField required 
            className={passwordBar}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                  <InputAdornment position="start" style={{paddingLeft: '10px'}}>
                      <RiLockFill style={{color: colors.gray4}}/>
                  </InputAdornment>
              ),
              disableUnderline: true,
              style: {
                  fontFamily: 'Raleway-SemiBold, sans-serif',
                  fontSize: '0.95em',
                  color: colors.gray4,
              }
            }}
          />
          <Link to="/forgotpassword" style={{ textDecoration: 'none' }}>
            <p className={caption}>Forgot Password?</p>
          </Link>
          <br></br>
          <button className={SubmitButton} type="submit">LOGIN</button>
        </form>

        <p1 className={orText}> or </p1>


        {value ? window.location.href = '/' :
          <SignInWithGoogle handleClick={handleClick} />
        }


        <br></br>
        <br></br>

        <p1 className={otherOption}> Don't have an account yet?
          <a href="/register"> Sign Up → </a>
        </p1>


      </div>
    </div>
  );
};

export default SignIn;