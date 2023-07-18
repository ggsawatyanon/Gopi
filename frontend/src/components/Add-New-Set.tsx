import React, { useState } from 'react';
import { TextField, CardContent, Grid, makeStyles, Typography, Button } from '@material-ui/core';
import { colors } from '../colors';
import { TbEditCircle } from 'react-icons/tb'
import { FaPlayCircle } from 'react-icons/fa'
import { doc, addDoc, collection } from "firebase/firestore";
import { db } from '../firebase'
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
    quizContainer: {
        width: '40vw',
        height: '100vh',
        backgroundColor: 'white',
        position: 'fixed',
        marginTop: '30vh',
        marginRight: '7.5vw',
        justifyContent: 'space-evenly',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflowY: 'scroll', // Added to enable scrolling
    },
    scrollableContent: {
        maxHeight: '80vh',
        overflowY: 'auto',
        paddingRight: '1em',
    },
    quizHeaderLeft: {
        backgroundColor: colors.green2,
        borderTopLeftRadius: 20,
        height: '10vh',
        width: '20vw',
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
    }
})

const AddNewSet = () => {
    const { topContainer, rectIcons, rectItem, rectIcon, textArea, fontStyle, quizHeaderLeft, quizHeaderRight, quizContainer, container, scrollableContent } = useStyles();
    const [name, setName] = useState('');
    const [questionList, setQuestionList] = useState([{ question: "", answer: "" }]);

    const addQuestion = () => {
        setQuestionList([...questionList, { question: "", answer: "" }]);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const collectionRef = collection(db, "cards");

            const questions = questionList.map((singleQuestion) => ({
                question: singleQuestion.question,
                answer: singleQuestion.answer,
            }));

            const docData = {
                name,
                questions,
            };

            await addDoc(collectionRef, docData);

            setQuestionList([{ question: "", answer: "" }]);
            setName('');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <Grid className={container}>
            <Grid container className={topContainer}>
                <Grid className={textArea}>
                    <TextField fullWidth variant="standard" label="Set Card Title" id="fullWidth" onChange={(e) => setName(e.target.value)} />
                </Grid>
                <Grid container className={rectIcons}>
                    <Grid item className={rectItem}>
                        <TbEditCircle className={rectIcon} />
                    </Grid>
                    <Grid item className={rectItem}>
                        <FaPlayCircle className={rectIcon} />
                    </Grid>
                </Grid>
            </Grid>
            <div className={quizContainer}>
                <form onSubmit={handleSubmit}>
                    <div className={scrollableContent}>
                        {questionList.map((singleQuestion, index) => (
                            <div key={index}>
                                <Grid>
                                    <Grid className={quizHeaderLeft}>
                                        <Typography className={fontStyle} style={{ fontSize: 32 }}>
                                            Question
                                        </Typography>
                                    </Grid>
                                    <TextField
                                        required
                                        label="Question"
                                        id="fullWidth"
                                        variant="outlined"
                                        value={singleQuestion.question}
                                        onChange={(e) => {
                                            const updatedQuestionList = [...questionList];
                                            updatedQuestionList[index].question = e.target.value;
                                            setQuestionList(updatedQuestionList);
                                        }}
                                    />
                                </Grid>
                                <Grid>
                                    <Grid className={quizHeaderRight}>
                                        <Typography className={fontStyle} style={{ fontSize: 32 }}>
                                            Answer
                                        </Typography>
                                    </Grid>
                                    <TextField
                                        required
                                        multiline
                                        label="Answer"
                                        id="fullWidth"
                                        variant="outlined"
                                        value={singleQuestion.answer}
                                        onChange={(e) => {
                                            const updatedQuestionList = [...questionList];
                                            updatedQuestionList[index].answer = e.target.value;
                                            setQuestionList(updatedQuestionList);
                                        }}
                                    />
                                </Grid>
                            </div>
                        ))}
                    </div>
                    <Button variant="outlined" color="primary" onClick={addQuestion}>
                        Add Question
                    </Button>
                    <Button variant="outlined" color="secondary" type="submit">
                        Create
                    </Button>
                </form>
            </div>
        </Grid>
    // const { container, topContainer, colorCircle, studySetTitle, buttonsContainer, playButton, editButton, playIcon, editIcon, 
    //     qText, aText, qaTitleContainer, horizontalLine, 
    //     qaCardsContainer, qaPairContainer, qaCardStyle, plusCardStyle, plusIcon} = useStyles();
    
    // //For testing purposes only, add backend later:
    // const sampleQA: [string, string][] = 
    //     [['Print statement','print(“hello world”)'], 
    //     ['Variable assignment','num = 0'],
    //     ['Integer','A data type for positive or negative whole numbers']];

    // return (
    //     <div  className={container}>

    //         {/* HEADER */}
    //         <div className={topContainer}>
    //             <BsFillCircleFill className={colorCircle} />
    //             <Typography className={studySetTitle}>Python for beginners</Typography>
    //             <div className={buttonsContainer}>
    //                 <button className={playButton}>
    //                     <BsFillPlayFill className={playIcon}/>
    //                     Play 
    //                 </button>

    //                 <button className={editButton}>
    //                     <MdModeEditOutline className={editIcon}/>
    //                     Edit 
    //                 </button>
    //             </div>
    //         </div>

    //         {/* QUESTION AND ANSWER HEADER */}
    //         <Grid container className={qaTitleContainer}>
    //             <Grid className={qText}>
    //                 <h1>Question</h1>
    //             </Grid>
    //             <Grid className={aText}>
    //                 <h1>Answer</h1>
    //             </Grid>
    //             <div className={horizontalLine} />
    //         </Grid>

    //         {/* STUDY SET Q&A */}
    //         <div className={qaCardsContainer}>
    //         {sampleQA.map((qa) => (
    //             <div className={qaPairContainer}>
    //                 <Card className={qaCardStyle}>
    //                     {qa[0]}
    //                 </Card>
    //                 <Card className={qaCardStyle}>
    //                     {qa[1]}
    //                 </Card>
    //             </div>
    //             ))
    //         }
    //         <div className={plusCardStyle}>
    //             <FiPlus className={plusIcon}/>
    //         </div>
    //         </div>
    //     </div>
    // );
    )
};

export default AddNewSet;