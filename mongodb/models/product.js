const {getDB} = require('../utils/database');

class Product {
    constructor(title, description, price, imageUrl) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    saveProduct() {
        const db = getDB();
        return db.collection('products').insertOne(this);
    }
}

module.exports = Product;