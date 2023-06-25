import React, { useEffect, useState }  from 'react';
import { Card, CardContent, Grid, makeStyles, Typography, Box, TextField, InputAdornment } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { HiSearch } from 'react-icons/hi';
import { colors } from '../../colors.js';
import { db } from '../../firebase.js';
import OrderDropDown from './OrderDropDown';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

const useStyles = makeStyles({
    //Green rounded rectangle at top, holding welcome text and most recently played study set
    headingContainer: {
        backgroundColor: colors.green1,
        height: '16em',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: 'white',
        position: 'relative',
        margin:'0',
        padding: '0',
    },
    //Style of welcome text, currently: "Jumpm into learning with...!""
    headingTitle:{
        fontFamily: 'Raleway',
        fontSize: 17,
        top: '0',
    },
    //Style of gopi logo in heading
    headingLogo:{
        height: '10em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    //Style of search bar
    searchBar: {
        '& .MuiInputBase-root': {
          backgroundColor: colors.gray1,
          borderRadius: 20,
          height: 40,
          width: 200,
          marginTop: '4%',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: colors.gray1,
            },
            '&:hover fieldset': {
                borderColor: colors.green1,
            },
            '&.Mui-focused fieldset': {
                borderColor: colors.green1,
            },
        },
    },
    //Search icon
    searchIcon: {
        color: colors.green1
    },
    //OrderDropDown style within the searchSortStyle div
    sortByStyle:{
        position: 'absolute',
        right: '6%', 
    },
    //Search bar + OrderDropDown Style
    searchSortStyle: {
        width:'100%',
        marginTop: '3%',
        marginLeft: '6%',
        display: 'flex',
    },
    //Style of grid container of the study sets
    gridContainer: {
        paddingTop:'1em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        maxWidth: '90%',
        flexWrap: 'wrap',
        marginTop: 0,
    },
    //Style for all study set cards 
    cardStyle: {
        borderRadius: '30px 30px 25px 25px',
        padding: 0,
        width: '16em',
        height: '14em',
        boxShadow: 'none',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: colors.gray1
      },
      //Style for content inside each card
      cardContent:{
        top: '0',
        left: '0',
        width: '100%',
        margin: 0,
        padding: 0,
    },
    //Style for first card with plus image on it 
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
    //Style for plus image
    addCardImg: {
        height: '6em',
        width: '6em',
        margin: 'auto',
    },
    //Style for card text that displays study set's name e.g. Intro to Python
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
    //Style for rectangle with card inside 
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
    //Style for e.g. 25 Questions
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
    //Style for Play button on each card
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



const HomeContent = () => {
    const { headingContainer,headingTitle, searchBar, searchIcon, sortByStyle, searchSortStyle,
    gridContainer, cardStyle, addCard, addCardImg, cardName, cardNameContainer, questionsSumStyle, 
    cardContent, playLabelStyle, headingLogo } = useStyles();
    const [cards, setCards] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<string>('Last played');

    //Get + Filter + Order cards whenever cards/searchQuery/sortBy is changed
    useEffect(() => {
        const getCards = async () => {
            const cardsCollectionRef = collection(db, 'cards')
            
            try{
                const querySnapshot = await getDocs(cardsCollectionRef)
                const data = querySnapshot.docs.map((doc) => ({...doc.data(), 
                    id: doc.id,
                    name: doc.get('name'),
                    lowerCaseName: doc.get('name').toLowerCase(),
                    lastPlayed: doc.get('lastPlayed'),
                    created: doc.get('created'),
                    lastEdited: doc.get('lastEdited')
                }))

                //Filter for search
                const filteredData = data.filter((doc) => 
                doc.lowerCaseName.includes(searchQuery.toLowerCase()))

                // //Order data
                let sortedData = filteredData
                if (sortBy === 'Last Played') {
                    sortedData.sort((a, b) => b.lastPlayed - a.lastPlayed);
                } else if (sortBy === 'Created first') {
                    sortedData.sort((a, b) => a.created - b.created);
                } else if (sortBy === 'Last edited') {
                    sortedData.sort((a, b) => b.lastEdited - a.lastEdited);
                }

                setCards(sortedData.map((doc) => ({...doc, id: doc.id, name: doc.name})))
            } catch (error){
                console.log('Error fetching cards:', error)
            }
        }
        getCards()
    }, [searchQuery, sortBy]);

    //Search Bar
    const handleSBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    //Sort By
    const handleSortSelect = (option: string) => {
        setSortBy(option);
    };

    return (
        <div>
            {/* HEADING: */}
            <Box className={headingContainer}>
                <h1 className={headingTitle}>Jump into Learning with...</h1>
                <img className={headingLogo} src="gopi-white-cropped.png" alt="Gopi Logo" />
            </Box>

            <div className={searchSortStyle}>

                {/* SEARCH BAR */}
                <TextField className={searchBar}
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSBChange}
                    placeholder="Search"
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end" className={searchIcon}>
                            <HiSearch />
                        </InputAdornment>
                        ),
                    }}
                />

                {/* SORT BY */}
                <div className={sortByStyle}>
                    <OrderDropDown sortBy={sortBy} onSortSelect={handleSortSelect} />
                </div>
            </div>

            {/* STUDY SET CARDS */}
            <Grid container className={gridContainer} spacing={5}>
                <Grid item xs={12} sm={3}>
                    <Link to="/add-new-set">
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

    export default HomeContent;