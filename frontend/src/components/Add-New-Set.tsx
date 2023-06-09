import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { colors } from '../colors';
import { TbEditCircle } from 'react-icons/tb'
import { FaPlayCircle } from 'react-icons/fa'
// import { ReactComponent as PlusIcon } from '../assets/plus-solid.svg';
// import PlusIcon from '../../assets/plus-solid.svg';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft: '8em',
        width: '100vw'
    },
    topContainer: {
        top: 0,
        backgroundColor: colors.blue1,
        height: '20vh',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        width: '100vw'
    },
    rectIcons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '25%',
    },
    rectItem: {
        listStyle: 'none',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        height: '10%',
        justifyContent: 'center',
    },
    rectIcon: {
        height: '7vh',
        width: '7vw',
        margin: 0
    },
    textArea: {
        height: '10vh',
        width: '70%',
        alignItems: 'center',
        marginLeft: '4%'
    },
    fontStyle: {
        fontFamily: 'Raleway-Medium',
    },
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
    const { topContainer, rectIcons, rectItem, rectIcon, textArea, fontStyle, quizHeaderLeft, quizHeaderRight, quizContainer, container } = useStyles();

    return (
        <Grid className={container}>
            <Grid container className={topContainer}>
                <Grid className={textArea}>
                    <Typography className={fontStyle} style={{fontSize: 48}}>Python for beginners</Typography>
                </Grid>
                <Grid container className={rectIcons}>
                    <Grid item className={rectItem}>
                        <TbEditCircle className={rectIcon} />
                    </Grid>
                    <Grid item className={rectItem}>
                        <FaPlayCircle className={rectIcon}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container className={quizContainer}>
                <Grid className={quizHeaderLeft}>
                    <Typography className={fontStyle} style={{fontSize: 32}}>Question</Typography>
                </Grid>
                <Grid className={quizHeaderRight}>
                    <Typography className={fontStyle} style={{fontSize: 32}}>Answer</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AddNewSet;