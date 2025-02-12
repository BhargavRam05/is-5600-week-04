const fs = require('fs').promises
const { get } = require('express/lib/response');
const path = require('path')
const { title } = require('process')

const productsFile = path.join(__dirname, 'data/full-products.json')

async function list (options = {}) {

    const { offset = 0, limit = 25, tag } = options;

    const data = await fs.readFile(productsFile)

    return JSON.parse(data)
    .filter(product => {
        if(!tag) {
            return product
        }
        return product.tags.find(( {title} ) => title == tag)
    })
    .slice(offset, offset + limit)
}

async function getProduct(id) {
    const products = JSON.parse(await fs.readFile(productsFile))
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            return products[i]
        }
    }
    return null;
}
const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        const productIndex = products.findIndex((product) => product.id === id);
        if (productIndex !== -1) {
            console.log(`Product with ID ${id} deleted.`);
            resolve();
        }else {
            reject(new Error(`Product with ID ${id} not found.`));
        }
    });
};
const products = [
    { id: '1', name: 'Product A', price: 10 },
    { id: '2', name: 'Product B', price: 20 },
    { id: '3', name: 'Product C', price: 30 }
  ];
const updateProduct = (id, updatedProduct) => {
    return new Promise((resolve, reject) => {
        const productIndex = products.findIndex((product) => product.id === id);
        if (productIndex !== -1) {
            console.log(`Product with ID ${id} updated with new details:`, updatedProduct);
            resolve();
        }else {
            reject(new Error(`Product with ID ${id} not found.`));
        }
    });
};
module.exports = {
    list,
    get,
    deleteProduct,
    updateProduct
}