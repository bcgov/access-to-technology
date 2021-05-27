
const MongoClient = require('mongodb').MongoClient;
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



module.exports = {
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
                    _token: values._token
                },
                { 
                    $set : {
                        clientSignature: values.clientSignature,
                        clientConsent: true,
                        clientConsentDate: values.clientConsentDate,
                        savedToSP:false,
                    }
                },
                {
                    upsert: false
                }

            )
                 
        });
    },
    saveProviderIntakeValues: async function (values, savedToSP) {
        return await connection
        .then(mClient => {
            // get a handle on the db
            return mClient.db();
        }).then(async db => {
            // add our values to db (they are always new)
            return db.collection("ProviderIntake").insertOne({
                savedToSP: false,
                applicationId: values._id,  // id is provided
                _token: values._token,
                 //step 1
                 // create new field Array of comparator values
                serviceProviderName: values.serviceProviderName,
                providerContractID: values.providerContractId,
                serviceProviderContact: values.serviceProviderContact,
                serviceProviderPostal: values.serviceProviderPostal,
                serviceProviderPhone: values.serviceProviderPhone,
                serviceProviderEmail: values.serviceProviderEmail,
                fundingSource: values.fundingSource,
                trainingProgram: values.trainingProgram,
                periodStart1: values.periodStart1,
                periodEnd1: values.periodEnd1,
                unemployed: values.unemployed,
                BCEAorFederalOnReserve: values.BCEAorFederalOnReserve,
                workBCCaseNumber: values.workBCCaseNumber,
                clientName: values.clientName,
                clientLastName: values.clientLastName,
                clientMiddleName: values.clientMiddleName,
                clientAddress: values.clientAddress,
                clientAddress2:values.clientAddress2,
                clientCity: values.clientCity,
                clientProvince:values.clientProvince,
                clientPostal: values.clientPostal,
                clientPhone: values.clientPhone,
                clientEmail: values.clientEmail,
                altShippingAddress: values.altShippingAddress,

                //step 1:pop-up fields
                addressAlt: values.addressAlt,
                addressAlt2: values.addressAlt2,
                cityAlt: values.cityAlt,
                provinceAlt: values.provinceAlt,
                postalAlt: values.postalAlt,
               
                //step 2
                /*
                clientResidesInBC: values.clientResidesInBC,
                clientUnemployed: values.clientUnemployed,
                registeredInApprovedProgram:values.registeredInApprovedProgram,
                accessToComputerCurrently: values.accessToComputerCurrently,
                receivingAlternateFunding: values.receivingAlternateFunding,
                financialNeed: values.financialNeed,*/
                //step 3
                clientEligibility: values.clientEligibility,
                serviceProviderResponsibility: values.serviceProviderResponsibility,
                clientConsent:false,
                
                
            });
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