var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var SurveyParticipantValidationSchema = require('../schemas/SurveyParticipantValidationSchema')
var clean = require('../utils/clean')
var {getProviderValues, saveProviderSurveyValues} = require("../utils/mongoOperations");

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

 router.get('/getData/:id/', csrfProtection, async(req, res) => {
  console.log(req.params);
  await getProviderValues(req.params).then(function(result) {
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
    SurveyParticipantValidationSchema.validate(req.body, { abortEarly: false })
    .then(async function (value) {
      try {
        await saveProviderSurveyValues(value)
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