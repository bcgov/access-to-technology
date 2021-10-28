
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
    /******************************/
    /* GET FUNCTIONS BEING CALLED */
    /******************************/
    // GET ALL ITEMS IN PROVIDER INTAKE WHERE SAVEDTOSP = FALSE
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
    // GET ALL ITEMS IN PROVIDER INTAKE TABLE WHERE PROCESSTIME = FALSE
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
    // GET ALL ITEMS IN PROVIDER INTAKE WHERE COURSE COMPLETION UPDATE NEEDED AKA UPDATE SHAREPOINT WITH ANSWERS
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
    // GET ALL ITEMS IN PROVIDER INTAKE ONE MONTH SURVEY SENT DOES NOT EXISTS
   getClientTrainingOneMonth: async function () {
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
            //return db
        })
        .then(async db => {
        // add our values to db (they are always new)
            return db.collection("ProviderIntake").find({oneMonthSurveysSent:{$exists:false}})
            //console.log(err)
            //console.log(doc)
        }).then(async doc =>{
            return doc
        })    
    },
    // GET ALL ITEMS IN PROVIDER INTAKE WHERE ONEMONTHSURVEYSENT = TRUE AND CLIENT SURVEY COMPLETED = FALSE
    getClientSurveyReminders: async function () {
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
            //return db
        })
        .then(async db => {
        // add our values to db (they are always new)
            return db.collection("ProviderIntake").find({oneMonthSurveysSent:true, clientSurveyCompleted:false})
            //console.log(err)
            //console.log(doc)
        }).then(async doc =>{
            return doc
        })    
    },
    // GET ALL ITEMS IN PROVIDER INTAKE THREE MONTH SURVEY SENT DOES NOT EXISTS
    getClientTrainingThreeMonth: async function () {
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
            //return db
        })
        .then(async db => {
        // add our values to db (they are always new)
            return db.collection("ProviderIntake").find({threeMonthSurveySent:{$exists:false}})
            //console.log(err)
            //console.log(doc)
        }).then(async doc =>{
            return doc
        })    
    },
    // GET ALL ITEMS IN PROVIDER INTAKE WHERE EMPLOYMENT UPDATE NEEDED AKA UPDATE SHAREPOINT WITH ANSWERS
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
    // GET ALL ITEMS IN CLIENT SURVEY TABLE WHERE SAVEDTOSP = FALSE
    getClientSurveyNotSP: async function () {
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
            //return db
        })
        .then(async db => {
        // add our values to db (they are always new)
            return db.collection("ClientSurvey").find({savedToSP: false})
                //console.log(err)
                //console.log(doc)
        }).then(async doc =>{
            return doc
        })    
    },
    // GET ALL ITEMS IN SERVICE PROVIDER TABLE WHERE SAVEDTOSP = FALSE
    getProviderSurveyNotSP: async function () {
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
            //return db
        })
        .then(async db => {
        // add our values to db (they are always new)
            return db.collection("ServiceProvider").find({savedToSP: false})
                //console.log(err)
                //console.log(doc)
        }).then(async doc =>{
            return doc
        })    
    },
    // GET ALL ITEMS IN SERVICE PROVIDER TABLE WHERE COMPLETED = FALSE
    getProviderSurvey: async function () {
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
            //return db
        })
        .then(async db => {
        // add our values to db (they are always new)
            return db.collection("ServiceProvider").find({completed: false})
                //console.log(err)
                //console.log(doc)
        }).then(async doc =>{
            return doc
        })    
    },

    /*********************************/
    /* UPDATE FUNCTIONS BEING CALLED */
    /*********************************/
    // UPDATE ONEMONTHSURVEYSENT TO TRUE AND INITIALIZE REMINDERS TO FALSE, AND SURVEY COMPLETION TO FALSE (PROVIDER INTAKE)
    updateOneMonthSurveysSent: async function(collection,_id){
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
                        oneMonthSurveysSent: true,
                        clientSurveyCompleted: false,
                        twoWeekReminderSent:false,
                        fourWeekReminderSent:false,
                    }
                },
                {
                    upsert: false
                }

            )
        }).then(result =>{
            return result
        })     
    },
    // UPDATE TWOWEEKREMINDERSENT TO TRUE (PROVIDER INTAKE)
    updateTwoWeekReminderSent:  async function(collection,_id){
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
                     twoWeekReminderSent: true,
                    }
                },
                {
                    upsert: false
                }

            )
        }).then(result =>{
            return result
        })     
    },
    // UPDATE FOURWEEKREMINDERSENT TO TRUE (PROVIDER INTAKE)
    updateFourWeekReminderSent: async function(collection,_id){
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
                     fourWeekReminderSent: true,
                    }
                },
                {
                    upsert: false
                }

            )
        }).then(result =>{
            return result
        })     
    },
    // UPDATE THREEMONTHSURVEYSENT TO TRUE (PROVIDER INTAKE)
    updateThreeMonthSurveySent: async function(collection,_id){
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
                     threeMonthSurveySent: true,
                    }
                },
                {
                    upsert: false
                }

            )
        }).then(result =>{
            return result
        })     
    },
    // UPDATE CLIENT SURVEY COMPLETED. TO DISABLE CLIENTS ENTERING SURVEY AFTER END DATE
    updateSurveyPeriodOver: async function(collection,_id){
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
                     clientSurveyCompleted: true,
                    }
                },
                {
                    upsert: false
                }

            )
        }).then(result =>{
            return result
        })     
    },
    // UPDATE SAVED TO SP AND THE SPID RETURN TO COLLECTION AND ID PROVIDED (PROVIDERINTAKE)
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
    // UPDATE SAVED TO SP TO TRUE FOR COLLECTION AND ID PROVIDED (USED FOR ALL TABLES)
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
    // UPDATE COURSECOMPLETIONUPDATE NEEDED TO FALSE (PROVIDERINTAKE COLLECTION)
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
    // UPDATE EMPLOYMENTUPDATENEEDED TO FALSE (PROVIDERINTAKE COLLECTION)
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
    // UPDATE THE PROCESS TIME IN DB FOR GIVEN ID TO TRUE (PROVIDERINTAKE COLLECTION)
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

    /***********************************************/
    /* DUPLICATION CHECKING FUNCTIONS BEING CALLED */
    /***********************************************/
    // CHECK IF WORKBC NUMBER ALREADY EXISTS IN ENTRIES
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
    // GET THE PERCENTAGE OF MATCHES ON OUR DUPLICATION CHECKING FIELDS
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