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

              `<b>COLLECTION ,USE OR DISCLOSURE OF PERSONAL INFORMATION</b>`,
              `Access to Technology (“A2T”) is a Ministry of Social Development and Poverty Reduction (“SDPR“) program that is delivered in part by BC 
               Technology for Learning Society (“BC Tech for Learning”) under a contract with MSDPR.
               <br/><br/>
                MSDPR and the Ministry of Advanced Education, Skills and Training (“AEST”) each provide employment related training programs that are 
                delivered by private sector organizations under contracts with MSDPR (the “SDPR Service Providers”) and AEST (the “AEST Service Providers”), 
                respectively.  Employment and Social Development Canada (“ESDC”) provides the Indigenous Skills and Employment Training Program (“ISET”), 
                which is delivered by private sector organizations under contracts with ESDC (the “ISET Service Providers”).
                <br/><br/>
                The applicant is participating in an employment-related training program delivered by ${values.serviceProviderName}, an ${values.fundingSource} 
                Service Provider. The applicant is applying to SDPR and A2T for a laptop computer that the applicant requires to complete the employment-related training program. 
                ${values.serviceProviderName} is referring the applicant to SDPR and A2T.
                <br/><br/>
                Certain personal information of the applicant is directly related to and necessary for assessing the applicant’s eligibility for A2T, administering A2T with 
                respect to the applicant and evaluating the effectiveness of A2T (the “A2T-Related Personal Information”.  It will be necessary for the following organizations to 
                collect, use and disclose A2T-Related Personal Information:
                <br/>
                <ol style={{listStyleType:"lower-alpha"}}>
                    <li>${values.serviceProviderName}</li>
                    <li>SDPR; and</li>
                    <li>BC Tech for Learning.</li>
                </ol>
              `,

              `<b>APPLICANT CONSENT</b><br/><br/>`,
              `I, ${values.clientName} ${values.clientLastName}, am applying to SDPR and A2T for a laptop computer that I require to complete an ${values.fundingSource} employment-related training program.<br/><br/>
              I CONSENT to:<br/><br/>
                  <ol>
                      <li>SDPR collecting my A2T-Related Personal Information indirectly from ${values.serviceProviderName} or BC Tech for Learning, for the purposes of administering, delivering or evaluating the A2T program;</li>
                      <li>SDPR disclosing my A2T-Related Personal Information to BC Tech for Learning or ${values.serviceProviderName}, for the purposes of administering, delivering or evaluating the A2T program;</li>
                      <li>${values.serviceProviderName} collecting my A2T-Related Personal Information indirectly from SDPR or BC Tech for Learning, for the purposes of administering, delivering or evaluating the A2T program;</li>
                      <li>${values.serviceProviderName} disclosing my A2T-Related Personal Information to SDPR or BC Tech for Learning, for the purposes of administering, delivering or evaluating the A2T program;</li>
                      <li>BC Tech for Learning collecting my A2T-Related Personal Information indirectly from SDPR or ${values.serviceProviderName}, for the purposes of administering, delivering or evaluating the A2T program;</li>
                      <li>BC Tech for Learning disclosing my A2T-Related Personal Information to SDPR or ${values.serviceProviderName}, for the purposes of administering, delivering or evaluating the A2T program;</li>
                  </ol><br/>
              The consents described above are effective on the date I sign this document and expire of the date MSDPR completes an evaluation of the A2T program.<br/><br/>
              Any disclosure of my A2T-Related Personal Information as described above may take place only in Canada.<br/><br/>`,
            ],
            [
              `<b>COLLECTION NOTICE</b>`,
              ` Personal information collected in this application is collected under the authority of sections 26 (c) and (e)
              of the <i>Freedom of Information and Protection of Privacy Act</i> or Parts 3 and 4 of the <i>Personal Information Protection Act</i> and is subject
              to all the provisions of the applicable Act. The personal information collected will be used by the Ministry of Social Development and 
              Poverty Reduction (“MSDPR”), and its contracted A2T service provider to administer the A2T program, and may also be used to evaluate the 
              effectiveness of the A2T program. If you have any questions about the collection of your personal information, please contact the Records 
              Clerk of the Employment and Labour Market Services Division, MSDPR at <a href="mailto:WorkBCOESprivacy@gov.bc.ca">WorkBCOESprivacy@gov.bc.ca</a>.`,
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