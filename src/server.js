// server.js (Node.js with Express)
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON requests

// Nodemailer transporter with provided configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Mailtrap SMTP host
  port: 587,              // SMTP port
  secure: false,          // Use TLS
  auth: {
    user: 'ac2dc989dfdfe9', 
    pass: 'fcd862069acae5'  
  }
});

// API endpoint to send email
app.post('/send-email', (req, res) => {
  const { from, to, subject, message } = req.body;

  // Validate required fields
  if (!to || !message) {
    return res.status(400).send({ success: false, error: 'To and message fields are required.' });
  }

  // Configure the mail options
  const mailOptions = {
    from: from || 'default-sender@email.com', // Default sender
    to,
    subject: subject || 'No Subject',
    text: message || 'No Message'
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send({ success: false, error: error.message });
    }
    console.log('Email sent:', info.response);
    return res.status(200).send({ success: true, info: info.response });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
