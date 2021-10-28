const cron = require('node-cron')
const schedule = require('node-schedule');
const express = require('express')
const spauth = require('node-sp-auth')
const request = require('request-promise')
var generateHTMLEmail = require('./utils/htmlEmail')
var { getProviderIntakeNotSP, getProviderSurveyNotSP, updateSurveyPeriodOver, updateThreeMonthSurveySent, updateTwoWeekReminderSent, updateFourWeekReminderSent, getClientTrainingOneMonth,getClientTrainingThreeMonth, getClientSurveyReminders, updateOneMonthSurveysSent, getProviderSurvey, getClientSurveyNotSP, getIncomingProcessTimeNotTrue, updateSaveIdToSP, updateCourseCompletionUpdateToFalse, updateEmploymentUpdateToFalse, getCourseCompletionUpdateNeeded, getEmploymentUpdateNeeded, WorkBCCheck, duplicateCheck, updateSavedToSP, updateProcessTimeToTrue, updateOneMonthSurveysSent } = require('./mongo')
var clean = require('./clean')
var listWebURL = process.env.LISTWEBURL || process.env.OPENSHIFT_NODEJS_LISTWEBURL || "https://sdpr.sp.gov.bc.ca/sites/elmsd"
var listUser = process.env.LISTUSER || process.env.OPENSHIFT_NODEJS_LISTUSER || "elmsdtst"
var listPass = process.env.LISTPASS || process.env.OPENSHIFT_NODEJS_LISTPASS || ""
var listDomain = process.env.LISTDOMAIN || process.env.OPENSHIFT_NODEJS_LISTDOMAIN || "IDIR"
var listParty = process.env.LISTPARTY || process.env.OPENSHIFT_NODEJS_LISTPARTY || "urn:sp.gov.bc.ca"
var listADFS = process.env.LISTADFS || process.env.OPENSHIFT_NODEJS_LISTADFS || "https://sts.gov.bc.ca/adfs/ls"
var linkUrl = process.env.CLIENTURL || process.env.OPENSHIFT_NODEJS_CLIENTURL || ""
var nodemailer = require("nodemailer")
const { urlencoded } = require('express')

app = express();

var spr;
/**************************/
/*CRON JOBS BEING CALLED */
/*************************/
cron.schedule('*/3 * * * *', async function () {
  console.log('running a check for newly completed forms task every 3 minutes');
  //console.log('running a task every 10 seconds');
  spr = spauth.getAuth(listWebURL, {
    username: listUser,
    password: listPass,
    domain: listDomain,
    relyingParty: listParty,
    adfsUrl: listADFS
  })
  // get all in providerIntake table where savedToSp = false
  await getProviderIntakeNotSP()
    .then(async cursor => {
      var results = await cursor.toArray()
      console.log(results.length)
      for (const data of results) {
        clean(data)
        // save data to Sharepoint
        await saveListProviderIntake(data)
          .then(function (saved) {
            // save values to mongo db
            if (saved) {
              try {
                // update SavedToSP -> true and save SPID for future updates
                updateSavedToSP("ProviderIntake", data._id);
                updateSaveIdToSP("ProviderIntake", data._id, saved[1])
              }
              catch (error) {
                console.log(error);
              }
            }
          })
          .catch(function (e) {
            console.log("error")
            console.log(e)
          })
      }
    })
});
cron.schedule('*/30 * * * *', async function () {
  //30 7 * * *
  console.log('running a ProcessTime task every 30 mins');
  //console.log('running a task every 10 seconds');
  spr = spauth.getAuth(listWebURL, {
    username: listUser,
    password: listPass,
    domain: listDomain,
    relyingParty: listParty,
    adfsUrl: listADFS
  })
  // get all in providerIntakeWhere ProcessTime = false
  await getIncomingProcessTimeNotTrue()
    .then(async cursor => {
      var results = await cursor.toArray()
      console.log(results.length)
      for (const data of results) {
        clean(data)
        // check if time to set Process Time to True updates SP value whether true/false
        await saveProcessTimeToSP(data)
          .then(function (saved) {
            // if processTime now true, update in mongo otherwise Not time yet
            if (saved) {
              try {
                updateProcessTimeToTrue("ProviderIntake", data._id);
              }
              catch (error) {
                console.log(error);
              }
            }
            else {
              console.log("Not time yet");
            }
          })
          .catch(function (e) {
            console.log("error")
            console.log(e)
          })
      }
    })
});

