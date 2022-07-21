import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
//import cors from 'cors'

const cors = require('cors')
const APP_USER : string = process.env.APP_USER!
const APP_PASS: string = process.env.APP_PASS!
let users : {[k: string] : any} = {}
users[APP_USER] = APP_PASS
console.log('**** users: ', users);

const app = express();
const basicAuth = require('express-basic-auth')
const morgan = require('morgan')
const corsOptions = { origin: "*", "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", preflightContinue: false, "optionsSuccessStatus": 204 }
const viewRouter = require('./routes/view.route')

app.use(morgan('[:date] :method :url :status :res[content-length] - :remote-addr - :response-time ms'));
app.set('trust proxy', 'loopback, linklocal, uniquelocal')

const shouldAuthenticate=(req: express.Request)=>{
  console.log(req.method)
  if(req.method==='OPTIONS')
    return false;
  return true;
}

const basicAuthMiddleware = basicAuth({users});
app.use((req, res, next) => shouldAuthenticate(req) ? basicAuthMiddleware(req, res, next) : next());

app.use(express.json({limit: "6mb"}));
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    "form-action": ["'none'"],
    "style-src": ["'none'"],
    "font-src": ["'none'"]
  }
}))

app.use(cors(corsOptions))
app.options('*', cors())

app.use('/view', viewRouter)

var port = process.env.PORT || '8000';
app.listen( port, () => {
  console.log( `server started at :${ port }` );
} );

module.exports = app;

