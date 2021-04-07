const cron = require('node-cron')
const express = require('express')
const spauth = require('node-sp-auth')
const request = require('request-promise')
var {getProviderIntakeNotSP, getNeedEmployeeNotSP, getClaimNotSP, getProviderIntakeNotReporting, getNeedEmployeeNotReporting, getClaimNotReporting, updateReporting, updateSavedToSP} = require('./mongo')
var clean = require('./clean')
var listWebURL = process.env.LISTWEBURL || process.env.OPENSHIFT_NODEJS_LISTWEBURL || ""
var listUser = process.env.LISTUSER || process.env.OPENSHIFT_NODEJS_LISTUSER || ""
var listPass = process.env.LISTPASS || process.env.OPENSHIFT_NODEJS_LISTPASS || ""
var listDomain = process.env.LISTDOMAIN || process.env.OPENSHIFT_NODEJS_LISTDOMAIN || ""
var listParty = process.env.LISTPARTY || process.env.OPENSHIFT_NODEJS_LISTPARTY || ""
var listADFS = process.env.LISTADFS || process.env.OPENSHIFT_NODEJS_LISTADFS || ""

app = express();

var spr;

//TODO: finish function
//remove references to values._ca
//add proper fields for A2T
async function saveListProviderIntake(values) {
  try{
    var headers;
  return await spr
  .then(async data => {
      headers = data.headers;
      headers['Accept'] = 'application/json;odata=verbose';
      return headers
  }).then(async response => {
        //return true
        //console.log(response)
        headers = response
        return request.post({
          url: listWebURL + '/A2TTest/_api/contextInfo',
          headers: headers,
          json: true,
        })
    }).then(async response => {
      var digest = response.d.GetContextWebInformation.FormDigestValue
      return digest
    }).then(async response => {
      //console.log(headers)
      headers['X-RequestDigest'] = response
      headers['Content-Type'] = "application/json;odata=verbose"
      // change to local AccesLs to Technology list
      var l = listWebURL + `/A2TTest/_api/web/lists/getByTitle('IntakeForm')/items`
      console.log("webURL:")
      console.log(l)
      return request.post({
        url: l,
        headers: headers,
        json: true,
        body: {
          "__metadata": {
            "type": `SP.Data.IntakeFormListItem`
          },
          "Title": `${values.serviceProviderName} - ${values.applicationId}`,
          'applicationID': values.applicationId,
          'applicationToken': values._token,
          //step 1
          'serviceProviderName': values.serviceProviderName,
          'providerContractId': values.providerContractID,
          'serviceProviderPostal': values.serviceProviderPostal,
          'serviceProviderContact': values.serviceProviderContact,
          'serviceProviderPhone': values.serviceProviderPhone,
          'serviceProviderEmail': values.serviceProviderEmail,
          'fundingSource': values.fundingSource,
          'eligibleProgram': values.trainingProgram,
          'periodStart1': typeof values.periodStart1 !== "undefined" ? new Date(values.periodStart1) : null,
          'periodEnd1': typeof values.periodEnd1 !== "undefined" ? new Date(values.periodEnd1) : null,
          'workBCCaseNumber': values.workBCCaseNumber,
          'clientName': values.clientName,
          'clientAddress': values.clientAddress,
          'clientAddress2': values.clientAddress2,
          'clientCity': values.clientCity,
          'clientProvince': values.clientProvince,
          'clientPostal': values.clientPostal,
          'clientPhone': values.clientPhone,
          'clientEmail': values.clientEmail,
          'altShippingAddress': values.altShippingAddress,

          //step 1:pop-up fields
          'addressAlt':values.addressAlt,
          'cityAlt': values.cityAlt,
          'provinceAlt':values.provinceAlt,
          'postalAlt': values.postalAlt,
          //step 2
          'telusInternetForGood': values.telusInternetForGood === "yes",
          /*'clientResidesInBC': values.clientResidesInBC,
          'clientUnemployed': values.clientUnemployed,
          'registeredInApprovedProgram': values.registeredInApprovedProgram,
          'accessToComputerCurrently': values.accessToComputerCurrently,
          'receivingAlternateFunding': values.receivingAlternateFunding,
          'financialNeed': values.financialNeed,
          //step 3
          'signatoryTitle': values.signatoryTitle,
          'signatory1': values.signatory1,*/
          'clientEligibility': values.clientEligibility,
          'serviceProviderResponsibility': values.serviceProviderResponsibility,
         //' organizationConsent': values.organizationConsent,
          //"": values.,
        }
      })
    }).then(async response => {
      //item was created
      return true
    })    
    .catch(err => {
      //there was an error in the chan
      //item was not created
      console.log("error in chain")
      //console.log(err);
      console.log(err.statusCode)
      if (err.statusCode !== 403){
        console.log(err);
      }
      
      return false
    })
  
  //try catch catcher
  } catch (error) {
    console.log(error)
    return false
  }
}

cron.schedule('*/3 * * * *', async function() {
    console.log('running a task every 3 minutes');
    //console.log('running a task every 10 seconds');
    spr = spauth.getAuth(listWebURL, {
      username: listUser,
      password: listPass,
      domain: listDomain,
      relyingParty: listParty,
      adfsUrl: listADFS
  })
    
    await getProviderIntakeNotSP()
    .then(async cursor => {
        var results = await cursor.toArray()
        console.log(results.length)
        for (const data of results){
          clean(data)
          await saveListProviderIntake(data)
              .then(function(saved){
                console.log("saved")
                console.log(saved)
                // save values to mongo db
                if (saved) {
                  try {
                    updateSavedToSP("ProviderIntake",data._id);
                  }
                  catch (error) {
                    console.log(error);
                  }
                }
              })
              .catch(function(e){
                console.log("error")
                console.log(e)
              })
              
        }
    })
    /*
    await getProviderIntakeNotReporting()
    .then(async cursor => {
        var results = await cursor.toArray()
        console.log("Have employee not saved to reporting")
        console.log(results.length)
        for (const data of results){
          clean(data)
          await saveListProviderIntake(data,data.position0Email0,"Reporting")
              .then(function(saved){
                console.log("saved")
                console.log(saved)
                // save values to mongo db
                if (saved) {
                  try {
                    updateReporting("ProviderIntake",data._id);
                  }
                  catch (error) {
                    console.log(error);
                  }
                }
              })
              .catch(function(e){
                console.log("error")
                console.log(e)
              })
              
        }
    })
    */
});

app.listen(5000);