cron.schedule('*/5 * * * *', async function () {
  //30 7 * * *
  console.log('running a newly completed survey check every 5 mins');
  //console.log('running a task every 10 seconds');
  spr = spauth.getAuth(listWebURL, {
    username: listUser,
    password: listPass,
    domain: listDomain,
    relyingParty: listParty,
    adfsUrl: listADFS
  })
  // get all in provider intake where courseCompletionUpdateNeeded = true
  await getCourseCompletionUpdateNeeded()
    .then(async cursor => {
      var results = await cursor.toArray()
      console.log(results.length)
      for (const data of results) {
        clean(data)
        // save course Completion Survey answers to SP
        await saveCourseCompletionSurveyToSP(data)
          .then(function (saved) {
            // save ourseCompletionUpdateNeeded = false to mongo db
            if (saved) {
              try {
                updateCourseCompletionUpdateToFalse("ProviderIntake", data._id);
              }
              catch (error) {
                console.log(error);
              }
            }
          })
          .catch(function (e) {
            console.log("error")
            console.log(e)
          })
      }
    })
  // get all in provider intake where EmploymentUpdateNeeded = true
  await getEmploymentUpdateNeeded()
    .then(async cursor => {
      var results = await cursor.toArray()
      console.log(results.length)
      for (const data of results) {
        clean(data)
        // save employment Survey answers to SP
        await saveEmploymentSurveyToSP(data)
          .then(function (saved) {
            // save EmploymentUpdateNeeded = false to mongo db
            if (saved) {
              try {
                updateEmploymentUpdateToFalse("ProviderIntake", data._id);
              }
              catch (error) {
                console.log(error);
              }
            }
          })
          .catch(function (e) {
            console.log("error")
            console.log(e)
          })
      }
    })
  // get from clientSurveyTable all surveys not saved to SP
  await getClientSurveyNotSP()
    .then(async cursor => {
      var results = await cursor.toArray()
      console.log(results.length)
      for (const data of results) {
        clean(data)
        // save to clientSurvey List in SP
        await saveListClientSurvey(data)
          .then(function (saved) {
            // save values to mongo db in clientSurveyTable and ProviderIntakeTable to mark completed
            if (saved) {
              try {
                updateSavedToSP("ClientSurvey", data._id);
              }
              catch (error) {
                console.log(error);
              }
            }
          })
          .catch(function (e) {
            console.log("error")
            console.log(e)
          })
      }
    })
// get all provider Surveys not save to SP form table ServiceProvider
  await getProviderSurveyNotSP()
    .then(async cursor => {
      var results = await cursor.toArray()
      console.log(results.length)
      for (const data of results) {
        clean(data)
        // save data to ServiceProviderSurvey List
        await saveListProviderSurvey(data)
          .then(function (saved) {
            // save update SavedToSP=True to mongo db in ServiceProviderList
            if (saved) {
              try {
                updateSavedToSP("ServiceProvider", data._id);
              }
              catch (error) {
                console.log(error);
              }
            }
          })
          .catch(function (e) {
            console.log("error")
            console.log(e)
          })
      }
    })


});

cron.schedule('* */6 * * *', async function () {
  //30 7 * * *
  console.log('running a check to send surveys out every 6 hours');
  //console.log('running a task every 10 seconds');
  spr = spauth.getAuth(listWebURL, {
    username: listUser,
    password: listPass,
    domain: listDomain,
    relyingParty: listParty,
    adfsUrl: listADFS
  })
// get all Clients Whom DO NOT have OneMonthSurveysSent field
  await getClientTrainingOneMonth()
    .then(async cursor => {
      var results = await cursor.toArray()
      console.log(results.length)
      for (const data of results) {
        clean(data)
        // if four weeks post training end date, send surveys
        if (isDateXWeeksOutorMore(data.periodEnd1, 4)) {
          //send out email course Completion Survey
          sendEmail(data, 7)
          //send out email client Survey
          sendEmail(data, 2)
          updateOneMonthSurveysSent("ProviderIntake", data._id)
          console.log("updateOneMonthSurveysSent");

        }
      }
    })
  // get all Clients Whom DO NOT have threeMonthSurveySent field
  await getClientTrainingThreeMonth()
    .then(async cursor => {
      var results = await cursor.toArray()
      console.log(results.length)
      for (const data of results) {
        clean(data)
        // if 12 weeks post training end date, send survey
        if (isDateXWeeksOutorMore(data.periodEnd1, 12)) {
          //send out email client Employment Status 
          sendEmail(data, 8)
          updateThreeMonthSurveySent("ProviderIntake", data._id)
          console.log("updateThreeMonthSurveySent");

        }
      }
    })
  // get clients whom have oneMonthSurveysSent = true and clientSurveyCompleted = false
  await getClientSurveyReminders()
    .then(async cursor => {
      var results = await cursor.toArray()
      console.log(results.length)
      for (const data of results) {
        clean(data)
        // check if time to sent 2 week reminder
        if (isDateXWeeksOut(data.periodEnd1, 6)) {
          //send out email course Completion Survey
          // if reminder has not already been sent
          if (!data.twoWeekReminderSent) {
            //send Reminder
            sendEmail(data,4)
            //mark reminder as sent in mongo
            updateTwoWeekReminderSent("ProviderIntake", data._id)
            console.log("updateTwoWeekReminderSent");
          }
        }
        // check if time to sent 4 week final reminder
        else if (isDateXWeeksOut(data.periodEnd1, 8)) {
           // if reminder has not already been sent
          if (!data.fourWeekReminderSent) {
            //send Reminder
             sendEmail(data,6)
            //mark reminder as sent in mongo
            updateFourWeekReminderSent("ProviderIntake", data._id)
            console.log("updateFourWeekReminderSent");

          }
        }
        else if (getSurveyEndDateOver(data.periodEnd1)){
          updateSurveyPeriodOver("ProviderIntake", data._id)
        }
      }
    })
});
// Repeat pattern for 2 week and 4 week final reminder
// Service Provider Survey Start Date
const date1 = new Date(2021, 09, 21, 16, 03, 0);
// Service Provider Survey Reminder Date
const date2 = new Date(2021, 09, 21, 16, 03, 0);
// Service Provider Survey Final Reminder Date
const date3 = new Date(2021, 09, 21, 16, 03, 0);
// schedule provider Surveys to be sent
schedule.scheduleJob(date1, async function () {
  // send to all in ServiceProvider table where completed = false
  await getProviderSurvey()
    .then(async cursor => {
      var results = await cursor.toArray()
      console.log(results.length)
      for (const data of results) {
        clean(data)
        sendEmail(data, 1);
      }
    })
});

