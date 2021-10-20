var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var ServiceProviderSurveyValidationSchema = require('../schemas/ServiceProviderSurveyValidationSchema')
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

 router.get('/getData/:id', csrfProtection, async(req, res) => {
  console.log(req.params);
  console.log("getData was called")
  await getProviderValues(req.params).then(function(result) {
    if(result[0] !== undefined){
      res.send({
        firstName: result[0].firstname,
        userChannelId: result[0].userChannelId,
        cohort: result[0].cohort,
        referral_wid: result[0].referral_wid,
        completed: result[0].completed,

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
    ServiceProviderSurveyValidationSchema.validate(req.body, { abortEarly: false })
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