var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var ParticipantFormValidationSchema = require('../schemas/ParticipantFormValidationSchema')
var clean = require('../utils/clean')
var {saveParticipantValues, getParticipantValues} = require("../utils/mongoOperations");

// env var info here...
var listWebURL = process.env.LISTWEBURL || process.env.OPENSHIFT_NODEJS_LISTWEBURL || ""
var listUser = process.env.LISTUSER || process.env.OPENSHIFT_NODEJS_LISTUSER || ""
var listPass = process.env.LISTPASS || process.env.OPENSHIFT_NODEJS_LISTPASS || ""
var listDomain = process.env.LISTDOMAIN || process.env.OPENSHIFT_NODEJS_LISTDOMAIN || ""
var listParty = process.env.LISTPARTY || process.env.OPENSHIFT_NODEJS_LISTPARTY || ""
var listADFS = process.env.LISTADFS || process.env.OPENSHIFT_NODEJS_LISTADFS || ""
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
  await getParticipantValues(req.params).then(function(result) {
    if(result[0] !== undefined){
      res.send({
        serviceProvider: result[0].serviceProviderName,
        clientFirstName: result[0].clientName,
        clientLastName: result[0].clientLastName,
        fundingSource: result[0].fundingSource,
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
            console.log("success");
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
      res.send({
        ok: "ok"
      })
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