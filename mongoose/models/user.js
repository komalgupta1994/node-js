const { getDB } = require('../utils/database');
const mongoDB = require('mongodb');

class User {
    constructor(name, email, cart, userId) {
        this.name = name;
        this.email = email;
        this.cart = cart;
        this._id = userId;
    }

    save() {
        const db = getDB();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        if (!this.cart) {
            this.cart = {items: []};
        }
        const cartIndex = this.cart.items.findIndex(item => item.productId.toString() == product._id.toString());
        let newQuantity = 1;
        if (cartIndex > -1) {
            newQuantity = this.cart.items[cartIndex].quantity + 1;
            this.cart.items[cartIndex].quantity = newQuantity;
        } else {
          const item = {productId: new mongoDB.ObjectId(product._id), quantity: newQuantity};
          this.cart.items.push(item);
        }
        const db = getDB();
        return db.collection('users').updateOne({
            _id: new mongoDB.ObjectId(this._id)
        }, {
            $set: { cart: this.cart }
        })
    }

    getCart() {
        const db = getDB();
        const productIds = this.cart.items.map(item => item.productId);
        return db.collection('products').find({_id: {
            $in: productIds
        }}).toArray()
        .then(products => {
            return products.map(product => {
                const quantity = this.cart.items.find(item => item.productId.toString() === product._id.toString()).quantity;
                return {...product, quantity};
            })
        })
    }

    deleteCart(productId) {
        const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId.toString());
        const db = getDB();
        return db.collection('users').updateOne({
            _id: new mongoDB.ObjectId(this._id)
        }, {
            $set: {cart: {items: updatedCartItems}}
        })
    }

    addOrder() {
        const db = getDB();
        return this.getCart().then(products => {
            const order = {
                items: products,
                user: {
                    _id: new mongoDB.ObjectId(this._id),
                    name: this.name
                }
            }
            return db.collection('orders').insertOne(order)
            .then(() => {
                this.cart = {items: []};
                return db.collection('users').updateOne({
                    _id: new mongoDB.ObjectId(this._id)
                }, {
                    $set: {cart: this.cart}
                })
            })
        })  
    }

    getOrder() {
        const db = getDB();
        return db.collection('orders').find({'user._id': this._id}).toArray();
    }

    static findById(id) {
        const db = getDB();
        return db.collection('users').findOne({_id: new mongoDB.ObjectId(id)});
    }
}

module.exports = User;