const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express()


app.use(express.json());


app.get('/', (req, res) =>{
    res.send('Hello from Node API Server updated');
});

app.post('/api/products', async (req, res) =>{
    try {
       const product = await Product.create(req.body)
       res.status(200).json(product)
    } catch (error) {
       res.status(500).json({message: error.message});
    }
});

app.get('/api/products', async (req, res) =>{
    try {
        const products = await Product.find(req.body)
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message}); 
    }
});

//update a product
app.put('/api/product/:id', async (req, res) => { 
    try { 
        const { id } = req.params;

        // Update the product and get the updated document in a single step
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

        // If the product was not found, send a 404 response
        if (!updatedProduct) { 
            return res.status(404).json({ message: "Product not found" }); 
        } 

        // Send the updated product in the response
        res.status(200).json(updatedProduct); 
    } catch (error) { 
        // Handle any other errors that occur
        res.status(500).json({ message: error.message }); 
    } 
});

app.get('/api/product/:id', async (req, res) =>{
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message}); 
    }
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
