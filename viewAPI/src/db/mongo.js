// const { all } = require('core-js/fn/promise');

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

let uri;
console.group('**** process.env: ');
console.log('**** process.env.MONGO_USERNAME: ', process.env.MONGO_USERNAME);
console.log('**** process.env.MONGO_PASSWORD: ', process.env.MONGO_PASSWORD);
console.groupEnd();
if (!process.env.MONGO_USERNAME  || !process.env.MONGO_PASSWORD){
    uri = `mongodb://${process.env.MONGO_CONNECTION_URI || 'localhost'}/${process.env.MONGO_DB_NAME || 'test'}`;
} else {
    uri = `mongodb://${process.env.MONGO_USERNAME || "superuser"}:${process.env.MONGO_PASSWORD || "password"}@${process.env.MONGO_CONNECTION_URI || 'localhost'}/${process.env.MONGO_DB_NAME || 'test'}`;
}
console.log('**** uri: ', uri);

const client = new MongoClient(uri, { useUnifiedTopology: true });
var connection = client.connect()

// Private function to get a working client
function getClient() {
    // i.e: 'mongodb://superuser:password@localhost/test'
    // don't have to do it this way to connect locally 
    // docs @ http://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html

    
    let client = new MongoClient(uri, { useUnifiedTopology: true });
    return client;
}

module.exports = {

    // GET ALL ITEMS IN PROVIDER INTAKE
    getProviderIntakeAll: async function () {
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
            //return db
        })
        .then(async db => {
        // add our values to db
            const providerIntakes = await db.collection("ProviderIntake").find();
            return providerIntakes.toArray();
                //console.log(err)
                //console.log(doc)
        }).then(async doc =>{
            return doc
        })    
    }
};