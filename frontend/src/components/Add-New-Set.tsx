import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import { colors } from '../colors.js';
import { BsFillPlayFill, BsFillCircleFill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';
import { FiPlus } from 'react-icons/fi';

const useStyles = makeStyles({
    container: {
        justifyContent: 'center',
        marginLeft: '8em',
        width: 'calc(100% - 8em)'
    },

    //HEADER
    topContainer: {
        width: 'calc(100% - 8em)',
        marginTop: '3%',
        marginLeft: '6%',
        display: 'flex',
        alignItems: 'center',
    },
    studySetTitle: {
        marginRight: '29vw',
        fontFamily: 'Raleway-bold',
        fontSize: '2.5vw',
        display: 'inline',
    },
    colorCircle:{
        color: colors.cardBGBlue,
        marginLeft: '2%',
        marginRight: '2%',
        width: '1.5%',
        height: '1.5%',
    },
    buttonsContainer:{
        position: 'absolute',
        right: '0', 
        width: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playButton: {
        fontWeight: 'bold',
        cursor: 'pointer',
        color: 'white',
        fontFamily: 'Raleway-Medium',
        fontSize: 18,
        backgroundColor: colors.gray4,
        
        height: '2.4vw',
        width: '8.2vw',
        marginRight: '5%',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
    },
    playIcon: {
        marginRight: '5px',
    },
    editButton: {
        backgroundColor: colors.gray5,
        color: colors.gray4,
        borderColor: colors.gray2,
        border: '1px solid',
        fontFamily: 'Raleway-Medium',
        fontWeight: 900,
        fontSize: 18,
        borderRadius: '20px',
        cursor: 'pointer',
        
        height: '2.4vw',
        width: '8.2vw',
        marginRight: '4%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editIcon:{
        marginRight: '6px',
    },

    //QUESTION AND ANSWER HEADER
    qaTitleContainer:{
        marginTop: '3%', 
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qText:{
        color: colors.gray3,
        fontFamily: 'Raleway-medium',
        fontSize: 14,
        marginRight: '25%',
    },
    aText: {
        color: colors.gray3,
        fontFamily: 'Raleway-medium',
        fontSize: 14,
    },
    horizontalLine: {
        border: 'none',
        borderTop: '1px solid',
        borderColor: colors.gray2,
        margin: '1em 0',
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
    },

    //STUDY SET Q & A
    qaCardsContainer: {
        width: '100%',  
        height:  '100%', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qaPairContainer: {
        marginBottom: '2%',
        width: '80%',
        minHeight: '5em',
        display: 'flex',
        backgroundColor: colors.gray6,
        borderRadius: '25px',
    },
    qaCardStyle:{
        boxShadow: 'none',
        border: 'none',
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.gray6,
        borderRadius: '25px',
        padding: '2%',

        color: colors.gray4,
        fontFamily: 'Raleway-medium',
        fontSize: '17px',
        fontWeight: 600,
        letterSpacing: '-0.5px',
        flexWrap: 'wrap'
    },
    plusCardStyle:{
        border: '1px solid',
        borderColor: '#E2E3E3',
        backgroundColor: 'white',
        marginBottom: '2%',
        width: '80%',
        minHeight: '5em',
        borderRadius: '25px',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    plusIcon: {
        width: '6%',
        height: '5%',
        color: colors.gray2,
    },
});

const AddNewSet = () => {
    const { container, topContainer, colorCircle, studySetTitle, buttonsContainer, playButton, editButton, playIcon, editIcon, 
        qText, aText, qaTitleContainer, horizontalLine, 
        qaCardsContainer, qaPairContainer, qaCardStyle, plusCardStyle, plusIcon} = useStyles();
    
    //For testing purposes only, add backend later:
    const sampleQA: [string, string][] = 
        [['Print statement','print(“hello world”)'], 
        ['Variable assignment','num = 0'],
        ['Integer','A data type for positive or negative whole numbers']];

    return (
        <div  className={container}>

            {/* HEADER */}
            <div className={topContainer}>
                <BsFillCircleFill className={colorCircle} />
                <Typography className={studySetTitle}>Python for beginners</Typography>
                <div className={buttonsContainer}>
                    <button className={playButton}>
                        <BsFillPlayFill className={playIcon}/>
                        Play 
                    </button>

                    <button className={editButton}>
                        <MdModeEditOutline className={editIcon}/>
                        Edit 
                    </button>
                </div>
            </div>

            {/* QUESTION AND ANSWER HEADER */}
            <Grid container className={qaTitleContainer}>
                <Grid className={qText}>
                    <h1>Question</h1>
                </Grid>
                <Grid className={aText}>
                    <h1>Answer</h1>
                </Grid>
                <div className={horizontalLine} />
            </Grid>

            {/* STUDY SET Q&A */}
            <div className={qaCardsContainer}>
            {sampleQA.map((qa) => (
                <div className={qaPairContainer}>
                    <Card className={qaCardStyle}>
                        {qa[0]}
                    </Card>
                    <Card className={qaCardStyle}>
                        {qa[1]}
                    </Card>
                </div>
                ))
            }
            <div className={plusCardStyle}>
                <FiPlus className={plusIcon}/>
            </div>
            </div>
        </div>
    );
};

export default AddNewSet;