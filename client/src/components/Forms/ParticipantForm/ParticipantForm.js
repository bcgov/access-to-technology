import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { feedBackClassName, feedBackInvalid } from '../shared/ValidationMessages'
import CollectionNotice from './CollectionNotice'
import { ParticipantValidationSchema } from './ParticipantValidationSchema'
import { FORM_URL } from '../../../constants/form'
import moment from 'moment'
import { generateAlert } from '../shared/Alert'
import {pathToRegexp} from 'path-to-regexp'


class ParticipantForm extends Component {

    constructor() {
        super()
        var key = []
        var re = pathToRegexp('/:id/:token', key)
        var sample = window.location.href.split("/clientConsent")[1]
        var content = re.exec(sample) //[/id/token/, id, token]]
        var id = content[1];
        var token1 = content[2];
        this.state = {
            _csrf: '',
            _id: id,
            clientName:'',
            clientLastName:'',
            clientEmail:'',
            fundingSource:'',
            serviceProviderName:'',
            serviceProviderEmail:'',
            clientSignature:'',
            clientConsent:false,
            clientConsentDate: new Date(),
            results:[],
            hasError: false,
             _token: token1,      
        }
       
    }

    componentDidMount() {
        fetch(FORM_URL.clientForm, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(
                (result) => {
                   console.log(result)
                    this.setState({
                        _csrf: result.csrfToken,
                    })
                },
                (error) => {
                    console.log(error)
                    this.setState({
                        hasError: true
                    })
                }
            )
        this.getContext(this.state)
    }

    getContext(values){
        fetch(FORM_URL.clientForm+"/getData/"+values._id+"/"+values._token,  {
            credentials: "include",
        }).then(res => res.json())
        .then(
            (result) => {
                if(result.err === "Not Found"){
                    this.setState({
                        hasError: true
                    })
                }else{
                    this.setState({
                        serviceProviderName: result.serviceProvider,
                        fundingSource: result.fundingSource,
                        serviceProviderEmail: result.serviceProviderEmail,
                        clientEmail: result.clientEmail,
                        results:result.results,
                    })
                }
            },
            (error) => {
                console.log(error)
                this.setState({
                        hasError: true
                })
            }
        ).then(
            (result) => {
            if (Object.getOwnPropertyNames(this.state.results).length > 8){
                console.log(result)
                var clientData = this.state.results;
                this.setState({
                    clientName:clientData.clientName,
                    clientLastName:clientData.clientLastName,
                    clientSignature:clientData.clientSignature,
                    clientConsent:clientData.clientConsent,
                    clientConsentDate: clientData.clientConsentDate,
                })
            }
            })
    }
  
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.history.push('/thankyouParticipant')
    }
  
