import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { feedBackClassName, feedBackInvalid } from '../shared/ValidationMessages'
import { EmploymentValidationSchema } from './EmploymentValidationSchema'
import { FORM_URL } from '../../../constants/form'
import { generateAlert } from '../shared/Alert'
import {pathToRegexp} from 'path-to-regexp'



class EmploymentSurvey extends Component {

    constructor() {
        super()
        var key = []
        var re = pathToRegexp('/:id/:token', key)
        var sample = window.location.href.split("/employmentSurvey")[1]
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
            resubmit:false,
            results:[],
            hasError: false,
             _token: token1,      
        }
       
    }

    componentDidMount() {
        fetch(FORM_URL.employmentSurvey, {
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
        fetch(FORM_URL.employmentSurvey+"/getData/"+values._id+"/"+values._token,  {
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
                //set to true to enforces
                this.setState({
                        hasError: false
                })
            }
        ).then(
            (result) => {
            if (Object.getOwnPropertyNames(this.state.results).length > 8){
                var clientData = this.state.results;
                this.setState({
                    clientName:clientData.clientName,
                    clientLastName:clientData.clientLastName,
                    resubmit: clientData.hasOwnProperty("employmentUpdateNeeded"),
                })
            }
            })
    }
  
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.history.push('/thankyouEmploymentSurvey')
    }
   
    handleNotFoundEmployment(errors, touched, values) {
        console.log(values.employmentFound)
        if (values.employmentFound === "no") {
            return (
                <div>
                    <div className="form-group">
                        <label className="col-form-label control-label" htmlFor="employmentStatus">Which of the following best applies to {this.state.clientName}? <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(errors, touched, "employmentStatus")}`}
                                type="radio"
                                name="employmentStatus"
                                value="Self-employed"
                            />
                            <label className="form-check-label" htmlFor="employmentStatusSelf-employed">Self-employed</label>
                        </div>
                        <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(errors, touched, "employmentStatus")}`}
                                type="radio"
                                name="employmentStatus"
                                value="Pursuing additional training"
                            />
                            <label className="form-check-label" htmlFor="employmentStatusPursuingadditionaltraining">Pursuing additional training</label>
                        </div>
                        <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(errors, touched, "employmentStatus")}`}
                                type="radio"
                                name="employmentStatus"
                                value="Volunteering"
                            />
                            <label className="form-check-label" htmlFor="employmentStatusVolunteering">Volunteering</label>
                        </div>
                        <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(errors, touched, "employmentStatus")}`}
                                type="radio"
                                name="employmentStatus"
                                value="Out of work and looking for work"
                            />
                            <label className="form-check-label" htmlFor="employmentStatusOutofworkandlookingforwork">Out of work and looking for work</label>
                        </div>
                        <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(errors, touched, "employmentStatus")}`}
                                type="radio"
                                name="employmentStatus"
                                value="Out of work but not currently looking for work"
                            />
                            <label className="form-check-label" htmlFor="employmentStatusOutofworkbutnotcurrentlylookingforwork">Out of work but not currently looking for work</label>
                        </div>
                        <div className="form-check">
                            <Field
                                className={`form-check-input ${feedBackClassName(errors, touched, "employmentStatus")}`}
                                type="radio"
                                name="employmentStatus"
                                value="Unable to work"
                            />
                            <label className="form-check-label" htmlFor="employmentStatusUnabletowork">Unable to work</label>
                            {feedBackInvalid(errors, touched, "employmentStatus")}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
        
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
        else if( this.state.resubmit === true){
            return (
                <div>
                    <p>Thank You. Your clients Training Completion survey has already been submitted. </p>
                </div>
            )

        } 
        else {
           
            return (<div >
              
              <Form>
              <h2> Access to Technology (A2T) Client Employment Confirmation Survey </h2>
                {/* handleApplicationID handles all the pre populated values in future. <button className="btn btn-success d-print-none" onClick={() => window.print()}>Print Confirmation</button><br /><br />*/}
                
                    <div className="form-group">
                        <h3 id="forms" className="d-print-none">Application ID: {this.state._id}</h3>
                        <div className="form-row">
                            <p className="card-text">Client First Name: {this.state.clientName}</p>
                        </div>
                        <div className="form-row">
                            <p className="card-text">Client Last Name: {this.state.clientLastName}</p>
                        </div>
                    </div>
                    <div className="form-group">
                    <label className="col-form-label control-label" htmlFor="employmentFound">Has {this.state.clientName} found a job since completing their training course?<span
                        style={{ color: "red" }}>*  </span></label>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(errors, touched, "employmentFound")}`}
                            type="radio"
                            name="employmentFound"
                            value="yes"
                        />
                        <label className="form-check-label" htmlFor="employmentFoundYes">Yes</label>
                    </div>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(errors, touched, "employmentFound")}`}
                            type="radio"
                            name="employmentFound"
                            value="no"
                        />
                        <label className="form-check-label" htmlFor="employmentFoundNo">No</label>
                        {feedBackInvalid(errors, touched, "employmentFound")}
                    </div>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(errors, touched, "employmentFound")}`}
                            type="radio"
                            name="employmentFound"
                            value="unknown"
                        />
                        <label className="form-check-label" htmlFor="employmentFoundUnknown">Unknown - unable to contact client</label>
                        {feedBackInvalid(errors, touched, "employmentFound")}
                    </div>
                </div>
                {this.handleNotFoundEmployment(errors, touched, values)}
                   
                                 
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
                                serviceProviderName: this.state.serviceProviderName,
                                clientName: this.state.clientName,
                                clientLastName: this.state.clientLastName,
                                employmentFound:"",
                                employmentStatus:"",
                                serviceProviderEmail: this.state.serviceProviderEmail,
                                clientEmail: this.state.clientEmail,
                            }}
                            enableReinitialize={true}
                            validationSchema={EmploymentValidationSchema}
                            onSubmit={(values,  {resetForm, setErrors, setStatus, setSubmitting }) => {
                                fetch(FORM_URL.employmentSurvey, {
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
                                                this.props.history.push('/thankyouEmploymentSurvey',values)
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
export default withRouter(EmploymentSurvey);