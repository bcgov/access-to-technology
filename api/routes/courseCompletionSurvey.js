var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var ParticipantFormValidationSchema = require('../schemas/ParticipantFormValidationSchema')
var generateHTMLEmail = require('../utils/htmlEmail')
var clean = require('../utils/clean')
var {saveCourseCompletionSurvey, getParticipantValues} = require("../utils/mongoOperations");
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

 router.get('/getData/:id/:token', csrfProtection, async(req, res) => {
  console.log(req.params);
  console.log("getData was called")
  await getParticipantValues(req.params).then(function(result) {
    if(result[0] !== undefined){
      res.send({
        serviceProviderName: result[0].serviceProviderName,
        serviceProviderEmail: result[0].serviceProviderEmail,
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
        await saveCourseCompletionSurvey(value)
        .then(async r => {
          // {n: 1, ok: 1}
          if (r.result.ok === 1 && r.result.n === 1){
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