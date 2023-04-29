const fs = require('fs');
const path = require('path');
const Cart = require('./cart');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getAllProductHelper = (cb) => {
    fs.readFile(p, (err, content) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(content));
        }
    })
}

module.exports = class Product {
    constructor(id, title, imageUrl, desc, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.desc = desc;
        this.price = price;
    }

    saveProduct() {
        getAllProductHelper((products) => {
            if (this.id) {
                const productIndex = products.findIndex(product => product.id === this.id);
                products[productIndex] = this;
            } else {
                this.id = Math.random().toString();
                products.push(this);
            }
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log('err', err);
            })
        })
    }

    static fetchAllProduct(callBack) {
        getAllProductHelper(callBack);
    }

    static getProductDetail(id, callback) {
        getAllProductHelper((products) => {
            const selectedProduct = products.find(product => product.id === id);
            callback(selectedProduct);
        });
    }

    static deleteProduct(id, price, callBack) {
        getAllProductHelper((products) => {
            const updatedProducts = products.filter(product => product.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProductFromCart(id, price);
                    callBack();
                }
            })
        })
    }
}