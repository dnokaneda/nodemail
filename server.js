require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 8080;
const config = process.env;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let transporter = nodemailer.createTransport({
  service: config.SERVICE,
  host: config.HOST,
  port: config.PORT,
  secure: config.SECURE,  
  auth: {
    user: config.EMAIL,
    pass: config.PASSWORD
  },
});

app.post('/send-message', (req, res) => {
  transporter.sendMail({  to:  req.body.to,
                          subject: req.body.subject,
                          text: req.body.text,
                          html: req.body.html, }, function(err, data) {
    if (err) {            
      return res.json({ Error: err });
    } else {      
      return res.json({ Msg: "Message sent!" });
    }
  });
});

app.listen(PORT);
