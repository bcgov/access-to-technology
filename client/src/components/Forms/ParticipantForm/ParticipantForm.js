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
            clientFirstName:'',
            serviceProviderName:'',
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
        console.log("running...")
        fetch(FORM_URL.clientForm+"/getData/"+values._id+"/"+values._token,  {
            credentials: "include",
        }).then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                this.setState({
                    serviceProviderName: result.serviceProvider,
                    clientFirstName: result.clientFirstName
                })

            },
            (error) => {
                console.log(error)
                this.setState({
                    hasError: true
                })
            }
        )
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
                    <p>Please follow the link provided to you in your confirmation email. </p>
                </div>
            )
        } else {
           
            return (<div>
              
              <Form>
                                  
                                <div className="form=row">
                                <p>The Ministry of Social Development and Poverty Reduction has received a request from a service provider.
                                  To process your application for an A2T laptop, you must complete and submit this Client Consent and Agreement.<br/><br/>
                                  Please be aware that delays in submitting your completed Client Consent and Agreement will result in delays in processing your
                                  application and may negatively impact your eligibility to receive an A2T laptop. You are encouraged to complete and submit this form as soon as possible.<br/><br />
                                  If you have questions or require assistance to complete this form, please contact your service provider via the email provided in your previous confirmation email.<br/></p>
                                  </div>
                                  {/* handleApplicationID handles all the pre populated values in future. */}
                                 
                                  <p>Please make sure the Application ID below matches the one provided to you in your confirmation email. If it does not please contact your service provider.</p>
                                      <div className="form-group">
                                      <h3 id="forms">Application ID: {this.state._id}</h3>
                                  </div>
                                 <p> <b>CONFIRMATION, CONSENT AND AGREEMENT</b><br/>
                                    I, {this.state.clientFirstName},</p>
                                    
                                        <ol>
                                        <li>CONFIRM that I need a laptop computer to participate in and complete the training program described in my application.</li>
                                        <li>CONSENT to MSDPR or its contracted A2T service provider collecting my personal information from and disclosing my personal information to the service provider for the purposes of administering or evaluating the effectiveness of the A2T program.</li>
                                        <li>ACKNOWLEDGE and AGREE that:
                                            <ol type="a">
                                            <li>My receipt and use of a laptop computer provided to me through the A2T program is dependent on my participation in the training described in my application;</li>
                                            <li>If I complete the training described in my application to the satisfaction of the service provider I may keep the laptop computer provided to me through the A2T program;</li>
                                            <li>If I do not complete the training specified in my application to the satisfaction of the service provider I must return the laptop computer, in good working order, to the A2T contractor;</li>
                                            <li>I may not and will not use any laptop computer provided to me through the A2T program for the purposes of:
                                                <ol type="i">
                                                <li>sexual exploitation;</li>
                                                <li>promoting hate or discrimination;</li>
                                                <li>any other illegal activity; or</li>
                                                <li>promoting any illegal activity.</li>
                                                </ol>
                                            </li>
                                            </ol>
                                        </li>
                                        </ol>
                                    
                        
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
                                clientConsentDate:new Date(),
                                clientSignature:'',
                                clientConsent:false,
                                serviceProviderName:'',
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