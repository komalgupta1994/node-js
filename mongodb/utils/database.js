const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb+srv://komal_user:Kamli%4012345@cluster0.ozqm2qq.mongodb.net/?retryWrites=true&w=majority'
    )
    .then((result) => {
        console.log('connected to mongoDB');
        callback(result);
    })
    .catch(err => console.log('error while connecting DB', err));
}

module.exports = mongoConnect;