import React from "react";
import { Grid, Paper, Typography, IconButton, Box } from "@mui/material";
import { setView } from "../../redux/actions/View";
import { handleLoader } from "../../redux/actions/UserInterface";
import { useDispatch } from "react-redux";
import '../styling/Home.css'

// MUI Icons
import ReviewsIcon from '@mui/icons-material/Reviews';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

export default function Home() {
    const dispatch = useDispatch();

    const handleChangeComponents = (view) => {
        dispatch(handleLoader(true));

        setTimeout(() => {
            dispatch(setView(view));
            dispatch(handleLoader(false));
        }, 2000);
    };

    return (
        <Box sx={{ flexGrow: 1, p: 4 }} className='home'>
            {/* HOME HEADER */}
            <Typography variant="h4" component="h1" gutterBottom className='home-header' style={{color: 'rgba(0, 0, 0, .5)', fontWeight: '900'}}>
                Dashboard
            </Typography>

            {/* Dashboard Grid */}
            <Grid container spacing={4} className='dashboard-content-wrapper'>
                {/* Bookings */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        elevation={3}
                        sx={{ padding: 3, textAlign: "center", cursor: "pointer", height: '100%' }}
                        onClick={() => handleChangeComponents("bookings")}
                    >
                        <IconButton color="primary">
                            <BookOnlineIcon style={{ fontSize: 50, color: '#0077B5' }} />
                        </IconButton>
                        <Typography variant="h6" component="h2">
                            Bookings
                        </Typography>
                    </Paper>
                </Grid>

                {/* Accommodations */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        elevation={3}
                        sx={{ padding: 3, textAlign: "center", cursor: "pointer", height: '100%' }}
                        onClick={() => handleChangeComponents("accommodation")}
                    >
                        <IconButton color="primary">
                            <HomeWorkIcon style={{ fontSize: 50, color: '#1877F2' }} />
                        </IconButton>
                        <Typography variant="h6" component="h2">
                            Accommodations
                        </Typography>
                    </Paper>
                </Grid>

                {/* Loved Accommodations */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        elevation={3}
                        sx={{ padding: 3, textAlign: "center", cursor: "pointer", height: '100%' }}
                        onClick={() => handleChangeComponents("favorite")}
                    >
                        <IconButton color="primary">
                            <FavoriteIcon style={{ fontSize: 50, color: '#772222' }} />
                        </IconButton>
                        <Typography variant="h6" component="h2">
                            Loved Accommodations
                        </Typography>
                    </Paper>
                </Grid>

                {/* Feedback */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        elevation={3}
                        sx={{ padding: 3, textAlign: "center", cursor: "pointer", height: '100%' }}
                        onClick={() => handleChangeComponents("reviews")}
                    >
                        <IconButton color="primary">
                            <ReviewsIcon style={{ fontSize: 50, color: '#25D366' }} />
                        </IconButton>
                        <Typography variant="h6" component="h2">
                            Feedback
                        </Typography>
                    </Paper>
                </Grid>

                {/* Gallery */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        elevation={3}
                        sx={{ padding: 3, textAlign: "center", cursor: "pointer", height: '100%' }}
                        onClick={() => handleChangeComponents("gallery")}
                    >
                        <IconButton color="primary">
                            <PhotoLibraryIcon style={{ fontSize: 50, color: '#DD2A7B' }} />
                        </IconButton>
                        <Typography variant="h6" component="h2">
                            Gallery
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
