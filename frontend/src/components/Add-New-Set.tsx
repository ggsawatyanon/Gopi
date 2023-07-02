import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, makeStyles, Typography, ListItemIcon } from '@material-ui/core';
import { colors } from '../colors.js';
import { BsFillPlayFill } from 'react-icons/bs';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft: '8em',
        width: '100vw'
    },

    //HEADER
    topContainer: {
        width:'100%',
        marginTop: '3%',
        marginLeft: '6%',
        display: 'flex',
        alignItems: 'center',
    },
    studySetTitle: {
        marginRight: '29vw',
        fontFamily: 'Raleway-medium',
        fontWeight: 900,
        fontSize: '3vw',
        display: 'inline',
    },
    buttonsContainer:{
        position: 'absolute',
        right: '6%', 
        display: 'inline-flex',
    },
    playButton: {
        backgroundColor: colors.gray4,
        color: 'white',
        fontFamily: 'Raleway-Medium',
        fontWeight: 900,
        fontSize: 20,
        borderRadius: '20px',

        height: '2.4vw',
        width: '8.2vw',
        marginRight: '4%',

        position: 'relative',
        display: 'inline-flex',
        margin:0,
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    editButton: {
        backgroundColor: colors.gray5,
        color: colors.gray4,
        borderColor: colors.gray2,
        border: '1px solid',
        fontFamily: 'Raleway-Medium',
        fontWeight: 900,
        fontSize: 20,
        borderRadius: '20px',

        height: '2.4vw',
        width: '8.2vw',

        position: 'relative',
        display: 'inline-flex',
        margin:0,
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    playIcon: {
        height: '7vh',
        width: '7vw',
        margin: 0
    },
    editIcon:{

    },

    //STUDY SET
    quizContainer: {
        width: '40vw',
        height: '100vh',
        backgroundColor: 'white',
        position: 'fixed',
        marginTop: '30vh',
        marginRight: '7.5vw',
        justifyContent: 'space-evenly',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    quizHeaderLeft: {
        backgroundColor: colors.green2,
        borderTopLeftRadius: 20,
        height: '10vh',
        width: '20vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    quizHeaderRight: {
        backgroundColor: colors.green2,
        borderTopRightRadius: 20,
        height: '10vh',
        width: '20vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const AddNewSet = () => {
    const { topContainer, studySetTitle, buttonsContainer, playButton, editButton, playIcon, editIcon, quizContainer, quizHeaderLeft, quizHeaderRight, container } = useStyles();

    return (
        <div  className={container}>
            <div className={topContainer}>
                <Typography className={studySetTitle}>Python for beginners</Typography>
                <div className={buttonsContainer}>
                    <Typography variant="body2" component="p" className={playButton} >
                        <ListItemIcon>
                            <BsFillPlayFill />
                        </ListItemIcon>
                        Play
                    </Typography>
                    <Typography variant="body2" component="p" className={editButton} >
                        Edit
                    </Typography>
                </div>
            </div>

            <Grid container className={quizContainer}>
                <Grid className={quizHeaderLeft}>
                    <Typography style={{fontSize: 32}}>Question</Typography>
                </Grid>
                <Grid className={quizHeaderRight}>
                    <Typography style={{fontSize: 32}}>Answer</Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default AddNewSet;