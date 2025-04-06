import React, { useEffect } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Fade, 
  Paper,
  IconButton
} from "@mui/material";
import { CheckCircle, Error, Info, Warning, Close as CloseIcon } from "@mui/icons-material";

const NotificationAlert = ({ message, onClose, notificationArletVisible, severity = "success", autoHideDuration = 3000 }) => {
  // Auto-hide the notification after specified duration
  useEffect(() => {
    if (notificationArletVisible && autoHideDuration) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);
      
      return () => clearTimeout(timer);
    }
  }, [notificationArletVisible, autoHideDuration, onClose]);

  if (!notificationArletVisible) return null;

  // Determine icon and color based on severity
  const getAlertStyles = () => {
    switch (severity) {
      case "error":
        return { 
          icon: <Error />, 
          color: "#f44336", 
          bgColor: "#fdeded" 
        };
      case "warning":
        return { 
          icon: <Warning />, 
          color: "#ff9800", 
          bgColor: "#fff4e5" 
        };
      case "info":
        return { 
          icon: <Info />, 
          color: "#2196f3", 
          bgColor: "#e6f4ff" 
        };
      case "success":
      default:
        return { 
          icon: <CheckCircle />, 
          color: "#25D366", 
          bgColor: "#edf7ed" 
        };
    }
  };

  const { icon, color, bgColor } = getAlertStyles();

  return (
    <Fade in={notificationArletVisible}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "2rem",
          backdropFilter: "blur(3px)"
        }}
        onClick={onClose}
      >
        <Paper
          elevation={6}
          onClick={(e) => e.stopPropagation()}
          sx={{
            backgroundColor: bgColor,
            maxWidth: "400px",
            width: "100%",
            marginTop: "5rem",
            borderRadius: "12px",
            overflow: "hidden",
            borderLeft: `6px solid ${color}`,
            position: "relative"
          }}
        >
          <IconButton
            size="small"
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "text.secondary"
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              padding: "1.5rem",
              paddingRight: "2.5rem",
              alignItems: "flex-start",
              gap: "1rem"
            }}
          >
            <Box sx={{ color: color, display: "flex", alignItems: "center" }}>
              {icon}
            </Box>
            
            <Box>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 500,
                  color: "text.primary",
                  marginBottom: "0.5rem"
                }}
              >
                {message}
              </Typography>
              
              <Button
                variant="contained"
                size="small"
                disableElevation
                onClick={onClose}
                sx={{
                  backgroundColor: color,
                  color: "white",
                  textTransform: "none",
                  fontWeight: 500,
                  borderRadius: "6px",
                  '&:hover': {
                    backgroundColor: color,
                    opacity: 0.9
                  }
                }}
              >
                Dismiss
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

export default NotificationAlert;