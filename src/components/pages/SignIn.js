import React, { useState } from "react";
import '../styling/SignIn.css';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Paper, 
  Container,
  InputAdornment,
  IconButton,
  Avatar,
  Divider,
  CircularProgress
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleSigning, handleLoader } from "../../redux/actions/UserInterface";
import { handleCloseNotificationAlert, handleOpenNotificationAlert } from "../../redux/actions/AlertNotification";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { setUserId } from "../../redux/actions/UserInterface";
import NotificationArlet from "./NotificationArlet";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

function SignIn() {
    const dispatch = useDispatch();
    const notification = useSelector((state) => state.notification);
    const loading = useSelector((state) => state.userInterface.loading);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // HANDLE SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (email !== "chauke@gmail.com") {
            setEmailError("Access restricted to Super Admin only");
            dispatch(handleOpenNotificationAlert("Access restricted to Super Admin only"));
            setTimeout(() => dispatch(handleCloseNotificationAlert()), 3000);
            return;
        }
        
        setEmailError("");
        dispatch(handleLoader(true));

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(setUserId(user.uid));

                dispatch(handleOpenNotificationAlert('Login successful! Welcome back.'));
                setTimeout(() => dispatch(handleCloseNotificationAlert()), 3000);

                dispatch(toggleSigning());
                dispatch(handleLoader(false));
            })
            .catch((error) => {
                const errorMessage = error.message;

                dispatch(handleOpenNotificationAlert(`${errorMessage}`));
                setTimeout(() => dispatch(handleCloseNotificationAlert()), 3000);

                dispatch(handleLoader(false));
            });
    };

    return (
        <div className="signIn-wrapper">
            <Container component="main" maxWidth="xs" style={{ 
                minHeight: '300px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100vh',
                overflow: 'hidden'
            }}>
                <Paper 
                    elevation={0} 
                    sx={{ 
                        padding: 4, 
                        borderRadius: 3,
                        width: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    }}
                >
                    {/* LOGO */}
                    <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                        <Avatar 
                            sx={{ 
                                width: 64, 
                                height: 64, 
                                bgcolor: 'primary.main',
                                mb: 2
                            }}
                        >
                            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                                RH
                            </Typography>
                        </Avatar>
                        <Typography variant="h5" fontWeight={600} gutterBottom>
                            Management System
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align="center">
                            Sign in to access your dashboard
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    <form onSubmit={handleSubmit}>
                        {/* EMAIL */}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError("");
                            }}
                            autoFocus
                            required
                            error={!!emailError}
                            helperText={emailError}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* PASSWORD */}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="primary" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* SUBMIT BUTTON */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={loading}
                            sx={{ 
                                mt: 4, 
                                mb: 2, 
                                py: 1.5,
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '1rem'
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>
                </Paper>

                {/* POPUP */}
                <NotificationArlet
                    message={notification.message}
                    onClose={() => dispatch(handleCloseNotificationAlert())}
                    notificationArletVisible={notification.notificationArletVisible}
                />
            </Container>
        </div>
    );
}

export default SignIn;