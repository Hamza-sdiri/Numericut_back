require("dotenv").config();


// imports

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// routes

const machineRouter = require('./routes/machineRoutes');
const authRouter = require('./routes/authRoutes');
const comandeRouter = require('./routes/comandeRoutes');


// CORS policy
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
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
app.use("/auth",authRouter);
app.use("/comande",comandeRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});