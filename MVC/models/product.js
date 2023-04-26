const fs = require('fs');
const path = require('path');
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
    constructor(title, imageUrl, desc, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.desc = desc;
        this.price = price;
    }

    saveProduct() {
        this.id = Math.random().toString();
        getAllProductHelper((products) => {
            products.push(this);
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
}