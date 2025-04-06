import React from "react";
import { 
  Grid, 
  Paper, 
  Typography, 
  IconButton, 
  Box, 
  Container,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { setView } from "../../redux/actions/View";
import { handleLoader } from "../../redux/actions/UserInterface";
import { useDispatch } from "react-redux";
import '../styling/Home.css';

// MUI Icons
import ReviewsIcon from '@mui/icons-material/Reviews';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

// Animation
import { motion } from "framer-motion";

export default function Home() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChangeComponents = (view) => {
        dispatch(handleLoader(true));

        setTimeout(() => {
            dispatch(setView(view));
            dispatch(handleLoader(false));
        }, 300);
    };

    const cardVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
            transition: { duration: 0.3 }
        }
    };

    const dashboardItems = [
        {
            title: "Bookings",
            icon: <BookOnlineIcon style={{ fontSize: isMobile ? 40 : 50, color: '#fff' }} />,
            view: "bookings",
            gradient: "linear-gradient(135deg, #0077B5 0%, #00568a 100%)",
        },
        {
            title: "Accommodations",
            icon: <HomeWorkIcon style={{ fontSize: isMobile ? 40 : 50, color: '#fff' }} />,
            view: "accommodation",
            gradient: "linear-gradient(135deg, #1877F2 0%, #0a5dc7 100%)",
        },
        {
            title: "Loved Accommodations",
            icon: <FavoriteIcon style={{ fontSize: isMobile ? 40 : 50, color: '#fff' }} />,
            view: "favorite",
            gradient: "linear-gradient(135deg, #772222 0%, #5a1a1a 100%)",
        },
        {
            title: "Feedback",
            icon: <ReviewsIcon style={{ fontSize: isMobile ? 40 : 50, color: '#fff' }} />,
            view: "reviews",
            gradient: "linear-gradient(135deg, #25D366 0%, #1aa350 100%)",
        },
        {
            title: "Gallery",
            icon: <PhotoLibraryIcon style={{ fontSize: isMobile ? 40 : 50, color: '#fff' }} />,
            view: "gallery",
            gradient: "linear-gradient(135deg, #DD2A7B 0%, #b02263 100%)",
        }
    ];

    return (
        <Container maxWidth="xxl" sx={{ py: 4}} className='home'>
            {/* Welcome Section */}
            <Box sx={{ 
                mb: 6, 
                textAlign: 'left',
                position: 'relative',
                pl: 2,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '10%',
                    height: '80%',
                    width: '4px',
                    borderRadius: '4px',
                    background: 'linear-gradient(to bottom, #4361ee, #3a0ca3)'
                }
            }}>
                <Typography 
                    variant="h3" 
                    component="h1" 
                    sx={{
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        mb: 1
                    }}
                >
                    Dashboard
                </Typography>
                <Typography 
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ maxWidth: '1400px' }}
                >
                    Welcome back! Manage your accommodations, bookings, and more from this central hub.
                </Typography>
            </Box>

            {/* Dashboard Grid */}
            <Grid container spacing={3} className='dashboard-content-wrapper'>
                {dashboardItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={item.view}>
                        <motion.div
                            whileHover="hover"
                            variants={cardVariants}
                        >
                            <Paper
                                elevation={0}
                                sx={{ 
                                    padding: { xs: 2, md: 3 }, 
                                    height: '100%',
                                    textAlign: "center", 
                                    cursor: "pointer",
                                    background: item.gradient,
                                    color: '#fff',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                    minHeight: { xs: '160px', md: '200px' },
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        bottom: '-40px',
                                        right: '-40px'
                                    }
                                }}
                                onClick={() => handleChangeComponents(item.view)}
                            >
                                <IconButton 
                                    sx={{ 
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        p: { xs: 1.5, md: 2 },
                                        mb: 2,
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.3)'
                                        }
                                    }}
                                >
                                    {item.icon}
                                </IconButton>
                                <Typography 
                                    variant="h6" 
                                    component="h2"
                                    sx={{ 
                                        fontWeight: 600,
                                        fontSize: { xs: '1rem', md: '1.25rem' }
                                    }}
                                >
                                    {item.title}
                                </Typography>
                            </Paper>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}