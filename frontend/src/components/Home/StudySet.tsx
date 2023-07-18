import React, { useEffect, useState }  from 'react';
import { Button, Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import { ReactComponent as PlusIcon } from '../assets/plus-solid.svg';
// import PlusIcon from '../../assets/plus-solid.svg';
import { colors } from '../../colors';
import { db } from '../../firebase';
import { collection, getDocs } from '@firebase/firestore';

const useStyles = makeStyles({
    gridContainer: {
        paddingTop:'30px',
    },
    cardStyle: {
        borderRadius: '25px',
        width: '22em',
        height: '16em'
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
        height: '5em',
        width: '5em',
        margin: 'auto',
        fill: colors.green1,
    },
    cardHeader: {
        backgroundColor: 'white',
        width: '22em',
        height: '4em',
        position: 'absolute',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    }
});

const StudySet = () => {
  const { gridContainer, cardStyle, addCard, addCardImg, cardHeader } = useStyles();
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
        <>
            <Grid container className={gridContainer} spacing={5}>
                <Grid item xs={12} sm={4}>
                    <Link to="/add-new-set" className={addCard}>
                        <Card className={cardStyle}>
                            <CardContent className={addCard}>
                                <div className={addCardImg}>
                                    <img src='plus-solid.svg' alt='Add a New Set'></img>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                {
                    cards.map((card) => {
                        return <Grid item xs={12} sm={4}>
                                    <Card className={cardStyle} style={{backgroundColor: card.color}}>
                                        <div className={cardHeader}>
                                            <Typography variant="h5" style={{fontFamily: 'Raleway-Medium', marginTop:'1em'}} align='center'>
                                                {card.name}
                                            </Typography>
                                        </div>
                                        <CardContent>
                                            <Typography variant="h4" align="center" style={{fontFamily: 'Raleway-Medium', color: 'white', marginTop: '2em'}}>
                                                {card.questionsSum} Questions
                                            </Typography>
                                            <Button variant="text" style={{backgroundColor: 'white', color: card.color, width: '80%', marginLeft: '10%', fontSize: 32, borderRadius: 20, marginTop: '1em'}}>Play</Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                    })
                }
            </Grid>
        </>
    );
    };

    export default StudySet;