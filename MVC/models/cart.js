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

    static deleteProductFromCart(id, price) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const cartData = JSON.parse(fileContent);
            const productIndex = cartData.products.findIndex(product => product.id === id);
            if (productIndex > -1) {
                cartData.totalPrice -= (cartData.products[productIndex].qty * price);
                cartData.products = cartData.products.filter(product => product.id !== id);
                fs.writeFile(p, JSON.stringify(cartData), err => {
                    console.log('delete data from cart', err);
                })
            } else {
                return;
            }
        })
    }

    static getCartProducts(callback) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return callback(null);
            }
            const cartData = JSON.parse(fileContent);
            callback(cartData);
        })
    }
}