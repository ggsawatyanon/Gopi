import React from 'react';
import { Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import { ReactComponent as PlusIcon } from '../assets/plus-solid.svg';
// import PlusIcon from '../../assets/plus-solid.svg';
import { colors } from '../../colors';

const useStyles = makeStyles({
    gridContainer: {
        paddingTop:'30px',
    },
    card: {
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

const StudySet: React.FC = () => {
  const { gridContainer, card, addCard, addCardImg } = useStyles();
    return (
        <Grid container className={gridContainer} spacing={5}>
            <Grid item xs={12} sm={3}>
                <Link to="/add-new-set" className={addCard}>
                    <Card className={card}>
                        <CardContent className={addCard}>
                            <div className={addCardImg}>
                            {/* <PlusIcon className={addCardImg}/> */}
                            <img src='plus-solid.svg' alt='Add a New Set'></img>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </Grid>

            {/* PLACEHOLDER CARDS */}
            <Grid item xs={12} sm={3}>
                <Card className={card}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Card Title
                        </Typography>
                        <Typography color="textSecondary">
                            Card Subtitle
                        </Typography>
                        <Typography variant="body2" component="p">
                            Card Content
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sm={3}>
            <Card className={card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Card Title
                    </Typography>
                    <Typography color="textSecondary">
                        Card Subtitle
                    </Typography>
                    <Typography variant="body2" component="p">
                        Card Content
                    </Typography>
                </CardContent>
            </Card>
            </Grid>

            <Grid item xs={12} sm={3}>
            <Card className={card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Card Title
                    </Typography>
                    <Typography color="textSecondary">
                        Card Subtitle
                    </Typography>
                    <Typography variant="body2" component="p">
                        Card Content
                    </Typography>
                </CardContent>
            </Card>
            </Grid>
        </Grid>
    );
    };

    export default StudySet;