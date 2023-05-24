const mongoDB = require('mongodb');
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

    static fetchAll() {
        const db = getDB();
        return db.collection('products').find().toArray();
    }

    static fetchById(prodId) {
        const db = getDB();
        return db.collection('products').find(
            {_id: new mongoDB.ObjectId(prodId)}
        ).next();
    }
}

module.exports = Product;