import { signInWithPopup, createUserWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../colors';
import { auth, provider, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { addDoc, collection, doc, setDoc } from "../../firebase/firestore";
import { TextField, InputAdornment } from "@material-ui/core";
import { MdEmail } from 'react-icons/md';
import { RiLockFill, RiLockLine } from 'react-icons/ri';


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
        color: colors.gray3,
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
        fontFamily: 'Raleway, bold',
        color: colors.gray4,
        fontSize: '13px',
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
        paddingLeft: '35px',

    },
    googleLogo: {
        width: '15%',
        height: '100%',
    },
    logo: {
        width: '28vw',
        height: '28vh',
        paddingLeft: '4em'
    }
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


    const validateEmail = (email) => {
        return String(email).toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validateUsername = (username) => {
        return /^[A-Za-z0-9]*$/.test(username);
    }

    const signUp = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError(true);
        }
        if (password.length <= 6) {
            setError(true);
        }
        if (username.length <= 3 && !validateUsername(username)) {
            setError(true);
        }

        createUserWithEmailAndPassword(auth, email, username, password)
            .then((userCredential) => {
                console.log(userCredential);
                alert("Account created!")
                window.location.href = '/';

            }).catch((error) => {
                console.log(error);

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
                    {error && !validateEmail(email) ?
                        <label className={errorMessage}> Please enter a valid email.</label> : ""}
                    <br></br>

                    <input required
                        className={inputBar}
                        type={username}
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {error && !validateUsername(username) ?
                        <label className={errorMessage}> Please enter a username with only letters and numbers.</label> : ""}

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
                    {error && password.length <= 6 ?
                        <label className={errorMessage}> Password must be at least 6 characters.
                        </label> : ""}

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
                    {error && password !== passwordConf ?
                        <label className={errorMessage}> Password do not match.
                        </label> : ""}
                    <br></br>

                    <button className={SubmitButton} type="submit">CREATE AN ACCOUNT</button>


                </form>

                <p1 className={orText}> or </p1>

                <br></br>

                {value ? window.location.href = '/' :
                    <button className={googleButton} onClick={handleClick}>
                        <img className={googleLogo} src="googleLogo.png" alt="Google" />
                        Sign In with Google</button>
                }

                <br></br>
                <br></br>

                <p1 className={otherOption}> Already have an account?
                    <a href="/login"> SignIn  → </a>
                </p1>

            </div>
        </div>
    );
};

export default SignUp;