    handleApplicationId( values, errors, touched, isSubmitting) {
        if (this.state._id === "" || this.state._id.length !== 10 ||this.state._token === "" || this.state._token.length !== 25 ) {
            //show non id/token handler
            return (
                <div>
                    <p>Please follow the link provided to you in your confirmation email.</p>
                </div>
            )
        } else if( this.state.hasError === true){
            return (
                <div>
                    <p>Your link may not be active yet, please check back in 5 - 10 minutes </p>
                </div>
            )

        } 
        else if (this.state.clientConsent === true){
            return(<div>
                <h2> Access to Technology (A2T) Client Consent and Agreement Form </h2> 
                                    {/* handleApplicationID handles all the pre populated values in future. <button className="btn btn-success d-print-none" onClick={() => window.print()}>Print Confirmation</button><br /><br />*/}
                                   
                                        <div className="form-group">
                                        <h3 id="forms" className="d-print-none">Application ID: {this.state._id}</h3>
                                        <div className="form-row">
                                            <p className="d-print-none">To export this consent form you may click the "print" button below.</p>
                                        </div>
                                        <div className="form-row">
                                            <button className="btn btn-success d-print-none" onClick={() => window.print()}>Print Confirmation</button>
                                        </div>
                                    </div>
                                    <p><b>COLLECTION, USE OR DISCLOSURE OF PERSONAL INFORMATION</b><br/><br/>
                                    Access to Technology (“A2T”) is a Ministry of Social Development and Poverty Reduction (“SDPR“) program that is delivered in part by BC 
                                    Technology for Learning Society (“BC Tech for Learning”) under a contract with SDPR.
                                    <br/><br/>
                                      SDPR and the Ministry of Advanced Education, Skills and Training (“AEST”) each provide employment related training programs that are 
                                      delivered by private sector organizations under contracts with SDPR (the “SDPR Service Providers”) and AEST (the “AEST Service Providers”), 
                                      respectively.  Employment and Social Development Canada (“ESDC”) provides the Indigenous Skills and Employment Training Program (“ISET”), 
                                      which is delivered by private sector organizations under contracts with ESDC (the “ISET Service Providers”).
                                      <br/><br/>
                                      The applicant is participating in an employment-related training program delivered by {this.state.serviceProviderName}, an {this.state.fundingSource} 
                                      Service Provider. The applicant is applying to SDPR and A2T for a laptop computer that the applicant requires to complete the employment-related training program. 
                                      {this.state.serviceProviderName} is referring the applicant to SDPR and A2T.
                                      <br/><br/>
                                      Certain personal information of the applicant is directly related to and necessary for assessing the applicant’s eligibility for A2T, administering A2T with 
                                      respect to the applicant and evaluating the effectiveness of A2T (the “A2T-Related Personal Information”.  It will be necessary for the following organizations to 
                                      collect, use and disclose A2T-Related Personal Information:
                                      <br/>
                                      <ol style={{listStyleType:"lower-alpha"}}>
                                          <li>{this.state.serviceProviderName}</li>
                                          <li>SDPR; and</li>
                                          <li>BC Tech for Learning.</li>
                                      </ol>
                                    </p>
                                   <p><b>APPLICANT CONSENT</b><br/><br/>
                                      I, {this.state.clientName} {this.state.clientLastName}, am applying to SDPR and A2T for a laptop computer that I require to complete an {this.state.fundingSource} employment-related training program.</p>
                                      <p>I CONSENT to:</p>
                                          <ol>
                                              <li>SDPR collecting my A2T-Related Personal Information indirectly from {this.state.serviceProviderName} or BC Tech for Learning, for the purposes of administering, delivering or evaluating the A2T program;</li>
                                              <li>SDPR disclosing my A2T-Related Personal Information to BC Tech for Learning or {this.state.serviceProviderName}, for the purposes of administering, delivering or evaluating the A2T program;</li>
                                              <li>{this.state.serviceProviderName} collecting my A2T-Related Personal Information indirectly from SDPR or BC Tech for Learning, for the purposes of administering, delivering or evaluating the A2T program;</li>
                                              <li>{this.state.serviceProviderName} disclosing my A2T-Related Personal Information to SDPR or BC Tech for Learning, for the purposes of administering, delivering or evaluating the A2T program;</li>
                                              <li>BC Tech for Learning collecting my A2T-Related Personal Information indirectly from SDPR or {this.state.serviceProviderName}, for the purposes of administering, delivering or evaluating the A2T program;</li>
                                              <li>BC Tech for Learning disclosing my A2T-Related Personal Information to SDPR or {this.state.serviceProviderName}, for the purposes of administering, delivering or evaluating the A2T program;</li>
                                          </ol>
                                      <p>The consents described above are effective on the date I sign this document and expire of the date SDPR completes an evaluation of the A2T program.</p>
                                      <p>Any disclosure of my A2T-Related Personal Information as described above may take place only in Canada.</p>
                                   
                                    <div className="row" style={{ marginTop: '2em' }}>
                                    <div className="col-md-12">
                                        <h4>Terms and Conditions</h4>
                                        <p className="small">
                                        I have reviewed and agree to all below-noted terms and conditions:
                                                <ol style={{listStyleType:"lower-alpha"}}>
                                                <li >My receipt and use of a laptop computer provided to me through the A2T program is dependent on my participation in the training described in my A2T application;</li>
                                                <li >If I complete the training described in my application to the satisfaction of {this.state.serviceProviderName} I may keep the laptop computer provided to me through the A2T program;</li>
                                                <li >If I do not complete the training described in my A2T application to the satisfaction of {this.state.serviceProviderName} I must return the laptop computer, in good working order, to the A2T contractor;</li>
                                                <li>I may not and will not use any laptop computer provided to me through the A2T program for the purposes of:</li>
                                                <ol style={{listStyleType:"lower-roman"}}>
                                                    <li> sexual exploitation;</li>
                                                        <li>promoting hate or discrimination; </li>
                                                        <li>any other illegal activity; or</li>
                                                        <li>promoting any illegal activity.</li>
                                                    </ol>
                                                </ol>   
                                            </p>
                                        </div>
                                    </div>      
                              
                                    <CollectionNotice />

                                    <div className="form-row">
  
                                    <div className="form-group col-md-8">
                                    <label className="col-form-label control-label" htmlFor="clientSignature">Please enter your full name <span
                                            style={{ color: "red" }}>*</span></label>
                                        <input className={`form-control ${feedBackClassName(errors, touched, "clientSignature")}`}  readOnly value={this.state.clientSignature} id="clientSignature" name="clientSignature" />
                                    </div>
                                    
                                    <div className="form-group col-md-4">
                                        <label className="col-form-label control-label" htmlFor="clientConsentDate">Date of Signature</label>
                                        <p>{String(moment(this.state.clientConsentDate).format('MMMM Do YYYY'))}</p>
                                        
                                     </div>
                                </div>
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input type="checkbox" className={`form-check-input ${feedBackClassName(errors, touched, "clientConsent")}`} readOnly id="clientConsent"
                                                name="clientConsent" checked={this.state.clientConsent}/>
                                            <label className="form-check-label control-label" htmlFor="clientConsent"><span style={{ color: "red" }}>*</span> I acknowledge and
                                            understand that by clicking the "submit" icon, I am attaching my electronic signature to this form, and that
                                            by doing so, I am providing the same consent as I would by manually signing a physical copy of this
                                            form.
                                            </label>
                                            {feedBackInvalid(errors, touched, "clientConsent")}
                                        </div>
                                    </div>
                  
              </div>)
        }
        else {
           
            return (<div>
              
              <Form>
              <h2> Access to Technology (A2T) Client Consent Form </h2> 
                                  {/* handleApplicationID handles all the pre populated values in future. <button className="btn btn-success d-print-none" onClick={() => window.print()}>Print Confirmation</button><br /><br />*/}
                                      <div className="form-group">
                                      
                                      <h3 id="forms">Application ID: {this.state._id}</h3>
                                      <div className="form-row">
                                          <p> Please enter your first and last name and then review the information in the consent form below.</p>
                                        </div>
                                      <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label className="col-form-label control-label" htmlFor="clientName">Client First Name <span
                                                style={{ color: "red" }}>*</span></label>
                                            <Field className={`form-control ${feedBackClassName(errors, touched, "clientName")}`} id="clientName" name="clientName" />
                                            {feedBackInvalid(errors,touched,"clientName")}
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label className="col-form-label control-label" htmlFor="clientLastName">Client Last Name <span
                                                style={{ color: "red" }}>*</span></label>
                                            <Field className={`form-control ${feedBackClassName(errors, touched, "clientLastName")}`} id="clientLastName" name="clientLastName" />
                                            {feedBackInvalid(errors,touched,"clientLastName")}
                                        </div>
                                      </div>
                                  </div>
                                  <p><b>COLLECTION, USE OR DISCLOSURE OF PERSONAL INFORMATION</b><br/><br/>
                                  Access to Technology (“A2T”) is a Ministry of Social Development and Poverty Reduction (“SDPR“) program that is delivered in part by BC 
                                  Technology for Learning Society (“BC Tech for Learning”) under a contract with SDPR.
                                  <br/><br/>
                                    SDPR and the Ministry of Advanced Education, Skills and Training (“AEST”) each provide employment related training programs that are 
                                    delivered by private sector organizations under contracts with SDPR (the “SDPR Service Providers”) and AEST (the “AEST Service Providers”), 
                                    respectively.  Employment and Social Development Canada (“ESDC”) provides the Indigenous Skills and Employment Training Program (“ISET”), 
                                    which is delivered by private sector organizations under contracts with ESDC (the “ISET Service Providers”).
                                    <br/><br/>
                                    The applicant is participating in an employment-related training program delivered by {this.state.serviceProviderName}, an {this.state.fundingSource} 
                                    Service Provider. The applicant is applying to SDPR and A2T for a laptop computer that the applicant requires to complete the employment-related training program. 
                                    {this.state.serviceProviderName} is referring the applicant to SDPR and A2T.
                                    <br/><br/>
                                    Certain personal information of the applicant is directly related to and necessary for assessing the applicant’s eligibility for A2T, administering A2T with 
                                    respect to the applicant and evaluating the effectiveness of A2T (the “A2T-Related Personal Information”.  It will be necessary for the following organizations to 
                                    collect, use and disclose A2T-Related Personal Information:
                                    <br/>
                                    <ol style={{listStyleType:"lower-alpha"}}>
                                        <li>{this.state.serviceProviderName}</li>
                                        <li>SDPR; and</li>
                                        <li>BC Tech for Learning.</li>
                                    </ol>
                                  </p>
                                 <p><b>APPLICANT CONSENT</b><br/><br/>
                                    I, {values.clientName} {values.clientLastName}, am applying to SDPR and A2T for a laptop computer that I require to complete an {this.state.fundingSource} employment-related training program.</p>
                                    <p>I CONSENT to:</p>
                                        <ol>
                                            <li>SDPR collecting my A2T-Related Personal Information indirectly from {this.state.serviceProviderName} or BC Tech for Learning, for the purposes of administering, delivering or evaluating the A2T program;</li>
                                            <li>SDPR disclosing my A2T-Related Personal Information to BC Tech for Learning or {this.state.serviceProviderName}, for the purposes of administering, delivering or evaluating the A2T program;</li>
                                            <li>{this.state.serviceProviderName} collecting my A2T-Related Personal Information indirectly from SDPR or BC Tech for Learning, for the purposes of administering, delivering or evaluating the A2T program;</li>
                                            <li>{this.state.serviceProviderName} disclosing my A2T-Related Personal Information to SDPR or BC Tech for Learning, for the purposes of administering, delivering or evaluating the A2T program;</li>
                                            <li>BC Tech for Learning collecting my A2T-Related Personal Information indirectly from SDPR or {this.state.serviceProviderName}, for the purposes of administering, delivering or evaluating the A2T program;</li>
                                            <li>BC Tech for Learning disclosing my A2T-Related Personal Information to SDPR or {this.state.serviceProviderName}, for the purposes of administering, delivering or evaluating the A2T program;</li>
                                        </ol>
                                    <p>The consents described above are effective on the date I sign this document and expire of the date SDPR completes an evaluation of the A2T program.</p>
                                    <p>Any disclosure of my A2T-Related Personal Information as described above may take place only in Canada.</p>
                                 

                                  <div className="row" style={{ marginTop: '2em' }}>
                                    <div className="col-md-12">
                                        <h4>Terms and Conditions</h4>
                                        <p className="small">
                                        I have reviewed and agree to all below-noted terms and conditions:
                                                <ol style={{listStyleType:"lower-alpha"}}>
                                                <li >My receipt and use of a laptop computer provided to me through the A2T program is dependent on my participation in the training described in my A2T application;</li>
                                                <li >If I complete the training described in my application to the satisfaction of {this.state.serviceProviderName} I may keep the laptop computer provided to me through the A2T program;</li>
                                                <li >If I do not complete the training described in my A2T application to the satisfaction of {this.state.serviceProviderName} I must return the laptop computer, in good working order, to the A2T contractor;</li>
                                                <li>I may not and will not use any laptop computer provided to me through the A2T program for the purposes of:</li>
                                                <ol style={{listStyleType:"lower-roman"}}>
                                                    <li> sexual exploitation;</li>
                                                        <li>promoting hate or discrimination; </li>
                                                        <li>any other illegal activity; or</li>
                                                        <li>promoting any illegal activity.</li>
                                                    </ol>
                                                </ol>   
                                            </p>
                                        </div>
                                    </div>     
                                    <CollectionNotice />

                                  <div className="form-row">
                                  <div className="form-group col-md-8">
                                  <label className="col-form-label control-label" htmlFor="clientSignature">Please enter your full name <span
                                          style={{ color: "red" }}>*</span></label>
                                      <Field className={`form-control ${feedBackClassName(errors, touched, "clientSignature")}`} id="clientSignature" name="clientSignature" />
                                      {feedBackInvalid(errors,touched,"clientSignature")}
                                  </div>
                                  
                                  <div className="form-group col-md-4">
                                      <label className="col-form-label control-label" htmlFor="clientConsentDate">Date of Signature</label>
                                      <p>{String(moment(this.state.clientConsentDate).format('MMMM Do YYYY'))}</p>
                                      
                                   </div>
                              </div>
                                  <div className="form-group">
                                      <div className="form-check">
                                          <Field type="checkbox" className={`form-check-input ${feedBackClassName(errors, touched, "clientConsent")}`} id="clientConsent"
                                              name="clientConsent" />
                                          <label className="form-check-label control-label" htmlFor="clientConsent"><span style={{ color: "red" }}>*</span> I acknowledge and
                                          understand that by clicking the "submit" icon, I am attaching my electronic signature to this form, and that
                                          by doing so, I am providing the same consent as I would by manually signing a physical copy of this
                                          form.
                                          </label>
                                          {feedBackInvalid(errors, touched, "clientConsent")}
                                      </div>
                                  </div>
                                 
                                  <button
                                      className="btn btn-success btn-block"
                                      type="submit"
                                      style={{ marginBottom: "2rem" }}
                                      disabled={isSubmitting || this.state.hasError}
                                  >
                                      {
                                          isSubmitting ?
                                              <div>
                                                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                     Submitting...
                                              </div>
                                              :
                                              "Submit"

                                      }
                                  </button>
                              </Form>
                
            </div>
            )
        }
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        
                    {this.state.hasError && (
                            generateAlert("alert-danger", "An error has occurred, please refresh the page. If the error persists, please try again later.")
                        )} 
                        <Formik
                            initialValues={{
                                _csrf: this.state._csrf,
                                _id: (typeof this.props.match.params.id !== 'undefined') ? this.props.match.params.id : '',
                                _token: this.state._token,
                                clientConsentDate:this.state.clientConsentDate,
                                clientSignature:this.state.clientSignature,
                                clientConsent:this.state.clientConsent,
                                serviceProviderName: this.state.serviceProviderName,
                                clientName: this.state.clientName,
                                clientLastName: this.state.clientLastName,
                                fundingSource: this.state.fundingSource,
                                serviceProviderEmail: this.state.serviceProviderEmail,
                                clientEmail: this.state.clientEmail,
                            }}
                            enableReinitialize={true}
                            validationSchema={ParticipantValidationSchema}
                            onSubmit={(values,  {resetForm, setErrors, setStatus, setSubmitting }) => {
                                fetch(FORM_URL.clientForm, {
                                    method: "POST",
                                    credentials: "include",
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(values),
                                })
                                    .then(res => res.json())
                                    .then((
                                        resp => {
                                            console.log(resp)
                                            if (resp.err) {
                                                console.log(resp.err)
                                                alert("There has been an error submitting your consent, please contact your service Provider.")
                                                setSubmitting(false)
                                                setErrors(resp.err)

                                            } else if (resp.emailErr) {
                                                setSubmitting(false)
                                                this.setState({
                                                    hasError: true
                                                })
                                                alert("There has been an error submitting your consent please contact your service Provider")
                                            }
                                            else if (resp.ok) {
                                                setSubmitting(false);
                                                this.props.history.push('/thankyouParticipant',values)
                                            }
                                        }
                                    ));
                            }}
                        >
                            {({ values, errors, touched, isSubmitting }) => (
                                <div>
                                 {this.handleApplicationId( values, errors, touched, isSubmitting)}
                                </div>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(ParticipantForm);