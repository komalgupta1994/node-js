const products = [];
const fs = require('fs');
const path = require('path');

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    saveProduct() {
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
        fs.readFile(p, (err, content) => {
            let products = [];
            if (!err) {
                products = JSON.parse(content);
            }
            products.push(this);
            console.log('products', products);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log('err', err);
            })
        })
    }

    static fetchAllProduct() {
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
        fs.readFile(p, (err, content) => {
            if (err) {
                return [];
            } else {
                return JSON.parse(content);
            }
        })
    }
}