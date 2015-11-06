var MongoClient = require('mongodb').MongoClient;

var _db;
var URL_STRING = "mongodb://localhost:27017/transcritor";

module.exports = {

    connectToServer: function( callback ) {

        console.log("Connecting to database...")

        MongoClient.connect(URL_STRING , {
            auto_reconnect:true
        }, function( err, db ) {
            _db = db;
            console.log("Connected to MongoDB on " + URL_STRING );
            if (typeof arguments[0] === 'function')
                callback();
        } );
    },

    getDb: function() {
        return _db;
    }
};
