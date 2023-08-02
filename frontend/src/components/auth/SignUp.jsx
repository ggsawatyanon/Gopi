import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useEffect,useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../colors';
import { auth, provider } from "../../firebase";

import { signInWithPopup } from "firebase/auth"; 

const useStyles = makeStyles(() => ({
    signUpContainer:{
        position: 'absolute',
        right: '15%',
        width: '300px',
        height: '120px',
        top: '100px',
        
    },
    headerTitle:{
        textAlign: 'center',
        fontFamily: 'Raleway, sans-serif',
        color: colors.black,
        fontSize: '25px',
    }, 
    emailBar:{
        fontFamily: 'Raleway, sans-serif',
        backgroundColor: colors.gray1,
        height: '30px',
        margin: '15px',
        width: '275px',
        borderColor: colors.gray1,
        borderRadius: '8px',
    
    },
    errorMessage:{
        margin: '20px',
        color: colors.gray3,
        fontSize: '14px',
        paddingBottom: '5px',

    }, 
    passwordBar:{
        fontFamily: 'Raleway, sans-serif',
        backgroundColor: colors.gray1,
        height: '30px',
        margin: '15px',
        width: '275px',
        borderColor: colors.gray1,
        borderRadius: '8px',
        marginTop: '8px',        
    },
    SubmitButton:{
        fontFamily: 'Raleway, sans-serif bold',
        borderColor: colors.green1,
        backgroundColor: colors.green1,
        height: '38px',
        margin: '15px',
        width: '275px',
        borderRadius: '20px',    
        textAlign: 'center', 
        marginTop: '20px',
        color: colors.white, 
    },
    orText:{
        textAlign: 'center',
        fontFamily: 'Raleway, bold',
        color: colors.gray4,
        fontSize: '13px',
        paddingLeft: '150px'
    },
    googleButton:{
        fontFamily: 'Raleway, sans-serif bold',
        borderColor: colors.gray1,
        backgroundColor: colors.white,
        height: '38px',
        margin: '15px',
        width: '275px',
        textAlign: 'center',
        color: colors.white, 
        

    },
    otherOption:{
        textAlign: 'center',
        fontFamily: 'Raleway, bold',
        color: colors.gray4,
        fontSize: '14px',
        marginTop: '40px',
        paddingLeft: '35px',
    
    }, 
    googleLogo:{
        width: '15%',
        height: '100%',
    },


}));



const SignUp = () => {

    const {
        signUpContainer, headerTitle,
        emailBar, errorMessage,passwordBar, 
        SubmitButton, orText, googleButton,
        otherOption, googleLogo,
    } = useStyles();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    
    const [value, setValue] = useState("");

  const handleClick = () =>{
    signInWithPopup(auth,provider).then((data) => {

      setValue(data.user.email)

      //saves the value variable into localStorage, the key is 'email'
      localStorage.setItem("email", data.user.email)
    } )
  };

  //Gets email from localStorage, sets value state variable.
  useEffect(() => {
    setValue(localStorage.getItem('email')); 
  }, []);


    const validateEmail = (email) => {
        return String(email).toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };


    const signUp = (e) => {
    e.preventDefault();
    if (!validateEmail(email)){
        setError(true);
    }
    if (password.length <= 6){
        setError(true);
    }
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential);
        window.location.href = '/';
        
    }).catch((error) => {
        console.log(error);
        
    });
    
};

    return (
        
        <div className= {signUpContainer}>
        <form onSubmit={signUp}>
            <h1 className= {headerTitle}>Sign Up</h1>
            <input required className= {emailBar}
            type= {email}
            placeholder="  Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            { error && !validateEmail(email) ?
            <label className={errorMessage}> Please enter a valid email.</label>: ""}
            
            <br ></br>
            <input required className= {passwordBar}
            type={password}
            placeholder="  Create a Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <br></br>
            { error && password.length <= 6 ?
            <label className={errorMessage}> Password must be at least 6 characters.    
            </label>: ""}
            <br></br>
            <button className= {SubmitButton} type="submit">CREATE AN ACCOUNT</button>            
        </form>
        
        <p1 className = {orText}> or </p1>
        
        <br></br>
        
        {value?window.location.href = '/':
        <button className= {googleButton} onClick = {handleClick}> 
        <img className={googleLogo} src="googleLogo.png" alt="Google"/> 
        Sign In with Google</button>
      }

        <br></br>
        <br></br>

        <p1 className= {otherOption}> Already have an account?
        <a href = "/login"> SignIn  → </a>
        </p1>

        </div>
        
    );
};

export default SignUp;