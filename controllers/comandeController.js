const Comande = require('../models/Comande');
const User = require('../models/user')
const nodemailer = require("nodemailer");
require('dotenv').config();

var transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function sendValidationEmail(userEmail,id) {
 
  // Email options
  const mailOptions = {
    from: "numericut@gmail.com",
    to: userEmail,
    subject: `your command number : ${id}`,
    html: `
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif;">
    <tr>
      <td align="center">
<img src="https://i.ibb.co/Sm0WvmC/logo.jpg" alt="logo" border="0" />
<h2 style="color: #BD2C43; text-align: center;">Your command is saved successfully</h2>
        <p>one of our staff will contact you very shortly</p>
      </td>
    </tr>
  </table>
    `,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending validation email:", error);
    } else {
      console.log("Validation email sent:", info.response);
    }
  });
}



exports.createComande = (req, res) => {
    const comande = new Comande({
        customer: req.body.customer, 
        totalPrice: req.body.totalPrice, 
        shippingAddress: req.body.shippingAddress, 
        paymentMethod: req.body.paymentMethod, 
        orderStatus: req.body.orderStatus || 'processing', 
        orderedAt: req.body.orderedAt || Date.now(), 
        deliveredAt: req.body.deliveredAt 
    });
  // Sending the email
    
    comande.save()
        .then(() => {
            User.findOne({username:req.body.customer})
            .then((user) => {
              sendValidationEmail(user.email,comande.id);
            })
            res.status(201).json({ message: 'Comande saved successfully!' });
        })
        .catch((error) => {
            res.status(400).json({ error: error });
        });
};


exports.getComandeById = (req, res) => {
    Comande.findOne({ _id: req.params.id })
        .then((comande) => {
            res.status(200).json(comande);
        })
        .catch((error) => {
            res.status(404).json({ error: error });
        });
}

exports.getAllComandes = (req, res) => {
    Comande.find()
        .then((comandes) => {
            res.status(200).json(comandes);
        })
        .catch((error) => {
            res.status(400).json({ error: error });
        });
}

exports.updateComande = (req, res) => {
    Comande.findOne({ _id: req.params.id })
        .then((comande) => {
            if (!comande) {
                return res.status(404).json({ message: 'Comande not found!' });
            }

            comande.customer = req.body.customer || comande.customer;
            comande.totalPrice = req.body.totalPrice || comande.totalPrice;
            comande.shippingAddress = req.body.shippingAddress || comande.shippingAddress;
            comande.paymentMethod = req.body.paymentMethod || comande.paymentMethod;
            comande.orderStatus = req.body.orderStatus || comande.orderStatus;
            comande.orderedAt = req.body.orderedAt || comande.orderedAt;
            comande.deliveredAt = req.body.deliveredAt || comande.deliveredAt;

            return comande.save();
        })
        .then(() => {
            res.status(200).json({ message: 'Comande updated successfully!' });
        })
        .catch((error) => {
            res.status(400).json({ error: error });
        });
}

exports.deleteComande = (req, res) => {
    Comande.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: 'Deleted!' });
        })
        .catch((error) => {
            res.status(400).json({ error: error });
        });
}