// schedule provider Survey Reminder
schedule.scheduleJob(date2, async function () {
  // send to all in ServiceProvider table where completed = false
  await getProviderSurvey()
    .then(async cursor => {
      var results = await cursor.toArray()
      console.log(results.length)
      for (const data of results) {
        clean(data)
        sendEmail(data, 3);
      }
    })
});

// schedule provider Survey Final Reminder
schedule.scheduleJob(date3, async function () {
  // send to all in ServiceProvider table where completed = false
  await getProviderSurvey()
    .then(async cursor => {
      var results = await cursor.toArray()
      console.log(results.length)
      for (const data of results) {
        clean(data)
        sendEmail(data, 5);
      }
    })
});
/******************************************/
/*UPDATE SP FUNCTIONS TO SUPPORT CRON JOBS*/
/******************************************/

// save application information to  Sharepoint A2T Application List
async function saveListProviderIntake(values) {
  // call function in here before saving
  try {
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
          url: listWebURL + '/A2TTest/_api/contextInfo',
          headers: headers,
          json: true,
        })
      }).then(async response => {
        // check for WorkBC already exists
        WorkBCDuplicate = await WorkBCCheck(values.workBCCaseNumber)
        // check is (full name, address, email, or phone number match)
        duplicateChecks = await duplicateCheck(values.compareField);
        // if construct duplicate value if duplicates found, show only 3 with most similarities
        if (duplicateChecks != undefined) {
          if (duplicateChecks.length < 4) {
            duplicates = duplicateChecks.length;
          }
          duplicateChecks = duplicateChecks.slice(1, duplicates)
          for (let i = 0; i < duplicates - 1; i++) {
            DuplicateString += duplicateChecks[i]._id + "\n";
          }
        }
        var digest = response.d.GetContextWebInformation.FormDigestValue
        return digest
      }).then(async response => {
        //console.log(headers)
        headers['X-RequestDigest'] = response
        headers['Content-Type'] = "application/json;odata=verbose"
        // change to local AccesLs to Technology list
        var l = listWebURL + `/A2TTest/_api/web/lists/getByTitle('A2TApplicationsTest')/items`
        console.log("webURL:")
        console.log(l)
        // if electronic consent was completed, create consent link to append to application
        if (values.savedConsent === true) {
          data = {
            '__metadata': { 'type': 'SP.FieldUrlValue' },
            'Description': 'Client Consent',
            'Url': 'https://access-to-technology.es.workbc.ca/clientConsent/' + values.applicationId + '/' + values._token

          };
        }
        // Create Application in Sharepoint A2TApplication List
        return request.post({
          url: l,
          headers: headers,
          json: true,
          body: {
            "__metadata": {
              "type": `SP.Data.A2TApplicationsTestListItem`
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
            'BCEAorFederalOnReserve': { 'results': values.BCEAorFederalOnReserve },
            'workBCCaseNumber': values.workBCCaseNumber,
            'clientName': values.clientName,
            'clientLastName': values.clientLastName,
            'clientMiddleName': typeof values.clientMiddleName !== "undefined" ? values.clientMiddleName : "",
            'clientSignature': typeof values.clientSignature !== "undefined" ? values.clientSignature : "",
            'clientAddress': typeof values.clientAddress2 !== "undefined" ? (values.clientAddress + ", " + values.clientAddress2) : values.clientAddress,
            'clientCity': values.clientCity,
            'clientProvince': values.clientProvince,
            'clientPostal': values.clientPostal,
            'clientPhone': values.clientPhone,
            'clientEmail': values.clientEmail,
            'altShippingAddress': values.altShippingAddress,
            //step 1:pop-up fields
            'receiverName': values.recipientName,
            'clientFullName': values.clientName + " " + values.clientLastName,
            'DuplicateInfo': DuplicateString !== "undefined" ? DuplicateString : "",
            //step 
            'clientEligibility': values.clientEligibility,
            'serviceProviderResponsibility': values.serviceProviderResponsibility,
            'clientConsent': values.savedConsent,
            'clientConsentDate': typeof values.clientConsentDate !== "undefined" ? new Date(values.clientConsentDate) : null,
            'CaseNumberDuplicate': WorkBCDuplicate,
            'virtualConsent': data,
          }
        })
      }).then(async response => {
        //file attached
        return [true, response.d.ID];
      })
      .catch(err => {
        //there was an error in the chan
        //item was not created
        console.log("error in chain")
        console.log("err status code:" + err.statusCode);
        console.log(err);
        if (err.statusCode !== 403) {
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

// check if application processTime can be set to true to move content into CU View
async function saveProcessTimeToSP(values) {
  // call function in here before saving
  try {
    var headers;
    // check if training Start Date is within 4 weeks
    const date = new Date(values.periodStart1);
    const isInFourWeeks = isDateInThisWeek(date);
    console.log(isInFourWeeks)
    //save ProcessTime to SP instance set processTime = isInFourWeeks(true/false)
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
        headers['X-RequestDigest'] = response
        headers['Content-Type'] = "application/json;odata=verbose"
        headers['X-HTTP-Method'] = "MERGE"
        headers['If-Match'] = "*"
        // change to local AccesLs to Technology list
        var l = listWebURL + `/A2TTest/_api/web/lists/getByTitle('A2TApplicationsTest')/items('` + values.SPID + `')`
        console.log("webURL:")
        console.log(l)
        return request.post({
          url: l,
          headers: headers,
          json: true,
          body: {
            "__metadata": {
              "type": `SP.Data.A2TApplicationsTestListItem`
            },
            "ProcessTime": isInFourWeeks,
          }
        })
      }).then(async response => {
        //file attached
        return isInFourWeeks;
      })
      .catch(err => {
        //there was an error in the chan
        //item was not created
        console.log("error in chain")
        //console.log(err);
        //sendEmail(values, "Add Attempt Error - Application Could Not Be Added to SharePoint")
        console.log("err status code:" + err.statusCode);
        console.log(err);
        if (err.statusCode !== 403) {
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

// save CourseCompletionSurvey values to SP Application
async function saveCourseCompletionSurveyToSP(values) {
  // call function in here before saving
  try {
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
        headers['X-RequestDigest'] = response
        headers['Content-Type'] = "application/json;odata=verbose"
        headers['X-HTTP-Method'] = "MERGE"
        headers['If-Match'] = "*"
        // change to local AccesLs to Technology list
        var l = listWebURL + `/A2TTest/_api/web/lists/getByTitle('A2TApplicationsTest')/items('` + values.SPID + `')`
        console.log("webURL:")
        console.log(l)
        return request.post({
          url: l,
          headers: headers,
          json: true,
          body: {
            "__metadata": {
              "type": `SP.Data.A2TApplicationsTestListItem`
            },
            "completedTraining": values.completedTraining,
            "minimallyCompleted": values.minimallyCompleted,
            "courseCompletionSurveyDate": (new Date()),
          }
        })
      }).then(async response => {
        //file attached
        return true;
      })
      .catch(err => {
        //there was an error in the chan
        //item was not created
        console.log("error in chain")
        //console.log(err);
        //sendEmail(values, "Add Attempt Error - Application Could Not Be Added to SharePoint")
        console.log("err status code:" + err.statusCode);
        console.log(err);
        if (err.statusCode !== 403) {
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

// save employmentSurveyAnswers to Client application data in SP
async function saveEmploymentSurveyToSP(values) {
  // call function in here before saving
  try {
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
        headers['X-RequestDigest'] = response
        headers['Content-Type'] = "application/json;odata=verbose"
        headers['X-HTTP-Method'] = "MERGE"
        headers['If-Match'] = "*"
        // change to local AccesLs to Technology list
        var l = listWebURL + `/A2TTest/_api/web/lists/getByTitle('A2TApplicationsTest')/items('` + values.SPID + `')`
        console.log("webURL:")
        console.log(l)
        return request.post({
          url: l,
          headers: headers,
          json: true,
          body: {
            "__metadata": {
              "type": `SP.Data.A2TApplicationsTestListItem`
            },
            "employmentFound": values.employmentFound,
            "employmentStatus": values.employmentStatus,
            "employmentSurveySubmissionDate": (new Date()),
          }
        })
      }).then(async response => {
        //file attached
        return true;
      })
      .catch(err => {
        //there was an error in the chan
        //item was not created
        console.log("error in chain")
        //console.log(err);
        //sendEmail(values, "Add Attempt Error - Application Could Not Be Added to SharePoint")
        console.log("err status code:" + err.statusCode);
        console.log(err);
        if (err.statusCode !== 403) {
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

// Save client survey results to clientSurvey List in SP
async function saveListClientSurvey(values) {
  // call function in here before saving
  try {
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
        var l = listWebURL + `/A2TTest/_api/web/lists/getByTitle('A2TClientSurvey')/items`
        console.log("webURL:")
        console.log(l)
        return request.post({
          url: l,
          headers: headers,
          json: true,
          body: {
            "__metadata": {
              "type": `SP.Data.A2TClientSurveyListItem`
            },
            "LaptopWasNeeded": `${values.laptopWasNeeded}`,
            "TechnicalSupportSatisfaction": `${values.technicalSupportSatisfaction}`,
            "HoursPerWeek": `${values.hoursPerWeek}`,
            "PostTrainingPlans": `${values.postTrainingPlans}`,
            "FeedbackAndExperienceComments": `${values.feedBackAndExperienceComments}`,
            "ApplicationID": `${values.applicationId}`,
            "CertificateProgram": `${values.certificateProgram}`,

          }
        })
      }).then(async response => {
        //file attached
        return true;
      })
      .catch(err => {
        //there was an error in the chan
        //item was not created
        console.log("error in chain")
        //console.log(err);
        //sendEmail(values, "Add Attempt Error - Application Could Not Be Added to SharePoint")
        console.log("err status code:" + err.statusCode);
        console.log(err);
        if (err.statusCode !== 403) {
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

// save Service Provider Survey results to SP serviceProvider survey list
async function saveListProviderSurvey(values) {
  // call function in here before saving
  try {
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
        var l = listWebURL + `/A2TTest/_api/web/lists/getByTitle('A2TServiceProviderSurvey')/items`
        console.log("webURL:")
        console.log(l)
        return request.post({
          url: l,
          headers: headers,
          json: true,
          body: {
            "__metadata": {
              "type": `SP.Data.A2TServiceProviderSurveyListItem`
            },
            "easeOfApplicationCompletion": `${values.easeOfApplicationCompletion}`,
            "applicationProcessingSpeed": `${values.applicationProcessingSpeed}`,
            "otherTrainingProgramsSuggestions": `${values.otherTrainingProgramsSuggestions}`,
            "overallExperienceWithOnlineAppli": `${values.overallExperienceWithOnlineApplicationProcess}`,
            "programsSupportOfClient": `${values.programsSupportOfClient}`,
            "likelyToRecommendProgram": `${values.likelyToRecommendProgram}`,
            "overallExperienceWithOrganizatio": `${values.experienceBetterComments}`,
            "ServiceProviderName": `${values.firstname}`,
            "cohort": `${values.cohort}`,
            "ReferralId": `${values.referral_wid}`,

          }
        })
      }).then(async response => {
        //file attached
        return true;
      })
      .catch(err => {
        //there was an error in the chan
        //item was not created
        console.log("error in chain")
        //console.log(err);
        //sendEmail(values, "Add Attempt Error - Application Could Not Be Added to SharePoint")
        console.log("err status code:" + err.statusCode);
        console.log(err);
        if (err.statusCode !== 403) {
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

/**************************************/
/* DATE FUNCTIONS TO SUPPORT CRON JOBS*/
/**************************************/
const DaysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MonthsOfTheYear =  ["January", "February", "March", "April", "May", "June", "July",  "August", "September", "October", "November", "December"];

function isDateInThisWeek(date) {
  const todayObj = new Date();
  const todayDate = todayObj.getDate();
  const todayDay = todayObj.getDay();
  // get first date of week
  const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
  // get last date of week
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 32);
  // if date is equal or within the first and last dates of the week
  return date >= firstDayOfWeek && date <= lastDayOfWeek;
}

// check if date is equal
function isDateXWeeksOut(date, time) {
  const todaysDate = new Date();
  const endDate = new Date(date);
  // get date + time in weeks
  const timeOut = new Date(endDate.setDate(endDate.getDate() + (7 * time)));
  // set hours to 0 for date compare
  timeOut.setHours(0, 0, 0, 0)
  todaysDate.setHours(0, 0, 0, 0)
  // if date is equal
  return todaysDate.getTime() === timeOut.getTime();
}

// check if date is equal or passed
function isDateXWeeksOutorMore(date, time) {
  const todaysDate = new Date();
  const endDate = new Date(date);
  // get date + time in weeks
  const timeOut = new Date(endDate.setDate(endDate.getDate() + (7 * time)));
  // set hours to 0 for date compare
  timeOut.setHours(0, 0, 0, 0)
  todaysDate.setHours(0, 0, 0, 0)
  // if date is equal or passed
  return todaysDate.getTime() >= timeOut.getTime();
}

function getSurveyEndDate(date){
  const endDate = new Date(date);
  const timeOut = new Date(endDate.setDate(endDate.getDate() + (7 * 8)));
  timeOut.setHours(0, 0, 0, 0)
  return (DaysOfTheWeek[timeOut.getDay()] +", "+ MonthsOfTheYear[timeOut.getMonth()] +" "+ timeOut.getDate() +", "+timeOut.getFullYear());
}

function getSurveyEndDateOver(date){
  const todaysDate = new Date();
  const endDate = new Date(date);
  const timeOut = new Date(endDate.setDate(endDate.getDate() + (57)));
  timeOut.setHours(0, 0, 0, 0)
  todaysDate.setHours(0, 0, 0, 0)
  return todaysDate.getTime() >= timeOut.getTime();
}

/*************************/
/*FUNCTION TO SEND EMAILS*/
/*************************/
async function sendEmail(values, message) {
  try {
    let transporter = nodemailer.createTransport({
      host: "apps.smtp.gov.bc.ca",
      port: 25,
      secure: false,
      tls: {
        rejectUnauthorized: false
      } // true for 465, false for other ports
    });
    /* DONT FORGET TO REPLACE URL WITH PRODUCTION URL IN HREF */
    return await transporter.verify()
      .then(function (r) {
        //console.log(r)
        console.log("Transporter connected.")
        // send mail with defined transport object  
        let message1 = {};
        if (message === 1) {
          /*INITIAL SERVICE PROVIDER SURVEY */
          message1 = {
            from: 'Access to Technology <donotreply@gov.bc.ca>', // sender address
            to: `${values.userChannelId}`, // will be service provider Email
            bcc: '', // remove after
            subject: `${values.firstname}, we need your insights on the Access to Technology (A2T) Program`, // Subject line
            html: generateHTMLEmail(
              "Access to Technology - Experience Survey",
              [
                `Hello ${values.firstname},`,
                `You’re receiving this email because you’re participating in the Access to Technology (A2T) program.<br/>`,

                `Thank you for being a part of the program. We’re always looking for ways to improve our services and hope you can help us.<br/>
              <ul >
                <li>We’re conducting a short 2-3 minute survey about your experience with the program so far.</li>
                <li>Please provide your thoughts, ideas, and any feedback as this will help improve the program - for you and for future participants.</li>
                <li>All survey responses are confidential.</li>
              </ul>`,
                `PLEASE <a href="https://access-to-technology-dev.apps.silver.devops.gov.bc.ca/ServiceProviderSurvey/${values.referral_wid}" style=" bgcolor: #ffffff; background-color: #ffffff;font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #294266 ! important; text-decoration: none; font-weight: bold; display: inline-block;" >CLICK HERE</a>, to complete the survey by <b>Wednesday, December 1, 2021</b>.<br/>`,
                `Thank you in advance for your participation, ${values.firstname}. We look forward to hearing from you.<br/>`,
                `Sincerely,<br/>
              Your A2T Team`
              ])
            // html body
          };
        }
        if (message === 2) {
          /*INITIAL CLIENT SURVEY */
          message1 = {
            from: 'Access to Technology <donotreply@gov.bc.ca>', // sender address
            to: `${values.clientEmail}`, // will be service provider Email
            bcc: '', // remove after
            subject: `Congratulations ${values.clientName}, on your new laptop! We want to hear from you!`, // Subject line
            html: generateHTMLEmail(
              "Access to Technology - Experience Survey",
              [
                `Hello ${values.clientName},`,
                `You’re receiving this email because you’re participating in the Access to Technology (A2T) program.<br/>`,

                `Thank you for being a part of the program. We’re always looking for ways to improve our services and hope you can help us.<br/>
              <ul>
                <li>We’re conducting a short 2-3 minute survey about your experience with the program so far.</li>
                <li>Please provide your thoughts, ideas, and any feedback as this will help improve the program - for you and for future participants.</li>
                <li>All survey responses are confidential.</li>
              </ul>`,

                `PLEASE <a href="https://access-to-technology-dev.apps.silver.devops.gov.bc.ca/ParticipantSurvey/${values.applicationId}/${values._token}" style=" bgcolor: #ffffff; background-color: #ffffff;font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #294266 ! important; text-decoration: none; font-weight: bold; display: inline-block;" >CLICK HERE</a>, to complete the survey by <b>${getSurveyEndDate(values.periodEnd1)}</b>.<br/>`,
                `Thank you in advance for your participation, ${values.clientName}. We look forward to hearing from you.<br/>`,
                `Sincerely,<br/>
              Your A2T Team`
              ])
            // html body
          };
        }
        else if (message === 3) {
          /*SERVICE PROVIDER SURVEY FOLLOW UP EMAIL REMINDER */
          message1 = {
            from: 'Access to Technology <donotreply@gov.bc.ca>', // sender address
            to: `${values.userChannelId}`, // will be service provider Email
            bcc: '', // remove after
            subject: `[Reminder] Access to Technology (A2T) Survey - We care about your feedback`, // Subject line
            html: generateHTMLEmail(
              "Access to Technology - Experience Survey",
              [
                `Hello ${values.firstname},`,
                `You were recently invited to participate in a survey on the Access to Technology (A2T) program. Your feedback is critical as we strive to make the program better for you and for future participants.<br/>`,
                `If you have not already completed the survey, we encourage you to do so. It only takes 2-3 minutes and your responses are confidential.<br/>`,
                `PLEASE <a href="https://access-to-technology-dev.apps.silver.devops.gov.bc.ca/ServiceProviderSurvey/${values.referral_wid}" style=" bgcolor: #ffffff; background-color: #ffffff;font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #294266 ! important; text-decoration: none; font-weight: bold; display: inline-block;" >CLICK HERE</a>, to complete this survey by <b>Wednesday, December 1, 2021</b>.<br/>`,
                `Thank you in advance for your help, ${values.firstname}.<br/>`,
                `Sincerely,<br/>
              Your A2T Team`
              ])
            // html body
          };
        }
        else if (message === 4) {
          /*CLIENT SURVEY FOLLOW UP EMAIL REMINDER */
          message1 = {
            from: 'Access to Technology <donotreply@gov.bc.ca>', // sender address
            to: `${values.clientEmail}`, // will be service provider Email
            bcc: '', // remove after
            subject: `[Reminder] Access to Technology (A2T) Survey - We care about your feedback`, // Subject line
            html: generateHTMLEmail(
              "Access to Technology - Experience Survey",
              [
                `Hello ${values.clientName},`,
                `You were recently invited to participate in a survey on the Access to Technology (A2T) program. Your feedback is critical as we strive to make the program better for you and for future participants.<br/>`,
                `If you have not already completed the survey, we encourage you to do so. It only takes 2-3 minutes and your responses are confidential.<br/>`,
                `PLEASE <a href="https://access-to-technology-dev.apps.silver.devops.gov.bc.ca/ParticipantSurvey/${values.applicationId}/${values._token}" style=" bgcolor: #ffffff; background-color: #ffffff;font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #294266 ! important; text-decoration: none; font-weight: bold; display: inline-block;" >CLICK HERE</a>, to complete the survey by <b>${getSurveyEndDate(values.periodEnd1)}</b>.<br/>`,
                `Thank you in advance for your help, ${values.clientName}.<br/>`,
                `Sincerely,<br/>
              Your A2T Team`
              ])
            // html body
          };
        }
        else if (message === 5) {
          /*SERVICE PROVIDER SURVEY FINAL FOLLOW UP EMAIL REMINDER */
          message1 = {
            from: 'Access to Technology <donotreply@gov.bc.ca>', // sender address
            to: `${values.userChannelId}`, // will be service provider Email
            bcc: '', // remove after
            subject: `[Final Reminder] Access to Technology (A2T) Survey – don’t miss out!`, // Subject line
            html: generateHTMLEmail(
              "Access to Technology - Experience Survey",
              [
                `Hello ${values.firstname},`,
                `Today, <b>December 1, 2021,</b> is the last day to participate in the Access to Technology (A2T) survey - don’t miss your opportunity to have your say.<br/>`,
                `If you have not already completed the survey, we encourage you to do so. It only takes 2-3 minutes and your responses are confidential.<br/>`,
                `PLEASE <a href="https://access-to-technology-dev.apps.silver.devops.gov.bc.ca/ServiceProviderSurvey/${values.referral_wid}" style=" bgcolor: #ffffff; background-color: #ffffff;font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #294266 ! important; text-decoration: none; font-weight: bold; display: inline-block;" >CLICK HERE</a>, to complete this survey.<br/>`,
                `Thank you in advance for your help, ${values.firstname}.<br/>`,
                `Sincerely,<br/>
              Your A2T Team`
              ])
            // html body
          };
        }
        else if (message === 6) {
          /*CLIENT SURVEY FINAL FOLLOW UP EMAIL REMINDER */
          message1 = {
            from: 'Access to Technology <donotreply@gov.bc.ca>', // sender address
            to: `${values.clientEmail}`, // will be service provider Email
            bcc: '', // remove after
            subject: `[Final Reminder] Access to Technology (A2T) Survey - We care about your feedback`, // Subject line
            html: generateHTMLEmail(
              "Access to Technology - Experience Survey",
              [
                `Hello ${values.clientName},`,
                `Today, is the last day to participate in the Access to Technology (A2T) survey - don’t miss your opportunity to have your say.<br/>`,
                `If you have not already completed the survey, we encourage you to do so. It only takes 2-3 minutes and your responses are confidential.<br/>`,
                `PLEASE <a href="https://access-to-technology-dev.apps.silver.devops.gov.bc.ca/ParticipantSurvey/${values.applicationId}/${values._token}" style=" bgcolor: #ffffff; background-color: #ffffff;font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #294266 ! important; text-decoration: none; font-weight: bold; display: inline-block;" >CLICK HERE</a>, to complete the survey by <b>${getSurveyEndDate(values.periodEnd1)}</b>.<br/>`,
                `Thank you in advance for your help, ${values.clientName}.<br/>`,
                `Sincerely,<br/>
              Your A2T Team`
              ])
            // html body
          };
        }
        else if (message === 7) {
          /*CONFIRM CLIENT TRAINING COMPLETION SURVEY*/
          message1 = {
            from: 'Access to Technology <donotreply@gov.bc.ca>', // sender address
            to: `${values.serviceProviderEmail}`, // will be service provider Email
            bcc: '', // remove after
            subject: `[Action Required] Confirm Training Completion: Access to Technology Application ID ${values.applicationId}`, // Subject line
            html: generateHTMLEmail(
              "Access to Technology - Confirm Client Training Completion",
              [
                `Hello ${values.serviceProviderContact},`,
                `You’re receiving this email because you have an eligible client participating in the Access to Technology (A2T) program.<br/>
              We would like to request information on the client’s progress in their training program. Your response will help determine if the client gets to keep their laptop. Providing this information will take less than a minute.<br/>`,
                `PLEASE <a href="https://access-to-technology-dev.apps.silver.devops.gov.bc.ca/courseCompletionSurvey/${values.applicationId}/${values._token}" style=" bgcolor: #ffffff; background-color: #ffffff;font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #294266 ! important; text-decoration: none; font-weight: bold; display: inline-block;" >CLICK HERE</a>, to submit this information.<br/>`,

                `Application details are included below for your reference.<br/>
                <b>Application ID:</b> ${values.applicationId}<br/>
                <b>Client First Name:</b> ${values.clientName}<br/>
                <b>Client Last Name:</b> ${values.clientLastName}<br/>`,
                `Thank you very much for your help, ${values.serviceProviderContact}.<br/>`,
                `Sincerely,<br/>
              Your A2T Team`
              ])
            // html body
          };
        }
        else if (message === 8) {
          /*INITIAL CLIENT EMPLOYMENT STATUS SURVEY*/
          message1 = {
            from: 'Access to Technology <donotreply@gov.bc.ca>', // sender address
            to: `${values.serviceProviderEmail}`, // will be service provider Email
            bcc: '', // remove after
            subject: `[Action Required] Confirm Client Employment: Access to Technology Application ID ${values.applicationId}`, // Subject line
            html: generateHTMLEmail(
              "Access to Technology - Confirm Client Employment Status",
              [
                `Hello ${values.serviceProviderContact},`,
                `You’re receiving this email because you have an eligible client participating in the Access to Technology (A2T) program.<br/>
              We would like to request information on the client’s employment progress. Your response will help us understand the effectiveness of the A2T program in supporting clients to get employment. Providing this information will take less than a minute.<br/>`,
                `PLEASE <a href="https://access-to-technology-dev.apps.silver.devops.gov.bc.ca/employmentSurvey/${values.applicationId}/${values._token}" style=" bgcolor: #ffffff; background-color: #ffffff;font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #294266 ! important; text-decoration: none; font-weight: bold; display: inline-block;" >CLICK HERE</a>, to submit this information.<br/>`,

                `Application details are included below for your reference.<br/>
                <b>Application ID:</b> ${values.applicationId}<br/>
                <b>Client First Name:</b> ${values.clientName}<br/>
                <b>Client Last Name:</b> ${values.clientLastName}<br/>`,
                `Thank you very much for your help, ${values.serviceProviderContact}.<br/>`,
                `Sincerely,<br/>
              Your A2T Team`
              ])
            // html body
          };
        }

        transporter.sendMail(message1, (error, info) => {
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

// need cron to run to check dates of course completion 1 month 3 month -> send emails accordingly

app.listen(5000);