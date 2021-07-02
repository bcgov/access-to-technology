var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var ParticipantFormValidationSchema = require('../schemas/ParticipantFormValidationSchema')
var generateHTMLEmail = require('../utils/htmlEmail')
var clean = require('../utils/clean')
var {saveParticipantValues, getParticipantValues} = require("../utils/mongoOperations");
var nodemailer = require("nodemailer");

// env var info here...
var confirmationBCC = process.env.CONFIRMATIONBCC || process.env.OPENSHIFT_NODEJS_CONFIRMATIONBCC || "";
// send email func
app = express();

// get
router.get('/', csrfProtection, (req, res) => {
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
          //Service provider Know Consent was received confirmation
          let message1 = {
            from: 'Access to Technology <donotreply@gov.bc.ca>', // sender address
            to: values.serviceProviderEmail,// list of receivers
            bcc: confirmationBCC,
            subject: "Access to Technology Consent Received - Application ID #" + values._id, // Subject line
            html:generateHTMLEmail(
              "<b style='color:#FF0000'>Action Required:</b> Access to Technology - Client Consent and Agreement Form",
              [
                `Hello,<br/>
                <p>You are receiving this email as confirmation that the below client has electronically submitted a Client Consent and Agreement form:<br/>`,
                `Application ID: ${values._id}`,
                `Client Full Name:  ${values.clientName} ${values.clientLastName}`,
                `<p>Click below to complete an A2T application for the individual identified above:</p>`,
                `<a href="https://access-to-technology-dev.apps.silver.devops.gov.bc.ca/providerIntake/${values._id}/${values._token}" style="padding: 8px 12px; bgcolor: #ffffff; background-color: #ffffff; border: 2px solid #294266; border-radius: 2px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: #294266 ! important; text-decoration: none; font-weight: bold; display: inline-block;" >Application Form</a>`,
  
              ],)
              
               // html body
          };
          //Client email
         
          let message2 = {
            from: 'Access to Technology <donotreply@gov.bc.ca>', // sender address
            to: values.clientEmail,
            bcc: confirmationBCC,// list of receivers
            subject: `Access to Technology Consent Received - Application ID #${values._id}`, // Subject line
            html: generateHTMLEmail(
              "Access to Technology - Client Consent and Agreement",
              [
                `Hello ${values.clientName},<br/>
                <p>You are receiving this email as confirmation that your Client Consent and Agreement form has been received. A copy of this form is included below for your records.<br/>`,
  
                `<b>COLLECTION ,USE OR DISCLOSURE OF PERSONAL INFORMATION</b>`,
                `Access to Technology (“A2T”) is a Ministry of Social Development and Poverty Reduction (“SDPR“) program that is delivered in part by BC 
                 Technology for Learning Society (“BC Tech for Learning”) under a contract with SDPR.
                 <br/><br/>
                  SDPR and the Ministry of Advanced Education, Skills and Training (“AEST”) each provide employment related training programs that are 
                  delivered by private sector organizations under contracts with SDPR (the “SDPR Service Providers”) and AEST (the “AEST Service Providers”), 
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
  
                `<b>APPLICANT CONSENT</b><br/>`,
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
                The consents described above are effective on the date I sign this document and expire of the date SDPR completes an evaluation of the A2T program.<br/><br/>
                Any disclosure of my A2T-Related Personal Information as described above may take place only in Canada.<br/><br/>`,
              ],
              [
                `<b>COLLECTION NOTICE</b>`,
                ` Personal information collected in this application is collected under the authority of sections 26 (c) and (e)
                of the <i>Freedom of Information and Protection of Privacy Act</i> or Parts 3 and 4 of the <i>Personal Information Protection Act</i> and is subject
                to all the provisions of the applicable Act. The personal information collected will be used by the Ministry of Social Development and 
                Poverty Reduction (“SDPR”), and its contracted A2T service provider to administer the A2T program, and may also be used to evaluate the 
                effectiveness of the A2T program. If you have any questions about the collection of your personal information, please contact the Records 
                Clerk of the Employment and Labour Market Services Division, SDPR at <a href="mailto:WorkBCOESprivacy@gov.bc.ca">WorkBCOESprivacy@gov.bc.ca</a>.`,
                `<b>Terms and Conditions</b>
                  I have reviewed and agree to all below-noted terms and conditions:
                          <ol style={{listStyleType:"lower-alpha"}}>
                          <li >My receipt and use of a laptop computer provided to me through the A2T program is dependent on my participation in the training described in my A2T application;</li>
                          <li >If I complete the training described in my application to the satisfaction of ${values.serviceProviderName} I may keep the laptop computer provided to me through the A2T program;</li>
                          <li >If I do not complete the training described in my A2T application to the satisfaction of ${values.serviceProviderName} I must return the laptop computer, in good working order, to the A2T contractor;</li>
                          <li>I may not and will not use any laptop computer provided to me through the A2T program for the purposes of:</li>
                          <ol style={{listStyleType:"lower-roman"}}>
                              <li> sexual exploitation;</li>
                                  <li>promoting hate or discrimination; </li>
                                  <li>any other illegal activity; or</li>
                                  <li>promoting any illegal activity.</li>
                              </ol>
                          </ol>`,
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

 router.get('/getData/:id/:token', csrfProtection, async(req, res) => {
  console.log(req.params);
  await getParticipantValues(req.params).then(function(result) {
    if(result[0] !== undefined){
      res.send({
        serviceProvider: result[0].serviceProviderName,
        clientName: result[0].clientName,
        clientLastName: result[0].clientLastName,
        fundingSource: result[0].fundingSource,
        serviceProviderEmail: result[0].serviceProviderEmail,
        clientEmail:result[0].clientEmail,
        results: result[0],

      });
    }else{
      res.send({
        err: "Not Found"
      });
    }
 });
})

//post
  router.post('/', csrfProtection, async (req, res) => {
    clean(req.body);
    ParticipantFormValidationSchema.validate(req.body, { abortEarly: false })
    .then(async function (value) {
      try {
        await saveParticipantValues(value)
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