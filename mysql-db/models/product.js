const Cart = require('./cart');
const database = require('../utils/database');

module.exports = class Product {
    constructor(id, title, imageUrl, desc, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.desc = desc;
        this.price = price;
    }

    saveProduct() {
        return database.execute(
            'INSERT INTO products (title, description, imageUrl, price) VALUES (?, ?, ?, ?)',
            [this.title, this.desc, this.imageUrl, this.price]
        );
    }

    static fetchAllProduct() {
        return database.execute('SELECT * FROM products');
    }

    static getProductDetail(id) {
       return database.execute('SELECT * FROM products where products.id = ?', [id]);
    }

    static deleteProduct(id) {
       
    }
}