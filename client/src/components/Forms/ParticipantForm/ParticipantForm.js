import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {customAlphabet} from 'nanoid'
import { Formik, Form, Field } from 'formik'
import { feedBackClassName, feedBackInvalid } from '../shared/ValidationMessages'
import CollectionNotice from './CollectionNotice'
import { ParticipantValidationSchema } from './ParticipantValidationSchema'
import { FORM_URL } from '../../../constants/form'
import { generateAlert } from '../shared/Alert'

class ParticipantForm extends Component {

    constructor() {
        super()
         const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz',10)
         const nanoid1 = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz',25)
        this.state = {
            _csrf: '',
            _id: nanoid(),
            _token: nanoid1(),
            hasError: false,
             //step 1
             providerContractId:"",
             serviceProviderName:"",
             serviceProviderContact:"",
             serviceProviderPhone:"",
             serviceProviderEmail:"",
             fundingSource:"",
             trainingProgramISET:"",
             trainingProgramAEST:"",
             trainingProgramSDPR:"",
             periodStart1:"",
             periodEnd1:"",
             clientAddress:"",
             clientCity:"",
             clientProvince:"British Columbia",
             clientPostal:"",
             clientPhone:"",
             clientFax:"",
             clientEmail:"",
             altShippingAddress: false,

             //step 1:pop-up fields
             addressAlt:"",
             cityAlt:"",
             provinceAlt:"BC",
             postalAlt:"",
             participantConsent:false,
            
        }
    }

