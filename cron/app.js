const cron = require('node-cron')
const express = require('express')
const spauth = require('node-sp-auth')
const request = require('request-promise')

var {getProviderIntakeNotSP, getIncomingProcessTimeNotTrue, updateSaveIdToSP, WorkBCCheck, duplicateCheck, updateSavedToSP, updateProcessTimeToTrue} = require('./mongo')
var clean = require('./clean')
var listWebURL = process.env.LISTWEBURL || process.env.OPENSHIFT_NODEJS_LISTWEBURL || ""
var listUser = process.env.LISTUSER || process.env.OPENSHIFT_NODEJS_LISTUSER || ""
var listPass = process.env.LISTPASS || process.env.OPENSHIFT_NODEJS_LISTPASS || ""
var listDomain = process.env.LISTDOMAIN || process.env.OPENSHIFT_NODEJS_LISTDOMAIN || ""
var listParty = process.env.LISTPARTY || process.env.OPENSHIFT_NODEJS_LISTPARTY || ""
var listADFS = process.env.LISTADFS || process.env.OPENSHIFT_NODEJS_LISTADFS || ""
var linkUrl = process.env.CLIENTURL || process.env.OPENSHIFT_NODEJS_CLIENTURL || ""
var nodemailer = require("nodemailer")
const { urlencoded } = require('express')

app = express();

var spr;
async function sendEmail(values, Sub) {
  try {
    let transporter = nodemailer.createTransport({
      host: "apps.smtp.gov.bc.ca",
      port: 25,
      secure: false,
      tls: {
        rejectUnauthorized: false
      } // true for 465, false for other ports
    });
    return await transporter.verify()
      .then(function (r) {
        //console.log(r)
        console.log("Transporter connected.")
        // send mail with defined transport object  
        let message2 = {
          from: 'Access to Technology <donotreply@gov.bc.ca>', // sender address
          to: 'whitney.dluhosh@gov.bc.ca',
          bcc: 'ELMSD.Webmaster@gov.bc.ca',
          subject: `${Sub} - Application: ${values.applicationId}`, // Subject line
          html: 
          `<b>APPLICATION INFORMATION</b><br/>`+
              `<b>Service Provider:</b> ${values.serviceProviderName}<br/>`+
              `<b>Staff Name:</b> ${values.serviceProviderContact}<br/>`+
              `<b>Contact Email Address:</b> ${values.serviceProviderEmail}<br/>`+
              `<b>Contact Phone Number:</b> ${values.serviceProviderPhone}<br/>`+
              `<b>Application ID:</b> ${values.applicationId}<br/>`+
              `<b>Application token:</b> ${values._token}<br/>`
            
          // html body
        };      
       transporter.sendMail(message2, (error, info) => {
          if (error) {
            console.log("error:", error);
            console.log("Error sending list notification for " + values._id)
          } else {
            console.log("Message sent: %s", info.messageId);
          }
        });
        return true
      }).catch(function (e) {
        console.log(e)
        console.log("Error connecting to transporter")
        return false
      })
  } catch (error) {
    console.log(error)
    return false
  }
}

