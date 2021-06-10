var pathToRegexp = require('path-to-regexp');
var express = require('express');
var router = express.Router();
const yup = require('yup');

var { check, validationResult, matchedData } = require('express-validator')
var nodemailer = require("nodemailer");
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var spauth = require('node-sp-auth')
var request = require('request-promise')


var ParticipantFormValidationSchema = require('../schemas/ParticipantFormValidationSchema')
var generateHTMLEmail = require('../utils/htmlEmail')
var notification = require('../utils/applicationReceivedEmail');
var clean = require('../utils/clean')
var confirmData = require('../utils/confirmationData');
const { getSubmitted } = require('../utils/confirmationData');
var {saveParticipantValues, getParticipantValues} = require("../utils/mongoOperations");

// env var info here...
var confirmationEmail1 = process.env.CONFIRMATIONONE || process.env.OPENSHIFT_NODEJS_CONFIRMATIONONE || "";
var confirmationEmail2 = process.env.CONFIRMATIONTWO || process.env.OPENSHIFT_NODEJS_CONFIRMATIONTWO || "";
var confirmationBCC = process.env.CONFIRMATIONBCC || process.env.OPENSHIFT_NODEJS_CONFIRMATIONBCC || "";
var listEmail = process.env.LISTEMAIL || process.env.OPENSHIFT_NODEJS_LISTEMAIL || "";
var notifyEmail = process.env.NOTIFYEMAIL || process.env.OPENSHIFT_NODEJS_NOTIFYEMAIL || "";
var clientURL = process.env.CLIENTURL || process.env.OPENSHIFT_NODEJS_CLIENTURL || ""
var listWebURL = process.env.LISTWEBURL || process.env.OPENSHIFT_NODEJS_LISTWEBURL || ""
var listUser = process.env.LISTUSER || process.env.OPENSHIFT_NODEJS_LISTUSER || ""
var listPass = process.env.LISTPASS || process.env.OPENSHIFT_NODEJS_LISTPASS || ""
var listDomain = process.env.LISTDOMAIN || process.env.OPENSHIFT_NODEJS_LISTDOMAIN || ""
var listParty = process.env.LISTPARTY || process.env.OPENSHIFT_NODEJS_LISTPARTY || ""
var listADFS = process.env.LISTADFS || process.env.OPENSHIFT_NODEJS_LISTADFS || ""
// send email func
app = express();
var spr;
spr = spauth.getAuth(listWebURL, {
  username: listUser,
  password: listPass,
  domain: listDomain,
  relyingParty: listParty,
  adfsUrl: listADFS
})

// get
router.get('/', csrfProtection, (req, res) => {
    var token = req.csrfToken()
    res.cookie('XSRF-TOKEN', token)
    res.send({
      csrfToken: token
    });
  })

  async function getItemID(values){
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
            url: listWebURL + '/A2TTest/_api/contextInfo',
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
        //filter by ID and Token to check Consistency
        var l = listWebURL + `/A2TTest/_api/web/lists/getByTitle('IntakeForm')/items?$filter=(applicationID eq '`+values.id+`') and (applicationToken eq '`+values.token+`')`;
        return request.get({
          url: l,
          headers: headers,
          json: true,
        })
      }).then(async response => {
        //return the ID of the item
        return await response.d.results[0];
      })    
      .catch(err => {
        console.log("error in chain")
        //console.log(err);
        console.log("err status code:"+ err.statusCode);
        console.log(err);
        if (err.statusCode !== 403){
          console.log(err);
        }   
        return false
      })
    
    //try catch catcher
    } catch (error) {
      console.log(error)
      return false
    }
  }

 router.get('/getData/:id/:token', csrfProtection, async(req, res) => {
  console.log(req.params);
  await getParticipantValues(req.params).then(function(result) {
    if(result !== undefined){
      res.send({
        serviceProvider: result[0].serviceProviderName,
        clientFirstName: result[0].clientName,
      });
    }else{
      res.send({
        err
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