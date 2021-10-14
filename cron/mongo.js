
const MongoClient = require('mongodb').MongoClient;

let uri;
if (!process.env.MONGO_USERNAME  || !process.env.MONGO_PASSWORD){
    uri = `mongodb://${process.env.MONGO_CONNECTION_URI || 'localhost'}/${process.env.MONGO_DB_NAME || 'test'}`;
} else {
    uri = `mongodb://${process.env.MONGO_USERNAME || "superuser"}:${process.env.MONGO_PASSWORD || "password"}@${process.env.MONGO_CONNECTION_URI || 'localhost'}/${process.env.MONGO_DB_NAME || 'test'}`;
}

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
    /*
    getClient: async function (values) {
        const client = getClient();
        return await client.connect()
    },
    */
    getProviderIntakeNotSP: async function () {
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
            //return db
        })
        .then(async db => {
        // add our values to db (they are always new)
            return db.collection("ProviderIntake").find({savedToSP: false})
                //console.log(err)
                //console.log(doc)
        }).then(async doc =>{
            return doc
        })    
    },

    getIncomingProcessTimeNotTrue: async function () {
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
            //return db
        })
        .then(async db => {
        // add our values to db (they are always new)
            return db.collection("ProviderIntake").find({ProcessTime: false})
                //console.log(err)
                //console.log(doc)
        }).then(async doc =>{
            return doc
        })    
    },

    getCourseCompletionUpdateNeeded: async function () {
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
            //return db
        })
        .then(async db => {
        // add our values to db (they are always new)
            return db.collection("ProviderIntake").find({courseCompletionUpdateNeeded: true})
            //console.log(err)
            //console.log(doc)
        }).then(async doc =>{
            return doc
        })    
    },
  
    updateSaveIdToSP: async function(collection,_id, appID){
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
            //return db
        })
        .then(async db => {
        // add our values to db (they are always new)
            return db.collection(collection).updateOne(
                {
                    _id: _id
                },
                { 
                    $set : {
                    savedToSP: true,
                    SPID: appID

                    }
                },
                {
                    upsert: false
                }

            )
                //console.log(err)
                //console.log(doc)
        }).then(result =>{
            return result
        })     
    },

    updateSavedToSP: async function(collection,_id){
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
            //return db
        })
        .then(async db => {
        // add our values to db (they are always new)
            return db.collection(collection).updateOne(
                {
                    _id: _id
                },
                { 
                    $set : {
                    savedToSP: true

                    }
                },
                {
                    upsert: false
                }

            )
                //console.log(err)
                //console.log(doc)
        }).then(result =>{
            return result
        })     
    },
    
    updateCourseCompletionUpdateToFalse: async function(collection,_id){
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
            //return db
        })
        .then(async db => {
        // add our values to db (they are always new)
            return db.collection(collection).updateOne(
                {
                    _id: _id
                },
                { 
                    $set : {
                    courseCompletionUpdateNeeded: false

                    }
                },
                {
                    upsert: false
                }

            )
                //console.log(err)
                //console.log(doc)
        }).then(result =>{
            return result
        })     
    },
    
    getEmploymentUpdateNeeded: async function () {
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
            //return db
        })
        .then(async db => {
        // add our values to db (they are always new)
            return db.collection("ProviderIntake").find({employmentUpdateNeeded: true})
            //console.log(err)
            //console.log(doc)
        }).then(async doc =>{
            return doc
        })    
    },

    updateEmploymentUpdateToFalse: async function(collection,_id){
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
            //return db
        })
        .then(async db => {
        // add our values to db (they are always new)
            return db.collection(collection).updateOne(
                {
                    _id: _id
                },
                { 
                    $set : {
                    employmentUpdateNeeded: false

                    }
                },
                {
                    upsert: false
                }

            )
                //console.log(err)
                //console.log(doc)
        }).then(result =>{
            return result
        })     
    },

    updateProcessTimeToTrue: async function(collection,_id){
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
            //return db
        })
        .then(async db => {
        // add our values to db (they are always new)
            return db.collection(collection).updateOne(
                {
                    _id: _id
                },
                { 
                    $set : {
                    ProcessTime: true

                    }
                },
                {
                    upsert: false
                }

            )
                //console.log(err)
                //console.log(doc)
        }).then(result =>{
            return result
        })     
    },

    WorkBCCheck:async function (comparatorField) {
        if(comparatorField != null){
            return await connection
            .then(mClient => {
                // get a handle on the db
                return mClient.db();
                //return db
            })
            .then(async db => {
                // get our values from db 
                return await db.collection("ProviderIntake").aggregate([
                    {$match: {workBCCaseNumber:comparatorField}},
                    {$group: {_id: "$applicationId" }}]).toArray()
                }).then(async doc =>{
                    if(doc.length > 1){
                        return true
                    }else{
                        return false
                    }
                   
                })    
        }else{
            return false;
        }
    },
    
    duplicateCheck: async function (comparatorField) {
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
            //return db
        })
        .then(async db => {
        // get our values from db 
        return await db.collection("ProviderIntake").aggregate([
            {$unwind: "$compareField"},
            {$match: {compareField:{ $in:comparatorField}}},
            {$group: {_id: "$applicationId", number: {$sum: 1}}},
            {$project: {_id: 1, number: 1, percentage: {$divide: ["$number", comparatorField.length]}}},
            {$sort: {percentage: -1}}]).toArray(); 
        }).then(async doc =>{
            return doc
        })    
    }, 
    
   
    
    

    /*
    printValues: function(collection) {
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        connection.then(mc => {
            const db = mc.db("test");
            let cursor = db.collection(collection).find({});

            const iterateFunc = doc => console.log(JSON.stringify(doc, null, 4));
            const errorFunc = error => console.log(error);
            
            cursor.forEach(iterateFunc, errorFunc);
        });
    }
    */
};