//add proper fields for A2T
async function saveListProviderIntake(values) {
  // call function in here before saving
  try{
    var headers;
    var duplicates = 4;
    var duplicateChecks;
    var WorkBCDuplicate = false;
    var DuplicateString = "";
    var data = {
                  '__metadata': { 'type': 'SP.FieldUrlValue' },
                  'Description': '',
                  'Url': ''
  };
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
          url: listWebURL + '/AccessToTechnology/_api/contextInfo',
          headers: headers,
          json: true,
        })
    }).then(async response => {
      WorkBCDuplicate = await WorkBCCheck(values.workBCCaseNumber)
      duplicateChecks = await duplicateCheck(values.compareField);
      
      if(duplicateChecks.length < 4){
        duplicates = duplicateChecks.length;
      }
      duplicateChecks = duplicateChecks.slice(1,duplicates)
      for (let i = 0; i <duplicates-1; i++){
       DuplicateString += duplicateChecks[i]._id + "\n";
      }
      var digest = response.d.GetContextWebInformation.FormDigestValue
      return digest
    }).then(async response => {
      //console.log(headers)
      headers['X-RequestDigest'] = response
      headers['Content-Type'] = "application/json;odata=verbose"
      // change to local AccesLs to Technology list
      var l = listWebURL + `/AccessToTechnology/_api/web/lists/getByTitle('A2TApplications')/items`
      console.log("webURL:")
      console.log(l)
      if(values.savedConsent === true){
        data = {
                      '__metadata': { 'type': 'SP.FieldUrlValue' },
                      'Description': 'Client Consent',
                      'Url': 'https://access-to-technology-dev.apps.silver.devops.gov.bc.ca/clientConsent/'+values.applicationId +'/'+values._token
                  
      };
      }
     
      return request.post({
        url: l,
        headers: headers,
        json: true,
        body: {
          "__metadata": {
            "type": `SP.Data.A2TApplicationsListItem`
          },
          "Title": `${values.serviceProviderName} - ${values.applicationId}`,
          'ApplicationID': values.applicationId,
          'ApplicationToken': values._token,
          //step 1
          'serviceProviderName': values.serviceProviderName,
          'serviceProviderPostal': values.serviceProviderPostal,
          'serviceProviderContact': values.serviceProviderContact,
          'serviceProviderPhone': values.serviceProviderPhone,
          'serviceProviderEmail': values.serviceProviderEmail,
          'fundingSource': values.fundingSource,
          'eligibleProgram': values.trainingProgram,
          'periodStart1': typeof values.periodStart1 !== "undefined" ? new Date(values.periodStart1) : null,
          'periodEnd1': typeof values.periodEnd1 !== "undefined" ? new Date(values.periodEnd1) : null,
          'BCEAorFederalOnReserve':{'results': values.BCEAorFederalOnReserve},
          'workBCCaseNumber': values.workBCCaseNumber,
          'clientName': values.clientName,
          'clientLastName': values.clientLastName,
          'clientMiddleName': typeof values.clientMiddleName !== "undefined"? values.clientMiddleName : "",
          'clientSignature': typeof values.clientSignature !== "undefined"? values.clientSignature : "",
          'clientAddress': typeof values.clientAddress2 !== "undefined"?  (values.clientAddress +", " + values.clientAddress2) : values.clientAddress,
          'clientCity': values.clientCity,
          'clientProvince': values.clientProvince,
          'clientPostal': values.clientPostal,
          'clientPhone': values.clientPhone,
          'clientEmail': values.clientEmail,
          'altShippingAddress': values.altShippingAddress,
          // insert duplicate info response here 
          //step 1:pop-up fields
          'receiverName':values.recipientName,
          'clientFullName':values.clientName +" "+values.clientLastName,
          'DuplicateInfo': DuplicateString !== "undefined"? DuplicateString : "",
          //step 
          'clientEligibility': values.clientEligibility,
          'serviceProviderResponsibility': values.serviceProviderResponsibility,
          'clientConsent': values.savedConsent,
          'clientConsentDate': typeof values.clientConsentDate !== "undefined" ? new Date(values.clientConsentDate) : null,
          'CaseNumberDuplicate': WorkBCDuplicate,
          'virtualConsent':data,
        }
      })
    }).then(async response =>{
      //file attached
      return [true, response.d.ID];
    })
     .catch(err => {
      //there was an error in the chan
      //item was not created
      console.log("error in chain")
      //console.log(err);
      //sendEmail(values, "Add Attempt Error - Application Could Not Be Added to SharePoint")
      console.log("err status code:"+ err.statusCode);
      console.log(err);
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



cron.schedule('*/1 * * * *', async function() {
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
                // save values to mongo db
                if (saved) {
                  try {
                    updateSavedToSP("ProviderIntake",data._id);
                    updateSaveIdToSP("ProviderIntake",data._id,saved[1])
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
  });
  function isDateInThisWeek(date) {
    const todayObj = new Date();
    const todayDate = todayObj.getDate();
    const todayDay = todayObj.getDay();
  
    // get first date of week
    const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
  
    // get last date of week
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 28);
  
    // if date is equal or within the first and last dates of the week
    return date >= firstDayOfWeek && date <= lastDayOfWeek;
  }

  //add proper fields for A2T
async function saveProcessTimeToSP(values) {
  // call function in here before saving
  try{
  var headers;
  const date = new Date(values.periodStart1);
  const isInFourWeeks = isDateInThisWeek(date);
  console.log(isInFourWeeks)
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
          url: listWebURL + '/AccessToTechnology/_api/contextInfo',
          headers: headers,
          json: true,
        })
    }).then(async response => {
      
      var digest = response.d.GetContextWebInformation.FormDigestValue
      return digest
    }).then(async response => {
      headers['X-RequestDigest'] = response
      headers['Content-Type'] = "application/json;odata=verbose"
      headers['X-HTTP-Method'] = "MERGE"
      headers['If-Match'] = "*"
      // change to local AccesLs to Technology list
      var l = listWebURL + `/AccessToTechnology/_api/web/lists/getByTitle('A2TApplications')/items('`+values.SPID+`')`
      console.log("webURL:")
      console.log(l)
     
      return request.post({
        url: l,
        headers: headers,
        json: true,
        body: {
          "__metadata": {
            "type": `SP.Data.A2TApplicationsListItem`
          },
          "ProcessTime": isInFourWeeks,
        }
      })
    }).then(async response =>{
      //file attached
      return isInFourWeeks;
    })
     .catch(err => {
      //there was an error in the chan
      //item was not created
      console.log("error in chain")
      //console.log(err);
      //sendEmail(values, "Add Attempt Error - Application Could Not Be Added to SharePoint")
      console.log("err status code:"+ err.statusCode);
      console.log(err);
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

  cron.schedule('*/1 6 * * *', async function() {
    //30 7 * * *
      console.log('running a task every 6 hours');
      //console.log('running a task every 10 seconds');
      spr = spauth.getAuth(listWebURL, {
        username: listUser,
        password: listPass,
        domain: listDomain,
        relyingParty: listParty,
        adfsUrl: listADFS
    })
      
    await getIncomingProcessTimeNotTrue()
      .then(async cursor => {
          var results = await cursor.toArray()
          console.log(results.length)
          for (const data of results){
            clean(data)
            await saveProcessTimeToSP(data)
                .then(function(saved){
                  // save values to mongo db
                  if (saved) {
                    try {
                      updateProcessTimeToTrue("ProviderIntake",data._id);
                    }
                    catch (error) {
                      console.log(error);
                    }
                  }
                  else{
                    console.log("Not time yet");
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