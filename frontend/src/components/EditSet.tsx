import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Button, Grid, Popover, TextField, makeStyles } from '@material-ui/core';
import { colors } from '../colors';
import { BsFillCircleFill, BsFillPlayFill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';
import { BlockPicker } from 'react-color';
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
    colorCircle: {
        marginLeft: '2%',
        marginRight: '2%',
        width: '1.5%',
        height: '1.5%',
    },
    buttonsContainer: {
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
    editIcon: {
        marginRight: '6px',
    },

    //QUESTION AND ANSWER HEADER
    qaTitleContainer: {
        marginTop: '3%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qText: {
        color: colors.gray3,
        fontFamily: 'Raleway-medium',
        fontSize: 14,
        marginRight: '35%',
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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    qaPairContainer: {
        marginBottom: '2%',
        width: '80%',
        minHeight: '5em',
        display: 'flex',
        backgroundColor: colors.gray6,
        borderRadius: '25px',
        flexDirection: 'row'
    },
    qaCardStyle: {
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
    plusCardStyle: {
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
});

type Question = {
    question: string;
    answer: string;
};

type DocumentData = {
    name: string;
    color: string;
    questions: Question[];
};


export const EditSet = () => {
    const { topContainer, container, colorCircle, studySetTitle, buttonsContainer, qaPairContainer,
        playButton, playIcon, editButton, editIcon, qaTitleContainer, qText, aText, horizontalLine,
        qaCardsContainer, plusCardStyle, plusIcon, qaCardStyle } = useStyles();
    const { cardId } = useParams();
    const [cardData, setCardData] = useState<DocumentData | null>(null);
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [questionList, setQuestionList] = useState([{ question: "", answer: "" }]);
    const [anchorEl, setAnchorEl] = useState(null);
    const colorOptions = [colors.cardBGRed, colors.cardBGOrange, colors.cardBGYellow, colors.cardBGGreen, colors.cardBGBlue, colors.cardBGPurple, colors.cardBGPink]
    const open = Boolean(anchorEl);
    const handleColorClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleColorChange = (color: any) => {
        setColor(color.hex);
        handleClose();
    };

    const addQuestion = () => {
        setQuestionList([...questionList, { question: "", answer: "" }]);
    };

    useEffect(() => {
        const fetchCardData = async () => {
            if (!cardId) {
                console.error("Card ID not provided.");
                return;
            }
            const cardRef = doc(db, 'cards', cardId);
            const cardSnapshot = await getDoc(cardRef);
            if (cardSnapshot.exists()) {
                const data = cardSnapshot.data() as DocumentData;
                setCardData(data);
                setName(data.name);
                setColor(data.color);
                setQuestionList(data.questions);
            }
        };

        fetchCardData();
    }, [cardId]);

    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };

    const handleQuestionChange = (event: any, index: any) => {
        const updatedQuestions = [...questionList];
        updatedQuestions[index].question = event.target.value;
        setQuestionList(updatedQuestions);
    };

    const handleAnswerChange = (event: any, index: any) => {
        const updatedQuestions = [...questionList];
        updatedQuestions[index].answer = event.target.value;
        setQuestionList(updatedQuestions);
    };

    const handleSave = async () => {
        try {
            if (!cardId) {
                console.error("Card ID not provided.");
                return;
            }
            const cardRef = doc(db, 'cards', cardId);
            const questions = questionList.map((singleQuestion) => ({
                question: singleQuestion.question,
                answer: singleQuestion.answer,
            }));
            await updateDoc(cardRef, {
                name,
                color,
                questions,
            });
            console.log('Card updated successfully');
        } catch (error) {
            console.error('Error updating card:', error);
        }
    };

    if (!cardData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={container}>
            <div className={topContainer}>
                <BsFillCircleFill
                    className={colorCircle}
                    onClick={handleColorClick}
                    style={{ color: color, cursor: 'pointer' }}
                />
                <TextField
                    fullWidth
                    className={studySetTitle}
                    variant="standard"
                    placeholder="Set Card Title"
                    value={name}
                    onChange={handleNameChange}
                    InputProps={{
                        disableUnderline: true,
                        style: { fontSize: 34 },
                    }}
                />
                <div className={buttonsContainer}>
                    <button className={playButton}>
                        <BsFillPlayFill className={playIcon} />
                        Play
                    </button>

                    <button className={editButton} onClick={handleSave}>
                        <MdModeEditOutline className={editIcon} />
                        Save
                    </button>
                </div>
            </div>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <BlockPicker color={color} onChange={handleColorChange} colors={colorOptions} />
            </Popover>

            <Grid container className={qaTitleContainer}>
                <Grid className={qText}>
                    <h1>Question</h1>
                </Grid>
                <Grid className={aText}>
                    <h1>Answer</h1>
                </Grid>
                <div className={horizontalLine} />
            </Grid>

            <div className={qaCardsContainer}>
                <form onSubmit={handleSave} className={qaCardsContainer}>
                    {questionList.map((singleQuestion, index) => (
                        <div key={index} className={qaPairContainer}>
                            <TextField
                                required
                                variant="standard"
                                fullWidth
                                className={qaCardStyle}
                                value={singleQuestion.question}
                                onChange={(e) => handleQuestionChange(e, index)}
                                InputProps={{
                                    disableUnderline: true,
                                    style: { fontSize: 24 },
                                }}
                            />
                            <TextField
                                required
                                multiline
                                variant="standard"
                                fullWidth
                                className={qaCardStyle}
                                value={singleQuestion.answer}
                                onChange={(e) => handleAnswerChange(e, index)}
                                InputProps={{
                                    disableUnderline: true,
                                    style: { fontSize: 24 },
                                }}
                            />
                        </div>
                    ))}
                    <div className={plusCardStyle} onClick={addQuestion}>
                        <FiPlus className={plusIcon} />
                    </div>
                </form>
            </div>
        </div>
    );

};

