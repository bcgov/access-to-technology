var express = require('express');
var router = express.Router();
var moment = require('moment')

var nodemailer = require("nodemailer");
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

var ProviderIntakeValidationSchema = require('../schemas/ProviderIntakeValidationSchema')
var generateHTMLEmail = require('../utils/htmlEmail')
var notification = require('../utils/applicationReceivedEmail');
var clean = require('../utils/clean')
var strings = require("../utils/strings")
var {saveProviderIntakeValues} = require("../utils/mongoOperations");

var confirmationBCC = process.env.CONFIRMATIONBCC || process.env.OPENSHIFT_NODEJS_CONFIRMATIONBCC || "";
//for backup, TODO

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
        //Service provider confirmation
        let message1 = {
          from: 'Access to Technology <donotreply@gov.bc.ca>', // sender address
          to: values.serviceProviderEmail,// list of receivers
          bcc: confirmationBCC,
          subject: "Confirmation: Access to Technology Application ID #" + values._id, // Subject line
          html: notification.generateProviderIntakeNotification(values) // html body
        };
        //Client email
        let message2 = {
          from: 'Access to Technology <donotreply@gov.bc.ca>', // sender address
          to: values.clientEmail,
          bcc: confirmationBCC,// list of receivers
          subject: `Confirmation: Access to Technology Application ID #${values._id}`, // Subject line
          html: generateHTMLEmail(
            "Access to Technology Application",
            [
              `Hello ${values.clientName},`,
              `<p>You are receiving this email as confirmation that ${values.serviceProviderName} has electronically submitted an Access to Technology (A2T) Application on your behalf to the Ministry of Social Development and Poverty Reduction (“MSDPR”), which administers the A2T program to support eligible clients participating in eligible skills training programs.<br/><br/>
              <b style="color:#FF0000">IMPORTANT</b>: to complete your application, you must visit the link below to provide your consent and complete the agreement.  Without your consent and agreement, the application cannot be processed.</p>`,
              `<a href="https://access-to-technology-dev.apps.silver.devops.gov.bc.ca/clientConsent/${values._id}/${values._token}" style="padding: 8px 12px; bgcolor: #ffffff; background-color: #ffffff; border: 2px solid #294266; border-radius: 2px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #294266 ! important; text-decoration: none; font-weight: bold; display: inline-block;" >Consent and Agreement Form</a>`,
              
              `<p>A copy of your application information is included below for your records. Please review this information and contact your Service Provider if you have questions and/or if any of the information is not correct:</p>`,
              `<b>Service Provider:</b> ${values.serviceProviderName}`,
              `<b>Staff Name:</b> ${values.serviceProviderContact}`,
              `<b>Contact Email Address:</b> ${values.serviceProviderEmail}`,
              `<b>Contact Phone Number:</b> ${values.serviceProviderPhone}<br/><br/>`,
              `<b>APPLICANT INFORMATION</b>`,
              `<b>Application ID:</b> ${values._id}`,
              `<b>Shipping Address:</b> ${values.altShippingAddress ? (`${strings.orEmpty(values.recipientName)}, ${strings.orEmpty(values.clientAddress)} ${strings.orEmpty(values.clientAddress2)}, ${strings.orEmpty(values.clientCity)}, ${strings.orEmpty(values.clientProvince)}, ${strings.orEmpty(values.clientPostal)}`):(`${strings.orEmpty(values.clientAddress)} ${strings.orEmpty(values.clientAddress2)}, ${strings.orEmpty(values.clientCity)}, ${strings.orEmpty(values.clientProvince)}, ${strings.orEmpty(values.clientPostal)} `)}`,
              `<b>Phone Number:</b> ${values.clientPhone}`,
              `<b>Eligible Skills Training Program:</b> ${values.trainingProgram} `,
              `<b>Training Program Start Date:</b> ${moment(values.periodStart1).format('MMMM Do YYYY')}`,
              `<b>Training Program End Date:</b> ${moment(values.periodEnd1).format('MMMM Do YYYY')}<br/><br/>`,
            ],
            
            []
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
    

module.exports = router;