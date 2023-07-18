import React, { useState } from 'react';
import { TextField, CardContent, Grid, makeStyles, Typography, Button } from '@material-ui/core';
import { colors } from '../colors';
import { TbEditCircle } from 'react-icons/tb'
import { FaPlayCircle } from 'react-icons/fa'
import { doc, addDoc, collection } from "firebase/firestore";
import { db } from '../firebase'

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
    );
};

export default AddNewSet;