const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);



// const mongoDB = require('mongodb');
// const { getDB } = require('../utils/database');

// class Product {
//     constructor(title, description, price, imageUrl, id, userId) {
//         this.title = title;
//         this.description = description;
//         this.price = price;
//         this.imageUrl = imageUrl;
//         this._id = id;
//         this.userId = userId;
//     }

//     saveProduct() {
//         const db = getDB();
//         if (this._id) {
//             return db.collection('products').updateOne(
//                 { _id: new mongoDB.ObjectId(this._id) }, 
//                 { $set: this }
//             );
//         }
//         return db.collection('products').insertOne(this);
//     }

//     static fetchAll() {
//         const db = getDB();
//         return db.collection('products').find().toArray();
//     }

//     static fetchById(prodId) {
//         const db = getDB();
//         return db.collection('products').find(
//             { _id: new mongoDB.ObjectId(prodId) }
//         ).next();
//     }

//     static delete(prodId) {
//         const db = getDB();
//         return db.collection('products').deleteOne({
//             _id: new mongoDB.ObjectId(prodId)
//         })
//     }
// }

// module.exports = Product;