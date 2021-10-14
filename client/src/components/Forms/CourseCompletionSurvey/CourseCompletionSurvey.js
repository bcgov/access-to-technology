import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { feedBackClassName, feedBackInvalid } from '../shared/ValidationMessages'
import { CourseCompletionValidationSchema } from './CourseCompletionValidationSchema'
import { FORM_URL } from '../../../constants/form'
import { generateAlert } from '../shared/Alert'
import {pathToRegexp} from 'path-to-regexp'



class CourseCompletionSurvey extends Component {

    constructor() {
        super()
        var key = []
        var re = pathToRegexp('/:id/:token', key)
        var sample = window.location.href.split("/courseCompletionSurvey")[1]
        var content = re.exec(sample) //[/id/token/, id, token]]
        var id = content[1];
        var token1 = content[2];
        this.state = {
            _csrf: '',
            _id: id,
            clientName:'',
            clientLastName:'',
            clientEmail:'',
            serviceProviderName:'',
            serviceProviderEmail:'',
            resubmit:'false',
            clientSignature:'',
            clientConsent:false,
            clientConsentDate: new Date(),
            results:[],
            hasError: false,
             _token: token1,      
        }
       
    }

    componentDidMount() {
        fetch(FORM_URL.courseCompletionSurvey, {
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
                    console.log(error);
                    this.setState({
                        hasError: true
                    })
                }
            )
        this.getContext(this.state);
    }

    getContext(values){
        fetch(FORM_URL.courseCompletionSurvey+"/getData/"+values._id+"/"+values._token,  {
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
                        serviceProviderEmail: result.serviceProviderEmail,
                        results:result.results,
                    })
                }
            },
            (error) => {
                console.log(error);
                //set to true to enforces
                this.setState({
                        hasError: false
                })
            }
        ).then(
            (result) => {
            if (Object.getOwnPropertyNames(this.state.results).length > 8){
                console.log(result)
                var clientData = this.state.results;
                this.setState({
                    clientName: clientData.clientName,
                    clientLastName: clientData.clientLastName,
                    resubmit: 'courseCompletionUpdateNeeded' in clientData,
                })
            }
            })
    }
  
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.history.push('/thankyouCourseCompletion')
    }
    fetchNotice(values){
        if(values.minimallyCompleted === "no"){
            return(<div className="form-group">
                        <label><b>Note:</b> Please speak to {this.state.clientName} about
                            returning the laptop. A return shipping label is in the
                            information shipped with the laptop. If the shipping
                            label has been lost, refer to the A2T Service Provider
                            Guide FAQs on how {this.state.clientName} can get another
                            return shipping label. To protect privacy, data will be
                            wiped from the returned laptops.</label>
            </div>);
        }
        else{
            return (<div></div>);
        }
    }
    handleCompletedTraining(errors, touched, values) {
        console.log(values.completedTraining)
        if (values.completedTraining === "no") {
            return (
                <div>
                    <div className="form-group">
                        <label className="col-form-label control-label" htmlFor="minimallyCompleted">Did {this.state.clientName} provide written confirmation from the training provider that they: <span style={{ color: "red" }}>*</span>
                            <ol style={{ listStyleType: "lower-alpha" }}>
                                <li> completed at least four consecutive weeks of training,</li>
                                <li> were in regular attendance; and </li>
                                <li> made good progress in the course?</li>
                            </ol>
                           </label>
                            <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(errors, touched, "minimallyCompleted")}`}
                            type="radio"
                            name="minimallyCompleted"
                            value="yes"
                        />
                        <label className="form-check-label" htmlFor="minimallyCompletedYes">Yes</label>
                    </div>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(errors, touched, "minimallyCompleted")}`}
                            type="radio"
                            name="minimallyCompleted"
                            value="no"
                        />
                        <label className="form-check-label" htmlFor="minimallyCompletedNo">No</label>
                        {feedBackInvalid(errors, touched, "minimallyCompleted")}
                    </div>
                    </div>
                    {this.fetchNotice(values)}
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
              <h2> Access to Technology (A2T) Client Course Completion Survey </h2>
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
                    <label className="col-form-label control-label" htmlFor="completedTraining">Has {this.state.clientName} completed the training program?<span
                        style={{ color: "red" }}>*  </span></label>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(errors, touched, "completedTraining")}`}
                            type="radio"
                            name="completedTraining"
                            value="yes"
                        />
                        <label className="form-check-label" htmlFor="completedTrainingYes">Yes</label>
                    </div>
                    <div className="form-check">
                        <Field
                            className={`form-check-input ${feedBackClassName(errors, touched, "completedTraining")}`}
                            type="radio"
                            name="completedTraining"
                            value="no"
                        />
                        <label className="form-check-label" htmlFor="completedTrainingNo">No</label>
                        {feedBackInvalid(errors, touched, "completedTraining")}
                    </div>
                </div>
                {this.handleCompletedTraining(errors, touched, values)}
                   
                                 
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
                               
                                completedTraining:"",
                                minimallyCompleted:"",
                                serviceProviderEmail: this.state.serviceProviderEmail,
                                clientEmail: this.state.clientEmail,
                            }}
                            enableReinitialize={true}
                            validationSchema={CourseCompletionValidationSchema}
                            onSubmit={(values,  {resetForm, setErrors, setStatus, setSubmitting }) => {
                                fetch(FORM_URL.courseCompletionSurvey, {
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
                                                this.props.history.push('/thankyouCourseCompletion',values)
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
export default withRouter(CourseCompletionSurvey);