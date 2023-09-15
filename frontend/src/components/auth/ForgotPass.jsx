import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../colors';
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({

    signInContainer: {
        position: 'absolute',
        right: '15%',
        width: '50vw-8em',
        height: '100vh',
        top: '100px',
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
        fontFamily: 'Raleway-SemiBold, sans-serif',
        fontSize: '0.95em',
        color: colors.gray4,
        backgroundColor: colors.gray5,
        height: '40px',
        margin: '15px',
        width: '275px',
        borderColor: colors.gray5,
        borderRadius: '8px',
        textIndent: 10
    },

    errorMessage: {
        margin: '20px',
        color: colors.gray3,
        fontSize: '14px',
        paddingBottom: '5px',

    },

    passwordBar: {
        fontFamily: 'Raleway-SemiBold, sans-serif',
        fontSize: '0.95em',
        color: colors.gray4,
        backgroundColor: colors.gray5,
        height: '40px',
        margin: '15px',
        marginBottom: 0,
        width: '275px',
        borderColor: colors.gray5,
        borderRadius: '8px',
        marginTop: '8px',
        textIndent: 10
    },

    SubmitButton: {
        fontFamily: 'Raleway-SemiBold, sans-serif',
        fontSize: '0.95em',
        borderColor: colors.green1,
        backgroundColor: colors.green1,
        height: '38px',
        margin: '15px',
        width: '275px',
        borderRadius: '20px',
        textAlign: 'center',
        marginTop: '20px',
        color: 'white',
    },

    orText: {
        textAlign: 'center',
        fontFamily: 'Raleway, bold',
        color: colors.gray4,
        fontSize: '13px',
        paddingLeft: '150px'
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
        fontFamily: 'Raleway, sans-serif',
        color: colors.gray3,
        fontSize: '16px'
    }
}));




const ForgotPassword = () => {
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
                    <h1 className={headerTitle}>Forgot Password</h1>
                    <input required className={emailBar}
                        type={email}
                        placeholder="Email"
                        value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                    />
                    {/* {error && !validateEmail(email) ?
                        <label className={errorMessage}> Please enter a valid email.</label> : ""} */}

                    <br></br>
                    <input required className={passwordBar}
                        type={password}
                        placeholder="New Password"
                        value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    {/* {error && password.length <= 6 ?
                        <label className={errorMessage}> Password must be at least 6 characters.
                        </label> : ""} */}

                    <input required className={passwordBar}
                        type={password}
                        placeholder="Confirm your password"
                        // value={passwordConf}
                        // onChange={(e) => setPasswordConf(e.target.value)}
                    />
                    <br></br>
                    {/* {error && password !== passwordConf ?
                        <label className={errorMessage}> Password do not match.
                        </label> : ""} */}
                    <br></br>
                    <button className={SubmitButton} type="submit">CHANGE PASSWORD</button>
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

                <p1 className={otherOption}> Don't have an account yet?
                    <a href="/register"> Sign Up → </a>
                </p1>


            </div>
        </div>
    );
};

export default ForgotPassword;