const express = require('express')
const api = require('./api')
const middleware = require('./middleware')
const bodyParser = require('body-parser')

// Set the port
const port = process.env.PORT || 3000
// Boot the app
const app = express()
// Register the public directory
app.use(express.static(__dirname + '/public'));
// register the routes
app.use(middleware.cors)
app.use(middleware.cors)
app.use(bodyParser.json())
app.get('/products', api.listProducts)
app.get('/', api.handleRoot);
app.get('/products/:id', api.getProduct)
app.post('/products', api.createProduct)
app.use(middleware.handleError)
app.use(middleware.notFound)
app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    products.deleteProduct(productId)
    .then(() => {
        res.status(202).send(`Product with ID ${productId} marked for deletion.`);
    })
    
    .catch((error) => {
        res.status(500).send('Error deleting product');
    });
});
app.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
    products.updateProduct(productId, updatedProduct)
    .then(() => {
        res.status(200).send(`Product with ID ${productId} updated successfully.`);
    })
    .catch((error) => {
        res.status(500).send('Error updating product');
    });
  
});
// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`))

