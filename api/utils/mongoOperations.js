
const MongoClient = require('mongodb').MongoClient;
const Binary = require('mongodb').Binary;
var fs = require('fs');
const strings = require("./strings");

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
    /*
    let uri;
    if (!process.env.MONGO_USERNAME  || !process.env.MONGO_PASSWORD){
        uri = `mongodb://${process.env.MONGO_CONNECTION_URI || 'localhost'}/${process.env.MONGO_DB_NAME || 'test'}`;
    } else {
        uri = `mongodb://${process.env.MONGO_USERNAME || "superuser"}:${process.env.MONGO_PASSWORD || "password"}@${process.env.MONGO_CONNECTION_URI || 'localhost'}/${process.env.MONGO_DB_NAME || 'test'}`;
    }
    */

    
    let client = new MongoClient(uri, { useUnifiedTopology: true });
    return client;
}

function myTrim(x) {
    if(x !== undefined){
        let str =  x.replace(/^\s+|\s+$/gm,'');
        return str.replace(/\s+/g, ' ');
    } else{
        return x;
    }
}

module.exports = {

    saveConsentValues: async function (values) {
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
        }).then(async db => {
            // add our values to db (they are always new)
            return db.collection("ProviderIntake").insertOne(
                {
                    applicationId: values._id,
                    _token: values._token,
                    serviceProviderName: values.serviceProviderName,
                    fundingSource: values.fundingSource,
                    serviceProviderEmail: values.serviceProviderEmail,
                    clientEmail: values.clientEmail,
                })
        });
    },
    //Deprecated participant values get saved at provider form
    saveParticipantValues: async function (values) {
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
        }).then(async db => {
            // add our values to db (they are always new)
            return db.collection("ProviderIntake").updateOne(
                {
                    applicationId: values._id,
                    _token: values._token,
                    serviceProviderName: values.serviceProviderName,
                    fundingSource: values.fundingSource,
                    serviceProviderEmail: values.serviceProviderEmail,
                    clientEmail: values.clientEmail,
                },
                { 
                    $set : {
                        clientName: values.clientName,
                        clientLastName: values.clientLastName,
                        clientSignature: values.clientSignature,
                        clientConsent: true,
                        clientConsentDate: values.clientConsentDate,
                    }
                },
                {
                    upsert: false
                }

            )
                 
        });
    },

    getParticipantValues: async function (values) {
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
        }).then(async db => {
            // get our values from db 
            return db.collection("ProviderIntake").find({applicationId: values.id, _token: values.token}).toArray();
        });
    },

    saveCourseCompletionSurvey: async function (values) {
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
        }).then(async db => {
            // add our values to db (they are always new)
            return db.collection("ProviderIntake").updateOne(
                {
                    applicationId: values._id,
                    _token: values._token,
                },
                { 
                    $set : {
                        completedTraining: values.completedTraining,
                        minimallyCompleted: values.minimallyCompleted,
                        courseCompletionUpdateNeeded:true,
                    }
                },
                {
                    upsert: false
                }

            )
                 
        });
    },

    saveEmploymentSurvey: async function (values) {
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
        }).then(async db => {
            // add our values to db (they are always new)
            return db.collection("ProviderIntake").updateOne(
                {
                    applicationId: values._id,
                    _token: values._token,
                },
                { 
                    $set : {
                        employmentFound: values.employmentFound,
                        employmentStatus: values.employmentStatus,
                        employmentUpdateNeeded:true,
                    }
                },
                {
                    upsert: false
                }

            )
                 
        });
    },
    
    updateParticipantSurveyCompleted: async function(values){
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
        }).then(async db => {
            // add our values to db (they are always new)
            console.log(values);
            return db.collection("ProviderIntake").updateOne(
                {
                    applicationId: values._id,
                    _token: values._token,
                },
                { 
                    $set : {
                       clientSurveyCompleted:true,
                    }
                },
                {
                    upsert: false
                });
                 
        });
    },

    saveParticipantSurveyValues: async function (values) {
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
        }).then(async db => {
            // add our values to db (they are always new)
            return db.collection("ClientSurvey").insertOne(
                {
                    applicationId: values._id,
                    laptopWasNeeded: values.laptopWasNeeded,
                    technicalSupportSatisfaction: values.technicalSupportSatisfaction,
                    hoursPerWeek: values.hoursPerWeek,
                    postTrainingPlans: values.postTrainingPlans,
                    feedBackAndExperienceComments: values.feedBackAndExperienceComments,
                    certificateProgram: values.certificateProgram,
                    savedToSP:false,
                })
        })
    },

    saveProviderIntakeValues: async function (values) {
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
        }).then(async db => {
            // add our values to db (they are always new)
            if(values.inDB){
                return db.collection("ProviderIntake").updateOne(
                    {
                        applicationId: values._id,  // id is provided
                        _token: values._token,
                    },
                    { 
                        $set : {
                            savedToSP: false,
                            savedConsent: true,
                            applicationId: values._id,  // id is provided
                            _token: values._token,
                            //step 1
                            // create new field Array of comparator values
                            serviceProviderContact: myTrim(values.serviceProviderContact),
                            serviceProviderPostal: myTrim(values.serviceProviderPostal),
                            serviceProviderPhone: myTrim(values.serviceProviderPhone),
                            serviceProviderEmail: myTrim(values.serviceProviderEmail),
                            trainingProgram: values.trainingProgram,
                            periodStart1: values.periodStart1,
                            periodEnd1: values.periodEnd1,
                            BCEAorFederalOnReserve: values.BCEAorFederalOnReserve,
                            //step 2
                            workBCCaseNumber: values.workBCCaseNumber,
                            clientName: myTrim(values.clientName),
                            clientLastName: myTrim(values.clientLastName),
                            clientMiddleName: myTrim(values.clientMiddleName),
                            clientAddress: myTrim(values.clientAddress),
                            clientAddress2:myTrim(values.clientAddress2),
                            clientCity: myTrim(values.clientCity),
                            clientProvince:values.clientProvince,
                            clientPostal: values.clientPostal,
                            clientPhone: values.clientPhone,
                            clientEmail: myTrim(values.clientEmail),
                            altShippingAddress: values.altShippingAddress,

                            //step 2:pop-up fields
                            recipientName: values.recipientName,
                            //step 3
                            clientEligibility: values.clientEligibility,
                            serviceProviderResponsibility: values.serviceProviderResponsibility,
                            ProcessTime:false,
                            compareField:[values.clientName.toLowerCase() +" "+values.clientLastName.toLowerCase(), values.clientAddress.toLowerCase(), values.clientEmail.toLowerCase(), values.clientPhone],         
                    
                    }
                },
                {
                    upsert: false
                });
            }
            else{
                return db.collection("ProviderIntake").insertOne({
                    savedToSP: false,
                    savedConsent: false,
                    applicationId: values._id,  // id is provided
                    _token: values._token,
                    //step 1
                    // create new field Array of comparator values
                    serviceProviderName: myTrim(values.serviceProviderName),
                    serviceProviderContact: myTrim(values.serviceProviderContact),
                    serviceProviderPostal: myTrim(values.serviceProviderPostal),
                    serviceProviderPhone: myTrim(values.serviceProviderPhone),
                    serviceProviderEmail: myTrim(values.serviceProviderEmail),
                    fundingSource: values.fundingSource,
                    trainingProgram: values.trainingProgram,
                    periodStart1: values.periodStart1,
                    periodEnd1: values.periodEnd1,
                    BCEAorFederalOnReserve: values.BCEAorFederalOnReserve,
                    workBCCaseNumber: values.workBCCaseNumber,
                    clientName: myTrim(values.clientName),
                    clientLastName: myTrim(values.clientLastName),
                    clientMiddleName: myTrim(values.clientMiddleName),
                    clientAddress: myTrim(values.clientAddress),
                    clientAddress2:myTrim(values.clientAddress2),
                    clientCity: myTrim(values.clientCity),
                    clientProvince:values.clientProvince,
                    clientSignature:"",
                    clientPostal: values.clientPostal,
                    clientPhone: values.clientPhone,
                    clientEmail: myTrim(values.clientEmail),
                    altShippingAddress: values.altShippingAddress,

                    //step 1:pop-up fields
                    recipientName: values.recipientName,
    
                    //step 3
                    clientEligibility: values.clientEligibility,
                    serviceProviderResponsibility: values.serviceProviderResponsibility,
                    clientConsent: false,
                    clientConsentDate: new Date(),
                    ProcessTime:false,
                    compareField:[values.clientName.toLowerCase() +" "+values.clientLastName.toLowerCase(), values.clientAddress.toLowerCase(), values.clientEmail.toLowerCase(), values.clientPhone],         
                    
                });
            }
        });
    },
    printValues: function(collection) {
        const client = getClient();
        client.connect().then(mc => {
            const db = mc.db("test");
            let cursor = db.collection(collection).find({});

            const iterateFunc = doc => console.log(JSON.stringify(doc, null, 4));
            const errorFunc = error => console.log(error);
            
            cursor.forEach(iterateFunc, errorFunc);
        });
    }
};