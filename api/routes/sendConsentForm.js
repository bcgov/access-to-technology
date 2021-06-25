var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var SendConsentValidationSchema = require('../schemas/SendConsentValidationSchema')
var generateHTMLEmail = require('../utils/htmlEmail')
var clean = require('../utils/clean')
var {saveConsentValues} = require("../utils/mongoOperations");
var nodemailer = require("nodemailer");

// env var info here...
var confirmationBCC = process.env.CONFIRMATIONBCC || process.env.OPENSHIFT_NODEJS_CONFIRMATIONBCC || "";
// send email func
app = express();

// get
router.get('/', csrfProtection, (req, res) => {
  //saveList()
  var token = req.csrfToken()
  res.cookie('XSRF-TOKEN', token)
  res.send({
    csrfToken: token
  });

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
          //Client email
         
          let message2 = {
            from: 'Access to Technology <donotreply@gov.bc.ca>', // sender address
            to: values.clientEmail,
            bcc: confirmationBCC,// list of receivers
            subject: `Consent Required: Access to Technology Application ID #${values._id}`, // Subject line
            html: generateHTMLEmail(
              "Access to Technology Consent and Agreement Required",
              [
                `Hello,<br/>
                <p><b style="color:#FF0000">IMPORTANT</b> A Link to your consent and agreement form is below. Please complete and submit the form for you A2T application to proceed. With out your consent your application will not be completed. <br/></p>`,
                `<a href="https://access-to-technology-dev.apps.silver.devops.gov.bc.ca/clientConsent/${values._id}/${values._token}" style="padding: 8px 12px; bgcolor: #ffffff; background-color: #ffffff; border: 2px solid #294266; border-radius: 2px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #294266 ! important; text-decoration: none; font-weight: bold; display: inline-block;" >Consent and Agreement Form</a>`,
               
              ]
            ) // html body
          };      
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

//post
  router.post('/', csrfProtection, async (req, res) => {
    clean(req.body);
    SendConsentValidationSchema.validate(req.body, { abortEarly: false })
    .then(async function (value) {
      try {
        await saveConsentValues(value)
        .then(async r => {
          // {n: 1, ok: 1}
          if (r.result.ok === 1 && r.result.n === 1){
            await sendEmails(value)
            .then(async function (sent) {
              console.log("emails Sent: "+ sent);
            })
            res.send({
              ok: "ok"
            })
          }
          else{
            res.send({
              err: "Not Found"
            })
          }
            //send ok response
          console.log(r.result);
        })
      }
      catch (error) {
        console.log(error);
        //send error back, stop submission
      }
    }).catch(function(errors){
      console.log(errors)
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