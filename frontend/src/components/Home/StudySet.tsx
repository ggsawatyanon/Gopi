import React, { useEffect, useState }  from 'react';
import { Card, CardContent, Grid, makeStyles, Typography, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { colors } from '../../colors.js';
import { db } from '../../firebase';
import { collection, getDocs } from '@firebase/firestore';

const useStyles = makeStyles({
    headingContainer: {
        backgroundColor: colors.green1,
        height: '15em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: 'white',
        borderRadius:'25px',
        top: '2em',
        position: 'relative',
        // width:'65em',
        margin:'0',
        padding: '0',
    },
    containerTitle:{
        fontFamily: 'Raleway-Bold',
        fontSize: 25,
        top: '0',
        margin: '3%'
    },
    lastPlayedSet: {
        backgroundColor:'white',
        color: colors.pink1,
        borderRadius: '20px',
        fontFamily: 'Raleway-Bold',
        fontSize: 15,
        margin: '10%'
    },
    gridContainer: {
        paddingTop:'5em',
    },
    cardStyle: {
        borderRadius: '25px',
        padding: 0,
        width: '16em',
        height: '14em',
        boxShadow: 'none',
        position: 'relative',
        overflow: 'hidden',
      },
      cardContent:{
        top: '0',
        left: '0',
        width: '100%',
        margin: 0,
        padding: 0,
    },
    addCard: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer',
        padding:0,
    },
    addCardImg: {
        height: '6em',
        width: '6em',
        margin: 'auto',
    },
    cardName: {
        fontFamily: 'Raleway-Medium',
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        justifyContent: 'center',
        padding: '6%',
    },
    cardNameContainer: {
        top: '0',
        left: '0',
        width: '100%',
        height: '3.5em',
        backgroundColor: 'white',
        borderRadius: '25px 25px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        margin: 0,
        padding: 0,
    },
    questionsSumStyle: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        position:'relative',
        top:'1.7em',
        fontFamily: 'Raleway-Bold',
        fontSize: 23,
    },
    playLabelStyle: {
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '2.4em',
        width: '7em',
        position:'relative',
        top:'3.3em',
        fontFamily: 'Raleway-Bold',
        fontSize: 20,
        borderRadius: '18px',
        margin:'auto',
        textAlign: 'center'
    }
});

const StudySet = () => {
  const { headingContainer, containerTitle, lastPlayedSet, gridContainer, cardStyle, addCard, addCardImg, 
    cardName, cardNameContainer, questionsSumStyle, cardContent, playLabelStyle } = useStyles();
  const [cards, setCards] = useState<any[]>([]);
  const cardsCollectionRef = collection(db, 'cards')

  useEffect(() => {
    const getCards = async () => {
      const data = await getDocs(cardsCollectionRef)
      setCards(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    getCards()
  }, [])

    return (
        <div>
            <Box className={headingContainer}>
                <h1 className={containerTitle}>Jump into Learning with Gopi: Study, Play, and Bloom!</h1>
                {/* <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                    <Box className={lastPlayedSet}>
                    <Typography variant="h5" component="h2" className={cardName}>
                        {cards.at}
                    </Typography>
                    </Box>
                    </Grid>
                </Grid> */}
                <p>Play Now</p>
            </Box>
            <Grid container className={gridContainer} spacing={5}>
                <Grid item xs={12} sm={3}>
                    <Link to="/add-new-set" className={addCard}>
                        <Card className={cardStyle}>
                            <CardContent className={addCard}>
                                <div className={addCardImg}>
                                    <FiPlus color="#E2E3E3" className={addCardImg}/>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                {
                    cards.map((card) => {
                        return <Grid item xs={12} sm={3}>
                                    <Card className={cardStyle} style={{ backgroundColor: colors['cardBG' + card.color as keyof typeof colors] }}>
                                        <CardContent className={cardContent}>
                                            <div className={cardNameContainer}>
                                                <Typography variant="h5" component="h2" className={cardName}>
                                                    {card.name}
                                                </Typography>
                                            </div>
                                            <Typography variant="body2" component="p" className={questionsSumStyle}>
                                                {card.questionsSum + ' Questions'}
                                            </Typography>
                                            <Typography variant="body2" component="p" className={playLabelStyle} style={{ color: colors['cardPlay' + card.color as keyof typeof colors] }}>
                                                Play
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                    })
                }
            </Grid>
        </div>
    );
    };

    export default StudySet;