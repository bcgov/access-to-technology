var express = require('express');
var router = express.Router();
const yup = require('yup')
const yupPhone = require('yup-phone')

var { check, validationResult, matchedData } = require('express-validator')
var nodemailer = require("nodemailer");
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var spauth = require('node-sp-auth')
var request = require('request-promise')


var ProviderIntakeValidationSchema = require('../schemas/ProviderIntakeValidationSchema')
var generateHTMLEmail = require('../utils/htmlEmail')
var notification = require('../utils/applicationReceivedEmail');
var clean = require('../utils/clean')
var strings = require("../utils/strings")
var confirmData = require('../utils/confirmationData');
const { getProviderIntakeSubmitted } = require('../utils/confirmationData');
var {saveProviderIntakeValues} = require("../utils/mongoOperations");

var confirmationEmail1 = process.env.CONFIRMATIONONE || process.env.OPENSHIFT_NODEJS_CONFIRMATIONONE || "";
var confirmationBCC = process.env.CONFIRMATIONBCC || process.env.OPENSHIFT_NODEJS_CONFIRMATIONBCC || "";
var pEmail = process.env.PARTICIPANTEMAIL || process.env.OPENSHIFT_NODEJS_PARTICIPANTEMAIL || "";
var listEmail = process.env.LISTEMAIL || process.env.OPENSHIFT_NODEJS_LISTEMAIL || "";
var clientURL = process.env.CLIENTURL || process.env.OPENSHIFT_NODEJS_CLIENTURL || ""
var notifyEmail = process.env.NOTIFYEMAIL || process.env.OPENSHIFT_NODEJS_NOTIFYEMAIL || "";
var listWebURL = process.env.LISTWEBURL || process.env.OPENSHIFT_NODEJS_LISTWEBURL || ""
var listUser = process.env.LISTUSER || process.env.OPENSHIFT_NODEJS_LISTUSER || ""
var listPass = process.env.LISTPASS || process.env.OPENSHIFT_NODEJS_LISTPASS || ""
var listDomain = process.env.LISTDOMAIN || process.env.OPENSHIFT_NODEJS_LISTDOMAIN || ""
var listParty = process.env.LISTPARTY || process.env.OPENSHIFT_NODEJS_LISTPARTY || ""
var listADFS = process.env.LISTADFS || process.env.OPENSHIFT_NODEJS_LISTADFS || ""
var caEmails = process.env.CAEMAILS
//use to have a .split(' ') on above

console.log(caEmails)


var spr = spauth.getAuth(listWebURL, {
  username: listUser,
  password: listPass,
  domain: listDomain,
  relyingParty: listParty,
  adfsUrl: listADFS
})

