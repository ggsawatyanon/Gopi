import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../colors';
import { BorderColor } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
    googleButton: {
        fontFamily: 'Raleway-SemiBold',
        borderColor: colors.gray2,
        backgroundColor: 'white',
        height: '5.5%',
        margin: '15px',
        width: '275px',
        textAlign: 'center',
        color: colors.gray3, 
        fontSize: '0.8em',
        border: '1px solid',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    googleLogo: {
        width: '10%',
        marginRight: '5%',
      },
}));

interface SignInWithGoogleProps {
    handleClick: () => void;
}

const SignInWithGoogle: React.FC<SignInWithGoogleProps> = ({ handleClick }) => {

    const { googleButton, googleLogo } = useStyles();

    return (
        <button className={googleButton} onClick={handleClick}>
        <img className={googleLogo} src="googleLogo.png" alt="Google" />
        Sign In with Google</button>
    );
};

export default SignInWithGoogle;