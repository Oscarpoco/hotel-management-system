import React, { useState } from "react";
import '../styling/SignIn.css'
import { TextField, Button, Box, Typography, Paper, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleSigning, handleLoader } from "../../redux/actions/UserInterface";
import { handleCloseNotificationAlert, handleOpenNotificationAlert } from "../../redux/actions/AlertNotification";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { setUserId } from "../../redux/actions/UserInterface";
import NotificationArlet from "./NotificationArlet";

function SignIn() {
    const dispatch = useDispatch();
    const notification = useSelector((state) => state.notification);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // HANDLE SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleLoader(true));

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(setUserId(user.uid));

                dispatch(handleOpenNotificationAlert('Login successful!'));
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
        <Container component="main" maxWidth="xs" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Paper elevation={10} sx={{ padding: 4, mt: 8, borderRadius: 2 }}>
                {/* LOGO */}
                <Box display="flex" justifyContent="center" mb={2}>
                    <Typography variant="h4" component="div" sx={{ fontWeight: "bold", letterSpacing: 2 }}>
                        RH
                    </Typography>
                </Box>
                <Typography variant="h5" align="center" gutterBottom>
                    Management System
                </Typography>

                <form onSubmit={handleSubmit}>
                    {/* EMAIL */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                        required
                    />

                    {/* PASSWORD */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* SUBMIT BUTTON */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                    >
                        Proceed
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
