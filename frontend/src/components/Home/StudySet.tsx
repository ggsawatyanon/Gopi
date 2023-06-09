import React, { useEffect, useState }  from 'react';
import { Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
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
        padding: '12px',
        paddingRight: '1%',
        width: '16em',
        height: '16em',
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
});

const StudySet = () => {
  const { gridContainer, cardStyle, addCard, addCardImg } = useStyles();
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
                <Grid item xs={12} sm={3}>
                    <Link to="/add-new-set" className={addCard}>
                        <Card className={cardStyle}>
                            <CardContent className={addCard}>
                                <div className={addCardImg}>
                                {/* <PlusIcon className={addCardImg}/> */}
                                <img src='plus-solid.svg' alt='Add a New Set'></img>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                {
                    cards.map((card) => {
                        return <Grid item xs={12} sm={3}>
                                    <Card className={cardStyle}>
                                        <CardContent>
                                            <Typography variant="h5" component="h2">
                                                {card.title}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                {card.subtitle}
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                {card.content}
                                            </Typography>
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