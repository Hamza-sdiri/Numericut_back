const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
mongoose.connect('mongodb+srv://user1:TOj4uPuYuYt4Wepu@cluster0.jfm1r.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB successfully!');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
    
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});