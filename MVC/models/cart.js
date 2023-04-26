const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart {

    static addProduct(id, price) {
        // Fetch the previous cart data
        fs.readFile(p, (err, fileContent) => {
            let cartData = { products: [], totalPrice: 0 };
            if (!err) {
                cartData = JSON.parse(fileContent);
            }
            // Analyze the cart + Find existing product
            const existingProductIndex = cartData.products.findIndex(product => product.id === id);
            const existingProduct = cartData.products[existingProductIndex];
            let updatedProduct;
            // Add new product/increase quantity
            if (existingProduct) {
                // updatedProduct = existingProduct;
                // updatedProduct.qty += 1;
                // cartData.products = [...cartData.products];
                // cartData.products[existingProductIndex] = updatedProduct;
                existingProduct.qty += 1;
                cartData.products[existingProductIndex] = existingProduct;
            } else {
                updatedProduct = { id, qty: 1 };
                cartData.products = [...cartData.products, updatedProduct];
            }
            cartData.totalPrice += +price;
            fs.writeFile(p, JSON.stringify(cartData), err => {
                console.log('cart write err', err)
            });
        })
    }
}