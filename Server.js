const express = require('express');

const app = express();

const mongoose = require('mongoose');

mongoose.connect(
    mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) console.log(err);
        app.listen(3000);
    }
);

// with mongodb lib
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;
// you can replace test with any database name that you want
const mongoConnect = (cb) => {
  MongoClient.connect('mongodb://127.0.0.1:27017/movies')
    .then((client) => {
      _db = client.db();
      cb()
      console.log('Connected to MongoDb');
    }).catch((err) => {
      console.log(err);
    });
}
//after your server started you can use getDb to access mongo Database
const getDb = () => {
  if (_db) return _db;
  throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;


app.listen(4000, () => {
    console.log('Server is running')
  })
  