    componentDidMount() {
        fetch(FORM_URL.clientForm, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(
                (result) => {
                   // console.log(result.csrfToken)
                    this.setState({
                        _csrf: result.csrfToken,
                    })
                },
                (error) => {
                    //console.log(error)
                    this.setState({
                        hasError: true
                    })
                }
            )
    }

    handleApplicationId(id, hasId, values, errors, touched) {
        if (id === "" || id.length !== 10) {
            //show non id handler
            return (
                <div>
                    <p>Please follow the link provided to you via email, or provide the application ID below.</p>
                    <div className="form-group">
                        <label className="col-form-label control-label" htmlFor="_id">Application ID <span
                            style={{ color: "red" }}>*</span></label>
                        <small className="text-muted" id="clientAddress1"> Please provide the 10 character ID.</small>
                        <Field className={`form-control ${feedBackClassName(errors, touched, "_id")}`} id="_id" name="_id" />
                        {feedBackInvalid(errors, touched, "_id")}
                    </div>
                </div>
            )
        } else {
            //display the id
            return (<div>
                <div className="form=row">
                <p>Please follow the link provided to you via email, and provide the application ID below.</p>
                    <div className="form-group">
                        <label className="col-form-label control-label" htmlFor="_id">Application ID <span
                            style={{ color: "red" }}>*</span></label>
                        <small className="text-muted" id="clientAddress1"> Please provide the 10 character ID.</small>
                        <Field className={`form-control ${feedBackClassName(errors, touched, "_id")}`} id="_id" name="_id" />
                        {feedBackInvalid(errors, touched, "_id")}
                    </div>
                </div>
                <div className="form=row">
                    <p>Client Name: {values.clientName}</p>
                </div>
                <div className="form=row">
                    <p>Eligible Training Program: {values.eligibleTrainingProgram}</p>
                </div>
                <div className="form=row">
                    <p>Training Start Date: {values.periodStart1}      Training End Date: {values.periodEnd1}</p>
                </div><div className="form=row">
                    {(values.altShippingAddress===false)?<p>Shipping Address: {values.clientAddress} {values.clientPostal} ,BC {values.clientCity}</p>: <p>Shipping Address: {values.addressAlt} {values.postalAlt} ,BC {values.cityAlt}</p>}
                </div>
               
                <div className="form=row">
                    <p>Email: {values.clientEmail}</p>
                </div>
                
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
                                participantConsent: false,
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
                                            if (resp.err) {
                                                alert("Please review your form, a field is incomplete.")
                                                setSubmitting(false)
                                                setErrors(resp.err)

                                            } else if (resp.emailErr) {
                                                setSubmitting(false)
                                                this.setState({
                                                    hasError: true
                                                })
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
                                <Form>
                                    <div className="form-group">
                                        <h2 id="forms">Access to Technology Client Form</h2>
                                    </div>
                                    <div className="form=row">
                                        <p>The Ministry of Social Development and Poverty Reduction has received a request from {`${values.serviceProviderName}`}.
                                    To process your application for an A2T laptop, you must complete and submit this Client Notification and Agreement.<br/><br/>
                                    Please be aware that delays in submitting your completed Client Notification and Agreement will result in delays in processing your
                                    application and may negatively impact your eligibility to receive an A2T laptop.   You are encouraged to complete and submit this form as soon as possible.<br/><br />
                                    If you have questions or require assistance to complete this form, please contact {`${values.serviceProviderName}`}.<br/></p>
                                    </div>
                                    {/* handleApplicationID handles all the pre populated values in future. */}
                                    {this.handleApplicationId(values._id, values.noOrgId, values, errors, touched)}
                                    
                                    <p><b>Collection, Use and Disclosure of Personal Information</b><br/>
                                        Personal information collected in this application is collected under the authority of section 26 (c) of the Freedom of Information and Protection of Privacy Act (“FOIPPA”) and is subject to all the provisions of that Act. The personal information collected will be used by the Ministry of Social Development and Poverty Reduction (“MSDPR”), its service providers and associates of its service providers to administer the Access to Technology Program ({`${values.eligibleTrainingProgram}`}), and may also be used to evaluate the effectiveness of the Access to Technology Program.
                                        If you have any questions about the collection of your personal information, please contact the Records clerk of the Employment and Labour Market Services Division, MSDPR at WorkBCOESprivacy@gov.bc.ca.<br/><br/>
                                        <b>Confirmation of Request</b><br/>
                                        I am requesting a laptop from the Access to Technology Initiative and I understand and agree that:  </p>
                                        <ul>
                                            <li>I require the technology described in my Access to Technology (A2T) application for the purposes of participating in, and completing the eligible training program described this A2T application;</li>

                                            <li>My use of the technology described in this A2T application is contingent upon my participation in the training described in this A2T application;</li>

                                            <li>If I complete the training described in this A2T application to the satisfaction of {`${values.serviceProviderName}`}, I may keep the technology provided to me by the A2T program; and</li>

                                            <li>If I do not complete the training described in this A2T application to the satisfaction of {`${values.serviceProviderName}`},  I must return the technology, in good working order to (name of referring service provider).</li>
                                        </ul>
                                      <p>  <b>Acceptable Uses Agreement:</b><br/>
                                        I understand and agree that the laptop has been provided to me in order to attend training.  I will not use the laptop for:  </p>
                                        <ul>
                                            <li>sexual exploitation;</li>
                                            <li>illegal activity;</li>
                                            <li>promoting hate, discrimination, or illegal activity; and/or;</li>
                                            <li>promoting a particular religious or political opinion;</li>
                                        </ul>
                                  

                                    <CollectionNotice />
                                    <div className="form-group">
                                        <div className="form-check">
                                            <Field type="checkbox" className={`form-check-input ${feedBackClassName(errors, touched, "participantConsent")}`} id="participantConsent"
                                                name="participantConsent" />
                                            <label className="form-check-label control-label" htmlFor="participantConsent"><span style={{ color: "red" }}>*</span> I acknowledge and
                                            understand that by clicking the "submit" icon, I am attaching my electronic signature to this form, and that
                                            by doing so, I am providing the same consent as I would by manually signing a physical copy of this
                                            form.
                                            </label>
                                            {feedBackInvalid(errors, touched, "participantConsent")}
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
                                                    <span className="spinner-border spinner-border-sm" htmlRole="status" aria-hidden="true"></span>
                                                       Submitting...
                                                </div>
                                                :
                                                "Submit"

                                        }
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(ParticipantForm);