const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb+srv://komal_user:Kamli%4012345@cluster0.ozqm2qq.mongodb.net/shop?retryWrites=true&w=majority'
    )
    .then((result) => {
        console.log('connected to mongoDB');
        _db = result.db();
        callback();
    })
    .catch(err => {
        console.log('error while connecting DB', err);
        throw err;
    });
}

const getDB = function() {
    if (_db) {
        return _db;
    }
    return 'No Database found!';
}

module.exports = {
    mongoConnect,
    getDB
};