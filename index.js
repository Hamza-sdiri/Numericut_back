require("dotenv").config();


// imports

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// routes

const machineRouter = require('./routes/machineRoutes');

mongoose
  .connect(process.env.DB_URI, {

  })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
    
app.get('/', (req, res) => {
     res.send('Hello, World!');
});
app.use(express.json());

// Routes
app.use("/machine",machineRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});