async function sendEmails(values) {
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
        var mailingList;
        if (confirmationEmail1 !== "") {
          mailingList = confirmationEmail1
        } else {
          mailingList = values.businessEmail
        }
        var positionEmails;
        if (pEmail === ""){
          //dont think we need  or replace for client email
          positionEmails = "elmsd.webmaster@gov.bc.ca";
        } else {
          positionEmails = "elmsd.webmaster@gov.bc.ca";
        }
        console.log(positionEmails)
        var cNotifyEmail;
        // this should also be provided in the form one email 
        if (notifyEmail === ""){
          cNotifyEmail = caEmails[Number(values._ca)]
        } else {
          cNotifyEmail = notifyEmail
        }
        console.log(values._ca)
        console.log(cNotifyEmail)
             // filter out empty addresses
        // send mail with defined transport object
        //Service provider confirmation
        let message1 = {
          from: 'Access to Technology <donotreply@gov.bc.ca>', // sender address
          to: values.serviceProviderEmail,// list of receivers
          bcc: confirmationBCC,
          subject: "A Access to Technology application has been received - " + values._id, // Subject line
          html: notification.generateProviderIntakeNotification(values) // html body
        };
        //Client email
        let message2 = {
          from: 'Access to Technology <donotreply@gov.bc.ca>', // sender address
          to: values.clientEmail,
          bcc: confirmationBCC,// list of receivers
          subject: "Access to Technology Application - Consent and Agreement", // Subject line
          html: generateHTMLEmail(
            "Access to Technology Application - Consent and Agreement",
            [
              `Hello,`,
              `You are receiving this email as confirmation that ${values.serviceProviderName} has:</p><p>
              <ul>
                <li>Determined that ${values.clientName} needs a laptop computer to participate in the training program described below;</li>
                <li>Determined that ${values.clientName} is eligible to receive a laptop computer from the Access to Technology (“A2T”) program; and</li>
                <li>Electronically submitted an Application and Agreement for ${values.clientName} to the Ministry of Social Development and Poverty Reduction (“MSDPR”), which administers the A2T program.</li>
              </ul>
              `,
              `If you have questions about the A2T program or need help understanding this form, please contact ${values.serviceProviderName}.`,
              `WorkBC is a provincial government service that helps residents of B.C. improve their skills, explore career options, and find employment.`,
            ],
            [
              `COLLECTION NOTICE`,
              `If you did not agree to the below Collection Notice, or you have questions about the collection of your personal information, please contact ${values.serviceProviderName}` ,
              `Personal information collected in this application is collected under the authority of sections 26 (c) and (e) of the Freedom of Information and Protection of Privacy Act and is subject to all the provisions of that Act. The personal information collected will be used by the Ministry of Social Development and Poverty Reduction (“MSDPR”), and its contracted A2T service provider to administer the A2T program, and may also be used to evaluate the effectiveness of the A2T program. If you have any questions about the collection of your personal information, please contact the Records Clerk of the Employment and Labour Market Services Division, MSDPR at WorkBCOESprivacy@gov.bc.ca.`
            ],
            [
              `<b>APPLICANT INFORMATION</b>`,
              `The personal information about ${values.clientName} in this section was entered into this form for you by ${values.serviceProviderName}. If you have concerns about any of the information in this section, please contact ${values.serviceProviderName} to have it corrected.`,
              `<b>Client Application ID:</b>${values._id}`,
              `<b>Client Name:</b> ${values.clientName}`,
              `<b>Phone Number:</b> ${values.clientPhone}`,
              `<b>Email:</b> ${values.clientEmail}`,
              `<b>Shipping Address:</b>${values.altShippingAddress ? (`${values.clientAddress} ${values.clientAddress2} ${values.clientProvince}, ${values.clientPostal} ${values.clientCity}`):(`${strings.orEmpty(values.AddressAlt)} ${values.clientProvince}, ${strings.orEmpty(values.clientPostal)} ${strings.orEmpty(values.clientCity)}`)}`,
              `<b>Eligible Skills Training Program:</b> ${values.fundingSource === 'AEST'? `${strings.orEmpty(values.trainingProgramAEST)}`:`` + `${values.fundingSource}` === 'ISET'? `${strings.orEmpty(values.trainingProgramISET)}`:`` + `${values.fundingSource}` === 'SDPR'? `${strings.orEmpty(trainingProgramSDPR)}` :`` }`,
              `<b>Training Start Date:</b> ${values.periodStart1}`,
              `<b>Training End Date:</b> ${values.periodEnd1}`,
              `<b>CONFIRMATION, CONSENT AND AGREEMENT</b>`,
              `I, ${values.clientName}:</p><p>
                <ol>
                  <li>CONFIRM that I need a laptop computer to participate in and complete the training program described above.</li>
                  <li>CONSENT to SDPR or its contracted A2T service provider collecting my personal information from and disclosing my personal information to ${values.serviceProviderName} for the purposes of administering or evaluating the effectiveness of the A2T program.</li>
                  <li>ACKNOWLEDGE and AGREE that:
                    <ol type="a">
                      <li>My receipt and use of a laptop computer provided to me through the A2T program is dependent on my participation in the training described above;</li>
                      <li>If I complete the training described above to the satisfaction of${values.serviceProviderName} I may keep the laptop computer provided to me through the A2T program;</li>
                      <li>If I do not complete the training above to the satisfaction of ${values.serviceProviderName} I must return the laptop computer, in good working order, to the A2T contractor;</li>
                      <li>I may not and will not use any laptop computer provided to me through the A2T program for the purposes of:
                        <ol type="a">
                          <li>sexual exploitation;</li>
                          <li>promoting hate or discrimination;</li>
                          <li>any other illegal activity; or</li>
                          <li>promoting any illegal activity; and</li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                </ol>
              `,
            ]
          ) // html body
        };      
        let info = transporter.sendMail(message1, (error, info) => {
          if (error) {
            console.log("error:", error);
            console.log("Error sending confirmation for " + values._id)
          } else {
            console.log("Message sent: %s", info.messageId);
          }
        });
        info = transporter.sendMail(message2, (error, info) => {
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

//saving to sharepoint list.
async function saveList(values, email) {
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
          url: listWebURL + 'Apps/WageSubsidy/_api/contextInfo',
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
      // change to local Access to Technology list
      var l = listWebURL + `Apps/WageSubsidy/_api/web/lists/getByTitle('Catchment${values._ca}')/items`
      console.log("webURL:")
      console.log(l)
      return request.post({
        url: l,
        headers: headers,
        json: true,
        body: {
          "__metadata": {
            "type": `SP.Data.Catchment${values._ca}ListItem`
          },
          "Title": `${values.operatingName} - ${values._id}`,
          '_id': values._id,
          '_token': this.state._token,
         ' _bEmailDomain': values._bEmailDomain,
          //step 1
         ' serviceProviderName': values.serviceProviderName,
         ' providerContractId': values.providerContractId,
          'serviceProviderPostal': values.serviceProviderPostal,
          'serviceProviderContact': values.serviceProviderContact,
          'serviceProviderPhone': values.serviceProviderPhone,
          'serviceProviderEmail': values.serviceProviderEmail,
          'fundingSource': values.fundingSource,
          'trainingProgramISET': values.trainingProgramISET,
          'trainingProgramAEST': values.trainingProgramAEST,
          'trainingProgramSDPR': values.trainingProgramSDPR,
          'periodStart1': values.periodStart1,
          'periodEnd1': values.periodEnd1,
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
          'telusInternetForGood': values.telusInternetForGood,
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
      /*
      if (err.statusCode == 403){
        saveList(values)
      }
      */
      return false
    })
  
  //try catch catcher
  } catch (error) {
    console.log(error)
    return false
  }
}

router.get('/', csrfProtection, (req, res) => {
  //saveList()
  
  var token = req.csrfToken()
  res.cookie('XSRF-TOKEN', token)
  res.send({
    csrfToken: token
  });

})

router.post('/', csrfProtection, async (req, res) => {
  //clean the body
  //console.log(req.body)
  clean(req.body);
  ProviderIntakeValidationSchema.validate(req.body, { abortEarly: false })
    .then(async function (value) {
      try {
        await saveProviderIntakeValues(value)
        .then(async r => {
          // {n: 1, ok: 1}
           if (r.result.ok === 1){
              await sendEmails(value)
              .then(async function (sent) {
                console.log("emails Sent: "+ sent);
              })
              res.send({
                ok: "ok"
              })
           }
            //send email
            //send ok response
          console.log(r.result)
        })
      }
      catch (error) {
        console.log(error);
        //send error back, stop submission
      }
    }).catch(function(errors){
      var err = {}
      errors.inner.forEach(e => {
        err[e.path] = e.message
      })
      res.send({
        err
      })
      return      
    })

  }) 
  //clean(req.body);
  //console.log(req.body)
  /*
  ProviderIntakeValidationSchema.validate(req.body, { abortEarly: false })
    .then(async function (value) {

      try {
        await sendEmails(value)
          .then(async function (sent) {
            if (sent){
              var pE = [
                value.position0Email0, value.position0Email1, value.position0Email2, 
                value.position0Email3, value.position0Email4, value.position1Email0, 
                value.position1Email1, value.position1Email2,value.position1Email3].filter(e => e != null);
              for (const email of pE){
                console.log(email)
                await saveList(value,email)
                .then(function(saved){
                  console.log("saved")
                  console.log(saved)
                  // save values to mongo db
                  try {
                    saveProviderIntakeValues(value, email, saved);
                  }
                  catch (error) {
                    console.log(error);
                  }
                })
                .catch(function(e){
                  console.log("error")
                  console.log(e)
                  //save failed one
                  try {
                    saveProviderIntakeValues(value, email, false);
                  }
                  catch (error) {
                    console.log(error);
                  }
                })               
              }
              res.send({
                ok: "ok"
              }) 
            } else if (!sent) {
              res.send({
                emailErr: "emailErr"
              })
            }
          }).catch(function (e) {
            console.log(e)
          })
      } catch (error) {
        console.log(error)
      }
      return
    })
    .catch(function (errors) {
      var err = {}
      errors.inner.forEach(e => {
        err[e.path] = e.message
      })
      res.send({
        err
      })
      return
    })*/
    

module.exports = router;