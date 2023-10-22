import { signInWithPopup, createUserWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../colors';
import { auth, provider, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { TextField, InputAdornment } from "@material-ui/core";
import { MdEmail } from 'react-icons/md';
import { RiLockFill, RiLockLine } from 'react-icons/ri';
import SignInWithGoogle from './SignInWithGoogle.tsx';
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(() => ({
    signUpContainer: {
        position: 'absolute',
        right: '15%',
        width: '50vw - 8em',
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
    inputBar: {
        fontFamily: 'Raleway-SemiBold, sans-serif',
        fontSize: '0.95em',
        color: colors.gray4,
        backgroundColor: colors.gray5,
        height: '40px',
        width: '275px',
        borderColor: colors.gray5,
        borderRadius: '8px',
        border: '1px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textIndent: 10,
    },
    errorMessage: {
        margin: '20px',
        color: colors.black,
        fontSize: '14px',
        paddingBottom: '5px',

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
        border: '1px',
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
        textAlign: 'left',
        fontFamily: 'Raleway-SemiBold, sans-serif',
        color: colors.gray4,
        fontSize: '14px',
        marginTop: '40px',
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
    errorMessage: {
        margin: '0px',
        color: 'red',
        fontSize: '14px',
        paddingBottom: '10px',
        textAlign: 'center',
    
      },
}));



const SignUp = () => {

    const {
        signUpContainer, headerTitle,
        inputBar, errorMessage,
        SubmitButton, orText, googleButton,
        otherOption, googleLogo,
        logoContainer, logo
    } = useStyles();


    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [error, setError] = useState(false);

    const [value, setValue] = useState("");

    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            setValue(data.user.email)
            localStorage.setItem("email", data.user.email)
        })
    };

    //Gets email from localStorage, sets value state variable.
    useEffect(() => {
        setValue(localStorage.getItem('email'));
    }, []);

    const signUp = async (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            if (passwordConf != password){
                throw new Error();
            }


            console.log(userCredential);
            alert("Account created!")
            window.location.href = '/';
            setError(undefined);

        }).catch((error) => {
            if (error.code == "auth/email-already-in-use") {
                var writtenError = "The email address is already in use.";
            } else if (error.code == "auth/invalid-email") {
                writtenError = "The email address is invalid.";
            } else if (error.code == "auth/operation-not-allowed") {
                writtenError = "Operation not allowed.";
            } else if (error.code == "auth/weak-password") {
                writtenError = "The password is too weak.";
            } else if (passwordConf != password){
                writtenError = "Password is not the same";
            }
            
            console.log(error);
            setError(writtenError);

        });
            

        try {
            const collectionRef = collection(db, "userinfo");

            const docData = {
                email,
                username
            };

            await addDoc(collectionRef, docData);

            setEmail('');
            setUsername('');
            setPassword('');
            setPasswordConf('');
        } catch (error) {
            console.error('Error adding document: ', error);
        }

    };

    return (
        <div>
            <div className={logoContainer}>
                <div style={{ fontFamily: 'Raleway', fontSize: 36, fontWeight: 500, paddingLeft: '4em', color: 'white' }}>Welcome to</div>
                <img className={logo} src="gopi-white-cropped.png" alt="Gopi Logo" />
            </div>
            <div className={signUpContainer}>
                <h1 className={headerTitle}>Sign Up</h1>
                <form onSubmit={signUp}>
                    <TextField required 
                        className={inputBar}
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
                        className={inputBar}
                        type="password"
                        placeholder="Create a Password"
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
                    <br></br>

                    <TextField required 
                        className={inputBar}
                        type="password"
                        placeholder="Confirm your password"
                        value={passwordConf}
                        onChange={(e) => setPasswordConf(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start" style={{paddingLeft: '10px'}}>
                                    <RiLockLine style={{color: colors.gray4}}/>
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

                    {error ? <p className = {errorMessage }> {error}</p>: null}

                    <button className={SubmitButton} type="submit">CREATE AN ACCOUNT</button>


                </form>

                <p1 className={orText}> or </p1>


                {value ? window.location.href = '/' :
                    <SignInWithGoogle handleClick={handleClick} />
                }

                <br></br>
                <br></br>

                <p1 className={otherOption}> Already have an account?
                    <a href="/login"> Sign in   → </a>
                </p1>

            </div>
        </div>
    );
};

export default SignUp;