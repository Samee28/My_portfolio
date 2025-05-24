const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});


app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;
  console.log("Received form data:", name, email, message); // 👈 ye line add karo
  // Email sender config (Gmail SMTP)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rsameeksha8@gmail.com', // Apna Gmail daalo yahan
      pass: 'qbcf omum jjkh ajrh', // Gmail app password (2FA enabled hone par)
    },
  });

  const mailOptions = {
    from: 'rsameeksha8@gmail.com', // Must match Gmail account used in auth
    to: 'rsameeksha8@gmail.com',
    subject: `New message from ${name} via Portfolio`,
    text: `${message}\n\nSender Email: ${email}`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ success: false, message: 'Email send failed' });
    }
    console.log('Email sent:', info.response); 
    return res.send({ success: true, message: 'Email sent successfully' });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
