const express = require('express')
const mongoose = require('mongoose');
const app = express()


app.get('/', (req, res) =>{
    res.send('Hello from Node API Server updated');
});

mongoose.connect('mongodb+srv://pnpnelly:GJp219h6flRnbTxl@backend.5aejx.mongodb.net/?retryWrites=true&w=majority&appName=Backend')
.then(() => {
    console.log('Connected to database!');
    app.listen(5000, () => {
        console.log('Server is running on port 5000')
    })
})
.catch(() =>{
    console.log('Connection failed!');
    
})
