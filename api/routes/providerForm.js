var express = require('express');
var router = express.Router();
const yup = require('yup')
const yupPhone = require('yup-phone')
var moment = require('moment')

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
var {saveProviderIntakeValues} = require("../utils/mongoOperations");

var confirmationEmail1 = process.env.CONFIRMATIONONE || process.env.OPENSHIFT_NODEJS_CONFIRMATIONONE || "";
var confirmationBCC = process.env.CONFIRMATIONBCC || process.env.OPENSHIFT_NODEJS_CONFIRMATIONBCC || "";
//for backup, TODO
var listEmail = process.env.LISTEMAIL || process.env.OPENSHIFT_NODEJS_LISTEMAIL || "";
//url for images on email, unused in this context
var clientURL = process.env.CLIENTURL || process.env.OPENSHIFT_NODEJS_CLIENTURL || ""
//for internal notifications, unused
var notifyEmail = process.env.NOTIFYEMAIL || process.env.OPENSHIFT_NODEJS_NOTIFYEMAIL || "";
//list protection

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
        // send mail with defined transport object
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
              `<p>You are receiving this email as confirmation that ${values.serviceProviderName} has electronically submitted an Access to Technology (A2T) Application and Agreement on your behalf to the Ministry of Social Development and Poverty Reduction (“MSDPR”), which administers the A2T program to support eligible clients participating in eligible skills training programs.</p>
               <p>If you have questions about the A2T Program, please contact: </p>
              `,
              `<b>Service Provider:</b> ${values.serviceProviderName}`,
              `<b>Staff Name:</b> ${values.serviceProviderContact}`,
              `<b>Contact Email Address:</b> ${values.serviceProviderEmail}`,
              `<b>Contact Phone Number:</b> ${values.serviceProviderPhone}`,
              ,
              `<b>COLLECTION NOTICE</b>`,
              `If you did not agree to the below Collection Notice, or you have questions about the collection of your personal information, please contact ${values.serviceProviderName}.` ,
              ``,
            ],
            [
              `COLLECTION NOTICE`,
              `Personal information collected in this application is collected under the authority of sections 26 (c) and (e) of the Freedom of Information and Protection of Privacy Act and is subject to all the provisions of that Act. The personal information collected will be used by the Ministry of Social Development and Poverty Reduction (“MSDPR”), and its contracted A2T service provider to administer the A2T program, and may also be used to evaluate the effectiveness of the A2T program. If you have any questions about the collection of your personal information, please contact the Records Clerk of the Employment and Labour Market Services Division, MSDPR at WorkBCOESprivacy@gov.bc.ca.`,
              ``,
            ],
            [
              `<b>APPLICANT INFORMATION</b>`,
              `Please review the information in this section and contact ${values.serviceProviderName} if corrections are needed.`,
              `<b>Application ID:</b> ${values._id}`,
              `<b>Shipping Address:</b> ${values.altShippingAddress ? (`${strings.orEmpty(values.addressAlt)} ${strings.orEmpty(values.addressAlt2)},  ${strings.orEmpty(values.cityAlt)}, ${strings.orEmpty(values.provinceAlt)}, ${strings.orEmpty(values.postalAlt)}`):(`${strings.orEmpty(values.clientAddress)} ${strings.orEmpty(values.clientAddress2)}, ${strings.orEmpty(values.clientCity)}, ${strings.orEmpty(values.clientProvince)}, ${strings.orEmpty(values.clientPostal)} `)}`,
              `<b>Phone Number:</b> ${values.clientPhone}`,
              `<b>Eligible Skills Training Program:</b> ${values.trainingProgram} `,
              `<b>Training Program Start Date:</b> ${moment(values.periodStart1).format('MMMM Do YYYY')}`,
              `<b>Training Program End Date:</b> ${moment(values.periodEnd1).format('MMMM Do YYYY')}`,
              `<b>CONFIRMATION, CONSENT AND AGREEMENT</b>`,
              `If you did not agree to the below CONFIRMATION, CONSENT AND AGREEMENT, or you have questions about the terms of this agreement, please contact ${values.serviceProviderName}.`,
              `I, ${values.clientName}:</p><p>
                <ol>
                  <li>CONFIRM that I need a laptop computer to participate in and complete the training program described above.</li>
                  <li>CONSENT to MSDPR or its contracted A2T service provider collecting my personal information from and disclosing my personal information to ${values.serviceProviderName} for the purposes of administering or evaluating the effectiveness of the A2T program.</li>
                  <li>ACKNOWLEDGE and AGREE that:
                    <ol type="a">
                      <li>My receipt and use of a laptop computer provided to me through the A2T program is dependent on my participation in the training described above;</li>
                      <li>If I complete the training described above to the satisfaction of ${values.serviceProviderName} I may keep the laptop computer provided to me through the A2T program;</li>
                      <li>If I do not complete the training above to the satisfaction of ${values.serviceProviderName} I must return the laptop computer, in good working order, to the A2T contractor;</li>
                      <li>I may not and will not use any laptop computer provided to me through the A2T program for the purposes of:
                        <ol type="i">
                          <li>sexual exploitation;</li>
                          <li>promoting hate or discrimination;</li>
                          <li>any other illegal activity; or</li>
                          <li>promoting any illegal activity.</li>
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